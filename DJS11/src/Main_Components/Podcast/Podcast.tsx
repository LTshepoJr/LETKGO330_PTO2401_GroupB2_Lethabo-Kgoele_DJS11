import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Podcast.css";

const Podcast = () => {
  const { id } = useParams();
  const paramsId = id;
  const [podcast, setPodcast] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const filterIdArray = podcast.filter(({ id }) => id === paramsId);

  useEffect(() => {
    setLoad(true);
    fetch("https://podcast-api.netlify.app/")
      .then((prom) => prom.json())
      .then((data) => setPodcast(data))
      .catch((err) => setError(err))
      .finally(() => setLoad(false));
  }, [id]);

  function sliceDate<T extends string>(updated: T) {
    return updated.slice(0, updated.indexOf("T"));
  }

  function updateTitle<T extends string>(title: T) {
    return title.replace("&amp;", "&");
  }

  const pod = filterIdArray.map(
    ({ title, id, description, seasons, updated, image }) => (
      <div key={id} className="podcastContainer">
        <div className="podcastImage">
          <img src={image} alt={`${title} Picture`} />
          <h1>{updateTitle(title)}</h1>
        </div>
        <div>
          <h4>Seasons: {seasons}</h4>
          <h5>Date Updated: {sliceDate(updated)}</h5>
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
