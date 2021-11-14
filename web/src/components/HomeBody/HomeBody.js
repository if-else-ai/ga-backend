import React from "react";
import "./HomeBody.css";

const Home2 = () => {
	return (
		<div className="container">
			<div className="container-text">
				<h1>What is Genetic Algorithm?</h1>
				<p>
        A <b>genetic algorithm</b> is a search heuristic that is inspired by Charles 
        Darwin’s theory of natural evolution. This algorithm reflects the process 
        of natural selection where the fittest individuals are selected for reproduction 
        in order to produce offspring of the next generation. Genetic algorithms are commonly 
        used to generate high-quality solutions to optimization and search problems by relying 
        on biologically inspired operators such as mutation, crossover and selection. Some examples 
        of GA applications include optimizing decision trees for better performance, automatically 
        solving sudoku puzzles, hyperparameter optimization, etc.

				</p>
			
					<div className="img">
						<img
							src="/images/contributor/natuaral.jpg"
              alt=""
							width="600px"
						></img>
						<i>The cycle of natural evolution</i>  
					</div>
        <p>GA aims to enable computers to solve problems using natural methods. 
          It works with binary bit strings (called chromosomes), in which each chromosome contains a gene. 
          and each gene is represented by a bit that has a value of 0 or 1.
        </p>

        <div className="img">
						<img
							src="/images/contributor/bit01.jpg"
							width="600px"
							alt=""
						></img>
				</div>
        <p className="p1">The core principles of the GA algorithm are chromosome encoding 
          and chromosome evaluation, and the fitness function is used to 
          select the chromosomes to be fertilized.
        </p>
      </div> 

      <div className="process">
        <h1>Process of Genetic Algorithm</h1>
              <section className="encoding">
                <h1>Chromosome Encoding </h1>
                  <p className="p1">
                    Encoding is the process of taking the features of a possible answer 
                    into a chromosome form, such as binary encoding. Binary encoding is 
                    the most common. This is because GA-related tasks use this type of encoding. 
                    In binary encoding, every chromosome is a string of bits 0 or 1.
                  </p>

                    <div className="img">
                      <img 
                        src="/images/contributor/chomosome.jpg" 
                        alt=""
                        width="600px"
                      ></img>
                    </div>
              </section>
            

              <section className="initial">
                <h1>Initial population</h1>
                    <p className="p1">
                      It is the process of defining various parameters, whether it is 
                      to determine the initial population. Then randomize the number of 
                      chromosomes and determine the crossover rate and the mutation rate.
                    </p>
              </section> 

              <section className="fitness">
                <h1>Fitness function</h1>
                  <p className="p1">
                  This defines the fitness function that will be used to select the 
                  chromosome for the next generation of chromosomes. Whether or not 
                  each chromosome is selected depends on the fitness function value. 
                  Each problem has a different fitness function.
                  </p>
              </section>

              <section className="operator">
                <h1>Genetic Operator</h1>
                  <p className="p1">
                    Generate child chromosomes from parents chromosomes using two 
                    types of genetic operators: crossover and mutation.
                  </p>
              </section>
            

              <section className="crossover">
              <h1>1. Crossover</h1>
              <p className="p1">
              Is the exchange of chromosomes between father and mother and 
              making a child out. A random crossover occurs, which is usually high. 
              The chromosomes are exchanged at random, called crossover masks, 
              and the parents chromosomes are swapped according to the resulting crossover mask.
              </p>
                <p>There are three crossovers.</p>
                  <ul>
                    <li>
                      Single-point crossover : Only one crossover mask.
                    </li>
                    <li>
                      Two-point crossover : Just two crossover masks.
                    </li>
                    <li>
                      Uniform crossover : More than two crossover masks
                    </li>
                  </ul>
              <div className="img">
                <img className="img-crossver"
                  src="/images/contributor/Crossover1000.gif" 
                  alt=""
                  width="800px">
                </img>
              </div>
              </section>

              <section className="Mutation">
                <h1>2. Mutation</h1>
                  <p className="p1">
                  Is a mutation made up of one chromosome and randomly assigned 
                  one gene location and changed the number. It has a relatively 
                  low probability because too much may cause the appearance of 
                  the mutant to be too different from the parent. which may be 
                  repeated as we define in Fitness Function
                  </p>

                <div className="img">
                  <img className="img-mutation"
                    src="/images/contributor/Mutation1001.gif" 
                    alt=""
                    width="800px"
                  ></img>
                </div>
              </section>
              
              <section className="termination">
                <h1>Termination</h1>
                    <p className="p1">
                      It's the end of the GA process, which terminates when 
                      it completes our set number of generations and gets 
                    the best fitness values ​​as the answer.   
                    </p>
                   
              </section>
       </div>  
            
        <div className="reproducing">
              <section className="intro-repro">
                  <h1>  Reproducing Images with Genetic Algorithm</h1>
                  <p className="p1">
                    This will develop an image that starts from a random image. 
                    (random pixel values) and will be developed into the image 
                    we want by using a genetic algorithm to develop each pixel value.
                  </p>

                 <p>Following steps to follow in order to reproducing an image,are as follows:</p>
                    <ul>
                      <li>
                        Read an image
                      </li>
                      <li>
                        Prepare the fitness function
                      </li>
                      <li>
                        Create an instance of the pygad.GA class with the appropriate parameters
                      </li>
                      <li>
                        Run PyGAD
                      </li>
                      <li>
                        Plot results
                      </li>
                      <li>
                        Calculate some statistics
                      </li> 
                    </ul>

                  <p>The next sections discusses the code of each of these steps.</p>
              </section>
            <div className="algo-repro">
              <h1>Read an Image</h1>
                  <p>
                    There is an image named <mark>fruit.jpg</mark> in the project which is read according to the next code.
                  </p>

                <div className="code1">
                  <span className="code1-import"><span className="pur">import</span> imageio</span>
                  <span className="code1-import"><span className="pur">import</span> numpy</span><br></br>
                  <span className="code1-var">target_im = imageio.imread(<span className="g">'fruit.jpg'</span>)</span>
                  <span className="code1-var">target_im = numpy.asarray(target_im/<span className="o">255</span>, dtype=numpy.float)</span>
                </div> 
                  <p>
                    Here is the read image.
                  </p>
                <div className="img">
                  <img 
                    src="/images/contributor/fruit.jpg" 
                    alt=""
                    width="450px"
                  ></img>
                </div>

                  <p>
                    Based on the chromosome representation used in the example, 
                    the pixel values can be either in the 0-255, 0-1, or any other ranges.
                  </p>
                  <p>
                    Note that the range of pixel values affect other parameters like the range 
                    from which the random values are selected during mutation and also the range 
                    of the values used in the initial population. So, be consistent.
                  </p>
                <h1>Prepare the Fitness Function</h1>
                  <p>
                    The next code creates a function that will be used as a fitness function 
                    for calculating the fitness value for each solution in the population. 
                    This function must be a maximization function that accepts 2 parameters 
                    representing a solution and its index. It returns a value representing 
                    the fitness value.
                  </p>
                 
                  <div className="code2">
                    <span className="code2-import"><span className="pur">import</span> gari</span><br></br>
                    <span className="code2-var">target_chromosome = gari.img2chromosome(target_im)</span><br></br>
                    <span className="code2-func"><span className="pur">def</span> fitness_fun(solution, solution_idx):</span>
                    <span className="code2-func-inside">fitness = numpy.sum(numpy.abs(target_chromosome-solution))</span><br></br>
                    <span className="code2-func-inside"><span className="b"># Negating the fitness value to make it increasing rather than decreasing.</span></span>
                    <span className="code2-func-inside">fitness = numpy.sum(target_chromosome) - fitness</span>
                    <span className="code2-func-inside"><span className="pur">return</span> fitness</span>         
                  </div>

                  <p>
                    The fitness value is calculated using the sum of absolute difference between 
                    genes values in the original and reproduced chromosomes. The <mark>gari.img2chromosome()</mark>
                    function is called before the fitness function to represent the image as a vector 
                    because the genetic algorithm can work with 1D chromosomes.
                  </p>
  
                <div className="code3">
                  <span className="code3-import"><span className="pur">import</span> numpy</span>
                  <span className="code3-import"><span className="pur">import</span> functools</span>
                  <span className="code3-import"><span className="pur">import</span> operator</span><br></br>
                  <span className="code3-func"><span className="pur">def</span> img2chromosome(img_arr):</span>
                  <span className="code3-func-inside"> <span className="pur">return</span> numpy.reshape(a=img_arr,newshape=(functools.reduce(operator.mul,img_arr.shape)))</span><br></br>
                  <span className="code3-func"><span className="pur">def</span> chromosome2img(vector, shape):</span>
                  <span className="code3-func-inside"><span className="pur">if</span> len(vector) != functools.reduce(operator.mul, shape):</span>
                  <span className="code3-if-inside"><span className="pur">raise</span> ValueError(<span className="g">"A vector of length {"{vector_length}"} into an array of shape {"{shape}"}."</span>.format(vector_length=len(vector),shape=shape))</span><br></br>
                  <span className="code3-func-inside"><span className="pur">return</span> numpy.reshape(a=vector, newshape=shape)</span>  
                </div>

                <h1>Create an Instance of the pygad.GA Class</h1>
                  <p>It is very important to use random mutation and set the <mark>mutation_by_replacement</mark> to   
                   True. Based on the range of pixel values, the values assigned to 
                    the <mark>init_range_low</mark> , <mark>init_range_high</mark> , <mark>random_mutation_min_val</mark> , and <mark>random_mutation_max_val</mark> parameters
                    should be changed.
                  </p>
                  <p>
                    If the image pixel values range from 0 to 255, then set <mark>init_range_low</mark> and <mark>random_mutation_min_val</mark> to
                    0 as they are but change <mark>init_range_high</mark> and <mark>random_mutation_max_val</mark> to 255.
                   
                  </p>
                  
                <div className="code4">
                  <span className="code4-import"><span className="pur">import</span> pygad</span><br></br>
                  <span className="code4-var">ga_instance = pygad.GA(num_generations=<span className="o"> 20000</span>,</span><br></br>
                  <span className="code4-var-inside">num_parents_mating=<span className="o">10</span>,</span><br></br>
                  <span className="code4-var-inside">fitness_func=fitness_fun,</span><br></br>
                  <span className="code4-var-inside">sol_per_pop=<span className="o">20</span>,</span><br></br>
                  <span className="code4-var-inside">num_genes=target_im.size,</span><br></br>
                  <span className="code4-var-inside">init_range_low=<span className="o">0.0</span>,</span><br></br>
                  <span className="code4-var-inside">init_range_high=<span className="o">1.0</span>,</span><br></br>
                  <span className="code4-var-inside">mutation_percent_genes=<span className="o">0.01</span>,</span><br></br>
                  <span className="code4-var-inside">mutation_type=<span className="g">"random"</span>,</span><br></br>
                  <span className="code4-var-inside">mutation_by_replacement=True,</span><br></br>
                  <span className="code4-var-inside">random_mutation_min_val=<span className="o">0.0</span>,</span><br></br>
                  <span className="code4-var-inside">random_mutation_max_val=<span className="o">1.0</span>)</span><br></br>
                </div>

                <h1>Run PyGAD</h1>
                  <p>
                    Simply, call the <mark>run()</mark> method to run PyGAD.
                  </p>
                <div className="code5">
                    <span>ga_instance.run()</span>
                </div> 
                <h1>Plot Results</h1>
                  <p>
                    After the <mark>run()</mark> method completes, the fitness values of all generations can 
                    be viewed in a plot using the <mark>plot_fitness()</mark> method.
                  </p> 
                  <div className="code5">
                    <span>ga_instance.plot_fitness()</span>
                </div>
                <div className="img">
                  <img 
                    src="/images/contributor/plot.png" 
                    alt=""
                    width="500px"
                  ></img>
                </div> 
                <h1>Calculate Some Statistics</h1>
                  <p>Here is some information about the best solution.</p>
                <div className="code6">
                  <span className="code6-comment"><span className="b"># Returning the details of the best solution.</span></span>
                  <span className="code6-var">solution, solution_fitness, solution_idx = ga_instance.best_solution()</span>
                  <span className="code6-var"><span className="lb">print</span>(<span className="g">"Fitness value of the best solution ={"{solution_fitness}"}"</span>.format(solution_fitness=solution_fitness))</span>
                  <span className="code6-var"><span className="lb">print</span>(<span className="g">"Index of the best solution : {"{solution_idx}"}"</span>.format(solution_idx=solution_idx))</span><br></br>
                  <span className="code6-var"><span className="pur">if</span> ga_instance.best_solution_generation != <span className="o">-1</span>:</span>
                  <span className="code6-var-inside"><span className="lb">print</span>(<span className="g">"Best fitness value reached after {"{best_solution_generation}"} generations."</span>.format(best_solution_generation=ga_instance.best_solution_generation))</span><br></br>
                  <span className="code6-var">result = gari.chromosome2img(solution, target_im.shape)</span> 
                  <span className="code6-var">matplotlib.pyplot.imshow(result)</span> 
                  <span className="code6-var">matplotlib.pyplot.title(<span className="g">"PyGAD & GARI for Reproducing Images"</span>)</span> 
                  <span className="code6-var">matplotlib.pyplot.show()</span> 
                </div>
            
                  <h1>Evolution by Generation</h1> 
                  <p>The solution reached after the 20,000 generations is shown below.</p>         

                <div className="img">
                  <img 
                    src="/images/contributor/repro-fruit.png" 
                    alt=""
                    width="500px"
                  ></img>
                </div>
            </div>
            
        </div>
		</div>
    
	);
};

export default Home2;
