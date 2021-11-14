import "./Member.css";
import { Team } from "./team-info";
import Card from "./Card";

const Member = () => {
	// let info = [
	// 	"/images/contributor/Natthadecha.jpg"
	// ];

	return (
		<div className="member">
			<h1> DEVELOPER </h1>
			<div className="member__items">
				{Team.map((item, index) => {
					return (
						<div className="member__item" key={index}>
							<Card isPM={item.isPM} >
								<div className ="member__image">
									<img src={item.image} alt="team" />
								</div>
								<div className="card-text">
									<p>Name : {item.name}</p>
									<p>Role : </p>
								</div>
								<div className="chip__items">
									{item.role.map((item, index) => {
										return (
											<div className="chip__item" key={index}>
												<span>
													{item}
												</span>
											</div>
										);
									})}
								</div>
								<div className="card-id">
									{item.id}
								</div>
							</Card>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Member;
