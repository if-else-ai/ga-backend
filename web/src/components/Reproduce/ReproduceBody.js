import { useRef, useState } from "react";
import Card from "./Card";
import ImageCard from "./ImageCard";
import "./ReproduceBody.css";
import "./Button.css";

import axios from "../../axios.js";

const ReproduceBody = () => {

	// target hidden input
	const fileInputRef = useRef(null);

	// state variable
	let [haveImage, setHaveImage] = useState(false);
	let [generation, setGeneration] = useState(0);
	let [split, setSplit] = useState(0);
	let [imageURL, setImageURL] = useState("");
	let [filename, setFilename] = useState("");
	let [fitness, setFitness] = useState(0)
	let [generated, setGenerated] = useState(0)
	let [status, setStatus] = useState('Waiting')
	let [imageArray, setImageArray] = useState([])
	let [imageAnimationIndex, setImageAnimationIndex] = useState(0)
	let [finishGenerate, setFinishGenerate] = useState(false)
	let animationIndex = 0
	var intervalID

	// click hidden file input if button is click
	const uploadClickHandler = (event) => {
		fileInputRef.current.click();
	};

	// upload image
	const uploadHandler = (event) => {
		// use form0-data to store image
		const file = event.target.files[0];
		console.log(file)
		if(file){
			let formData = new FormData();
			let tempBlob = new Blob([file], { type: "image/jpeg" });
			formData.append("file", tempBlob, file.name);
			// upload api
			axios
				.post("/image", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					console.log(res)
					filename = res.data.filename
					let currentImage = `${axios.defaults.baseURL}/image?filename=${filename}`;
					setFilename(filename)
					setImageURL(currentImage)
					setHaveImage(true);
				})
				.catch((err) => {
					console.log(err);
					alert("เกิดข้อผิดพลาด");
				});
		}
	};

	// run task
	const startHandler = () => {
		axios
			.post(
				"/run",
				{
					"filename": filename,
					"generation": Number(generation),
					"split": Number(split)
				}
			)
			.then((res) => {
				console.log(res)
				let taskID = res.data.task_id

				// start getting status every 2 second
				intervalID = setInterval(() => {
					fetchStatus(taskID)
				}, 2000);

			})
			.catch((err) => {
				console.log(err);
			});

	};

	const generationHandler = (event) => {
		setGeneration(event.target.value);
	};

	const splitHandler = (event) => {
		setSplit(event.target.value);
	};

	const fetchStatus = (taskID) => {
		axios.get(`/status/${taskID}` ).then(
			(res) => {
				setFitness(res.data.current_fitness)
				setGenerated(res.data.current_generation)
				setStatus(res.data.status)
				console.log('array',res.data.sol_im)
				let imageData = res.data.sol_im
				let imageArray = imageData.map(
					imageFilename => {
						return `${axios.defaults.baseURL}/image?filename=${imageFilename}`}
				)
				console.log(imageArray)
				setImageArray(imageArray)
				console.log(res)
				if(res.data.status === 'Completed' || res.data.state === "FAILURE"){
					axios.post(`/tasks/${taskID}`).then(
						res => {
							console.log('clear', taskID)
						}
					)
					clearInterval(intervalID)
					setFinishGenerate(true)
					setInterval(()=>{
						playAnimation()
					},1000)
				}
			}
		)
	};


	


	const playAnimation = () => {
		animationIndex += 1
		setImageAnimationIndex(imageAnimationIndex + animationIndex)
	}

	let animation = (
		<p>Animation: waiting</p>
	)
	
	if(finishGenerate){
		animation = 
		(
			<div className="image__animation-container">
				<p>Progression Animation</p>
				<ImageCard  item={imageArray[imageAnimationIndex % imageArray.length]} generation={(generation/split)*((imageAnimationIndex % imageArray.length) + 1)}/>
				<p></p>
			</div>
		)
	}

	let generatedImage = <p></p>;

	if(finishGenerate || imageArray.length > 0){
		generatedImage = (
			<section>
				<p>Generated Image</p>
				<div className="image__items">
					{imageArray.map((item, index) => {
						return (
							<ImageCard
								key={index}
								item={item}
								generation={(generation/split)*(index + 1)}
							/>
						);
					})}
				</div>
			</section>
		)
	}


	return (
		<div className="reproduce__container">
			<Card image={imageURL} />;
			<section className="form__container">
				Generation: <input type="number" onChange={generationHandler} />
				Split: <input type="number" onChange={splitHandler} />
			</section>

			<div className="button-row">
				<button className="button__upload" onClick={uploadClickHandler}>
					Upload
					<input
						type="file"
						ref={fileInputRef}
						onChange={uploadHandler}
					/>
				</button>

				<button
					disabled={!(haveImage && split > 0 && generation > 0)}
					className={
						(haveImage && split > 0 && generation > 0)
							? "button__start"
							: "button__disable"
					}
					onClick={startHandler}
				>
					Start
				</button>
			</div>


			<div>
				<p>Current Generation: {generated}</p>
				<p>Fitness: {fitness}</p>
				<p>Status: {status}</p>
			</div>
			
			{animation}

			{generatedImage}
			
			

		</div>
	);
};

export default ReproduceBody;
