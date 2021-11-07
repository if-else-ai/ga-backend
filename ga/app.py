import os
import time
import secrets
from werkzeug.utils import secure_filename

from flask import Flask, request, flash, sessions, url_for, jsonify, Response, send_from_directory
from tasks import celery

secret = secrets.token_urlsafe(32)

app = Flask(__name__)
app.secret_key = secret

# UPLOAD_FOLDER = os.path.dirname(os.path.abspath('./')) + '/uploads'
UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# celery.conf.update(app.config)


# Check if a file extension is allowed.
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Uploading or retrieving the image.
@app.route('/image', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return jsonify({'status': 'error', 'message': 'No file part'}), 400
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return jsonify({'status': 'error', 'message': 'No selected file'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(str(time.time()).rsplit(
                '.', 1)[0] + '.' + file.filename.rsplit('.', 1)[1])
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify({'status': 'success', 'filename': filename}), 200
    if request.method == 'GET':
        if 'filename' in request.args:
            filename = request.args['filename']
            return send_from_directory(app.config['UPLOAD_FOLDER'], filename), 200
    return Response(status=400)


# Root route.
@app.route('/')
def index():
    return jsonify({'status': 'success', 'message': 'Welcome motherfucker to the PyGAD & GARI for Reproducing Images'})


# Route for running the genetic algorithm.
@app.route('/run', methods=['POST'])
def run():
    task = celery.send_task('tasks.run_ga', args=[
                            request.json['filename'], request.json['generation']])
    return jsonify({'task_id': task.id}), 202, {'Location': url_for('taskstatus', task_id=task.id)}


# Route for getting the status of the genetic algorithm.
@app.route('/status/<task_id>', methods=['GET'])
def taskstatus(task_id):
    task = celery.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {
            'state': task.state,
            'current_generation': 0,
            'target_generatiion': 0,
            'current_fitness': 0,
            'status': 'Pending...'
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
            'current_generation': task.info.get('current_generation', 0),
            'target_generatiion': task.info.get('target_generatiion', 1),
            'current_fitness': task.info.get('current_fitness', 0),
            'status': task.info.get('status', '')
        }
        if task.info.get('status', '') == 'Completed':
            response['result'] = task.info.get('result', '')
    else:
        # something went wrong in the background job
        response = {
            'state': task.state,
            'current_generation': 1,
            'target_generatiion': 1,
            'current_fitness': 1,
            'status': str(task.info)  # this is the exception raised
        }
    return jsonify(response)


if __name__ == '__main__':
    print('Starting the server...')
    print('Server is running on port 5000')
    print('Press Ctrl+C to quit')
    print(f'UPLOAD_FOLDER: {UPLOAD_FOLDER}')
    print('------------------------------------------------------')
    # app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    app.config['SESSION_TYPE'] = 'redis'
    app.run(host='0.0.0.0', port=5000, debug=True)


# cur_generation = 0
# tar_generation = 0
# cur_fitness = 0
# fitness_val_of_best_sol = 0
# index_of_best_sol = 0
# best_fitness_val_reached_in_gen = 0


# # Run the genetic algorithm.
# @celery.task(bind=True)
# def ga(self, target_im_name, target_generation):
#     global tar_generation
#     global fitness_val_of_best_sol
#     global index_of_best_sol
#     global best_fitness_val_reached_in_gen

#     tar_generation = target_generation

#     # Reading target image to be reproduced using Genetic Algorithm (GA).
#     target_im = imageio.imread(os.path.join(
#         app.config['UPLOAD_FOLDER'], target_im_name))
#     target_im = numpy.asarray(target_im/255, dtype=numpy.float)

#     # Target image after enconding. Value encoding is used.
#     target_chromosome = gari.img2chromosome(target_im)

#     def fitness_fun(solution, solution_idx):
#         fitness = numpy.sum(numpy.abs(target_chromosome-solution))

#         # Negating the fitness value to make it increasing rather than decreasing.
#         fitness = numpy.sum(target_chromosome) - fitness
#         return fitness

#     def callback(ga_instance):
#         global cur_generation
#         global cur_fitness
#         # print("Generation = {gen}".format(
#         #     gen=ga_instance.generations_completed))
#         # print("Fitness    = {fitness}".format(
#         #     fitness=ga_instance.best_solution()[1]))
#         cur_generation = ga_instance.generations_completed
#         cur_fitness = ga_instance.best_solution()[1]

#         if ga_instance.generations_completed % 500 == 0:
#             matplotlib.pyplot.imsave(os.path.join(app.config['UPLOAD_FOLDER'], 'solution_'+str(ga_instance.generations_completed) +
#                                      '.png', gari.chromosome2img(ga_instance.best_solution()[0], target_im.shape)))

#         self.update_state(state='PROGRESS',
#                           meta={'current_generation': cur_generation,
#                                 'target_generatiion': tar_generation,
#                                 'current_fitness': cur_fitness,
#                                 'status': 'Progressing...'})

#     ga_instance = pygad.GA(num_generations=target_generation,
#                            num_parents_mating=10,
#                            fitness_func=fitness_fun,
#                            sol_per_pop=20,
#                            num_genes=target_im.size,
#                            init_range_low=0.0,
#                            init_range_high=1.0,
#                            mutation_percent_genes=0.01,
#                            mutation_type="random",
#                            mutation_by_replacement=True,
#                            random_mutation_min_val=0.0,
#                            random_mutation_max_val=1.0,
#                            callback_generation=callback)

#     ga_instance.run()

#     # After the generations complete, some plots are showed that summarize the how the outputs/fitenss values evolve over generations.
#     # ga_instance.plot_result()

#     # Returning the details of the best solution.
#     solution, solution_fitness, solution_idx = ga_instance.best_solution()
#     # print("Fitness value of the best solution = {solution_fitness}".format(
#     #     solution_fitness=solution_fitness))
#     # print("Index of the best solution : {solution_idx}".format(
#     #     solution_idx=solution_idx))
#     fitness_val_of_best_sol = solution_fitness
#     index_of_best_sol = solution_idx

#     if ga_instance.best_solution_generation != -1:
#         # print("Best fitness value reached after {best_solution_generation} generations.".format(
#         #     best_solution_generation=ga_instance.best_solution_generation))
#         best_fitness_val_reached_in_gen = ga_instance.best_solution_generation

#     # result = gari.chromosome2img(solution, target_im.shape)
#     # matplotlib.pyplot.imshow(result)
#     # matplotlib.pyplot.title("PyGAD & GARI for Reproducing Images")
#     # matplotlib.pyplot.show()
#     return {'current_generation': tar_generation,
#             'target_generatiion': tar_generation,
#             'current_fitness': cur_fitness,
#             'result': f'{fitness_val_of_best_sol} {index_of_best_sol} {best_fitness_val_reached_in_gen}',
#             'status': 'Completed',
#             # 'fitness_val_of_best_sol': fitness_val_of_best_sol,
#             # 'index_of_best_sol': index_of_best_sol,
#             # 'best_fitness_val_reached_in_gen': best_fitness_val_reached_in_gen,
#             }
