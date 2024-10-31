import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Podcast.css";

const Podcast = () => {
  const { id } = useParams();
  const paramsId = id;
  const [podcast, setPodcast] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoad(true);
    fetch("https://podcast-api.netlify.app/")
      .then((prom) => prom.json())
      .then((data) => setPodcast(data))
      .catch((err) => setError(err))
      .finally(() => setLoad(false));
  }, [id]);

  const filterIdArray = podcast.filter(({ id }) => id === paramsId);
  function sliceDate<T extends string>(updated: T) {
    return updated.slice(0, updated.indexOf("T"));
  }
  const pod = filterIdArray.map(
    ({ title, id, description, seasons, updated, image }) => (
      <div key={id} className="podcastContainer">
        <div className="podcastImage">
          <img src={image} alt={`${title} Picture`} />
          <h3>{title}</h3>
        </div>
        <div>
          <h5>Seasons: {seasons}</h5>
          <h6>Date Updated: {sliceDate(updated)}</h6>
        </div>
        <div>
          <h2>About</h2>
          <p>{description}</p>
        </div>
      </div>
    )
  );

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="jsonError">Something went wrong!!</h1>;
  }

  return <>{pod}</>;
};

export default Podcast;
