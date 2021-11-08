import os
import time

import numpy
import imageio
import gari
import pygad
import matplotlib.pyplot
from celery import Celery, current_task

CELERY_BROKER_URL = os.environ.get(
    'CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.environ.get(
    'CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')

celery = Celery('tasks', broker=CELERY_BROKER_URL,
                backend=CELERY_RESULT_BACKEND)

UPLOAD_FOLDER = '/uploads'

cur_generation = 0
tar_generation = 0
cur_fitness = 0
fitness_val_of_best_sol = 0
index_of_best_sol = 0
best_fitness_val_reached_in_gen = 0
sol_im = []


# Run the genetic algorithm.
@celery.task(name='tasks.run_ga')
def ga(target_im_name, target_generation, target_split):
    global tar_generation
    global fitness_val_of_best_sol
    global index_of_best_sol
    global best_fitness_val_reached_in_gen

    tar_generation = target_generation

    # Reading target image to be reproduced using Genetic Algorithm (GA).
    target_im = imageio.imread(os.path.join(UPLOAD_FOLDER, target_im_name))
    target_im = numpy.asarray(target_im/255, dtype=numpy.float)

    # Target image after enconding. Value encoding is used.
    target_chromosome = gari.img2chromosome(target_im)

    def fitness_fun(solution, solution_idx):
        fitness = numpy.sum(numpy.abs(target_chromosome-solution))

        # Negating the fitness value to make it increasing rather than decreasing.
        fitness = numpy.sum(target_chromosome) - fitness
        return fitness

    def callback(ga_instance):
        global cur_generation
        global cur_fitness
        global sol_im

        cur_generation = ga_instance.generations_completed
        cur_fitness = ga_instance.best_solution()[1]

        if ga_instance.generations_completed % int(target_generation / target_split) == 0:
            sol_im_name = str(time.time()).rsplit('.', 1)[0] + '.png'
            matplotlib.pyplot.imsave(os.path.join(UPLOAD_FOLDER, sol_im_name), gari.chromosome2img(
                ga_instance.best_solution()[0], target_im.shape))
            sol_im.append(sol_im_name)

        current_task.update_state(state='PROGRESS',
                                  meta={'current_generation': cur_generation,
                                        'target_generatiion': tar_generation,
                                        'current_fitness': cur_fitness,
                                        'sol_im': sol_im,
                                        'status': 'Progressing...'})

    ga_instance = pygad.GA(num_generations=target_generation,
                           num_parents_mating=10,
                           fitness_func=fitness_fun,
                           sol_per_pop=20,
                           num_genes=target_im.size,
                           init_range_low=0.0,
                           init_range_high=1.0,
                           mutation_percent_genes=0.01,
                           mutation_type="random",
                           mutation_by_replacement=True,
                           random_mutation_min_val=0.0,
                           random_mutation_max_val=1.0,
                           callback_generation=callback)

    ga_instance.run()

    # Returning the details of the best solution.
    solution, solution_fitness, solution_idx = ga_instance.best_solution()
    fitness_val_of_best_sol = solution_fitness
    index_of_best_sol = solution_idx

    if ga_instance.best_solution_generation != -1:
        best_fitness_val_reached_in_gen = ga_instance.best_solution_generation

    return {'current_generation': tar_generation,
            'target_generatiion': tar_generation,
            'current_fitness': cur_fitness,
            'sol_im': sol_im,
            'result': f'{fitness_val_of_best_sol} {index_of_best_sol} {best_fitness_val_reached_in_gen}',
            'status': 'Completed',
            }
