import React from "react";
import "./pages.css";
import "./About.css";
import Member from "../components/About/Member";
import Objective from "../components/About/Objective";

const About = () => {
	return (
		<div className="page">
			<Objective />
			<Member />
		</div>
	);
};

export default About;
