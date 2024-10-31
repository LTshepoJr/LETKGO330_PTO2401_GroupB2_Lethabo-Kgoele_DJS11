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
      .catch((err) => setError(err))
      .finally(() => setLoad(false));
  }, []);

  function updateTitle<T extends string>(title: T) {
    return title.replace("&amp;", "&");
  }

  const pod = podcast.map(({ image, id, title }) => {
    return (
      <Link to={id} className="podcastWrapper" key={id}>
        <div key={id} className="singlePodcast">
          <img src={image} alt={`${title} Picture`} />
          <h4>{updateTitle(title)}</h4>
        </div>
      </Link>
    );
  });

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="jsonError">Something went wrong!!</h1>;
  }

  return (
    <>
      <div className="preview">{pod}</div>
    </>
  );
};

export default MainBody;
