import "./Pageheader.css";

  const Pageheader = () => {
    return (
      <div>
        <div className="page-header">
          <h3>How to use Reproduce Image</h3>
          <ol>
            <li>
              Insert Image (bigger image resolution = more processing time)
            </li>
            <li>
              Insert your desire Generation (The better Generation value mean the better image and more time processing)
            </li>
            <li>
              Insert split (split mean how many image you want to split into)
            </li>
            <li>
              Wait for Server to process your image (may take a lot of time ,roughly 5 generation per second )
            </li>
            <li>
             At the end the animation will be shown to show how the generation progression looks like
            </li>
          </ol>
          <p>*Recommend generate small Generation first to see how its will look like</p>
        </div>
      </div>
    );
  }

export default Pageheader;
