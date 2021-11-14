import "./ImageCard.css";

  const ImageCard = (props) => {
    return (
        <div className="image-card ">
          <img src={props.item} alt="" />
          <p>{props.generation}</p>
        </div>
    );
  }

export default ImageCard;
