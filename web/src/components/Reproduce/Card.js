import "./Card.css";

  const Card = (props) => {

    return (
        <div className="card-container">
          <img src={props.image} alt="" />
        </div>
    );
  }

export default Card;
