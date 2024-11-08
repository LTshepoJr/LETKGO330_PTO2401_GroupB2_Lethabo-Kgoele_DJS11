import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import "./Podcast.css";

const Podcast = () => {
  const { id } = useParams();
  const paramsId = id;
  const [podcast, setPodcast] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const filterIdArray = podcast.filter(({ id }) => {
    if (id === paramsId) {
      return id === paramsId;
    }
  });
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
      const modifiedText = des
        .replace(/\*{3}/g, "")
        .replace(/\.{3}/g, "…")
        .replace(
          /(https?:\/\/)?(www\.[a-zA-Z0-9_-]+\.(com|net|org|io|edu)(\/[^\s]*)?)/g,
          "$2"
        )
        .replace(
          /(https?:\/\/[a-zA-Z0-9._-]+\.com[^\s]*)|((?:https?:\/\/|www\.)?[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
          (match, comUrl, otherUrl, _, email) => {
            if (comUrl) {
              return /*html*/ `<a href="${comUrl}" target="_blank" rel="noopener noreferrer">${comUrl.replace(
                /https?:\/\//,
                ""
              )}</a>`;
            }
            if (otherUrl) {
              const href = otherUrl.startsWith("http")
                ? otherUrl
                : `http://${otherUrl}`;
              const displayText = otherUrl.replace(/https?:\/\/|www\./, "");
              return /*html*/ `<a href="${href}" target="_blank" rel="noopener noreferrer">${displayText}</a>`;
            }
            if (email) {
              return /*html*/ `<a class='email' href="mailto:${email}">${email}</a>`;
            }
            return match;
          }
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

  if (filterIdArray[0]) {
    return (
      <>
        <div className="backButton">
          <Link to={`..${search}`}>
            <IoArrowBackCircleSharp /> Go back to {type} podcasts
          </Link>
        </div>
        {pod}
        <Outlet context={pod} />
      </>
    );
  } else {
    return (
      <div className="endpointError">
        <h1 className="jsonError">Requested endpoint not found!</h1>
        <Link to="/" className="homeButton">
          Return to home page
        </Link>
      </div>
    );
  }
};

export default Podcast;
