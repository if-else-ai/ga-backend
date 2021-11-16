import "./Card.css";

	const Card = (props) => {
		return (
			<div className={`member-card ${ props.isPM ? 'project-manager' : 'team-member' }`  }>
				{props.children}
			</div>
		);
	}

export default Card;
