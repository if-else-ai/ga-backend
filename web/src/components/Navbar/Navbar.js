import React, { useState } from 'react'
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

const Navbar = () => {
	let click = false
	const [clicked, setClicked] = useState(click)

	const handleClick = () => {
		setClicked(!click);
	};

	return (
		<nav className="NavbarItems">
			<a href="/" className="navbar-logo">
				<h1>
					<i className="fas fa-dna"></i> Genetic Algorithm
				</h1>
			</a>
			<div className="menu-icon" onClick={handleClick}>
				<i
					className={
						clicked ? "fas fa-times" : "fas fa-bars"
					}
				></i>
			</div>
			<ul className={clicked ? "nav-menu active" : "nav-menu"}>
				{MenuItems.map((item, index) => {
					return (
						<li key={index}>
							<a className={item.cName} href={item.url}>
								{item.title}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navbar;
