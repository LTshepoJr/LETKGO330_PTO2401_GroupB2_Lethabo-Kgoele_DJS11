import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import "./Podcast.css";

const Podcast = () => {
  const { id } = useParams();
  const paramsId = id;
  const [podcast, setPodcast] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const filterIdArray = podcast.filter(({ id }) => id === paramsId);
  const location = useLocation();
  const search = location.state?.searchParams || "";
  const genreArray: string[] = [
    "Personal Growth",
    "Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];
  const type = genreArray[location.state?.type - 1] || "all";

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
    ({ title, id, description, seasons, updated, image, genres }) => {
      const genre: number[] = genres;
      const des: string = description;
      const modifiedText = des.replace(
        /*html*/
        /(https?:\/\/[^\s]+)/g,
        `<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`
      );
      return (
        <div key={id} className="podcastContainer">
          <div className="podcastImage">
            <img src={image} alt={`${title} Picture`} />
            <h1>{updateTitle(title)}</h1>
          </div>
          <div>
            <h3>
              Genres: {genre.map((index) => genreArray[index - 1]).join(` & `)}
            </h3>
            <h4>Seasons: {seasons}</h4>
            <h5>Date Updated: {sliceDate(updated)}</h5>
          </div>
          <div>
            <h2>About</h2>
            <div
              className="paragraph"
              dangerouslySetInnerHTML={{ __html: modifiedText }}
            />
          </div>
        </div>
      );
    }
  );

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="jsonError">Something went wrong!!</h1>;
  }

  return (
    <>
      <div className="backButton">
        <Link to={`..${search}`}>
          <IoArrowBackCircleSharp /> Go back to {type} podcasts
        </Link>
      </div>
      {pod}
    </>
  );
};

export default Podcast;
