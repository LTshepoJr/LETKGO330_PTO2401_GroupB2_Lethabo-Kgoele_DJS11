import { useEffect, useState } from "react";
import "./Genres.css";

const Genres = () => {
  const [genresArray, setGenresArray] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoad(true);
    fetch("https://podcast-api.netlify.app/")
      .then((prom) => prom.json())
      .then((data) => setGenresArray(data))
      .catch((err) => setError(err))
      .finally(() => setLoad(false));
  }, []);

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

  const genres = genresArray.map(({ genres }) => {
    function iterateGenre<T extends number>(array: T[]) {
      return array.map((index) => genreArray[index - 1]);
    }
    return iterateGenre(genres);
  });
  console.log(genres);
  function genreDisplay<T extends string>(genreArray: T[]) {
    return genreArray.map((name, index) => (
      <div className="genreList" key={index}>
        <h2>{name}</h2>
      </div>
    ));
  }

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="jsonError">Something went wrong!!</h1>;
  }

  const genreResult = genreDisplay(genreArray);

  return <>{genreResult}</>;
};

export default Genres;
