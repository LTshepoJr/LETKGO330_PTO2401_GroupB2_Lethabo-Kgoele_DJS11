import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainBody = () => {
  const [podcast, setPodcast] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoad(true);
    fetch("https://podcast-api.netlify.app/")
      .then((prom) => prom.json())
      .then((data) => setPodcast(data))
      .catch((err) => setError(err));
  }, []);
  const pod = podcast.map(({ image, id, title }) => {
    return (
      <Link to={id} className="podcastWrapper" key={id}>
        <div key={id} className="singlePodcast">
          <img src={image} alt={`${title} Picture`} />
          <h4>{title}</h4>
        </div>
      </Link>
    );
  });
  const renderPodcast = load ? pod : <h1>Loading...</h1>;
  const errorMessage = <h1 className="jsonError">Something went wrong!!</h1>;
  const output = error ? errorMessage : renderPodcast;
  return (
    <>
      <div className="preview">{output}</div>
    </>
  );
};

export default MainBody;
