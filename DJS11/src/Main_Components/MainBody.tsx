import { useEffect, useState } from "react";

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
  const pod = podcast.map(({ image, id }) => {
    return <img src={image} alt="Podcast Picture" key={id} width="100rem" />;
  });
  const renderPodcast = load ? pod : <h1>Loading...</h1>;
  const errorMessage = <h1 className="jsonError">Something went wrong!!</h1>;
  const output = error ? errorMessage : renderPodcast;
  return <>{output}</>;
};

export default MainBody;
