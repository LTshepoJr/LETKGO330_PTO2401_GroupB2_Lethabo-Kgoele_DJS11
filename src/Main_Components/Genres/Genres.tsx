import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./Genres.css";

const Genres = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  const filterLink = (number: number) => (
    <Link to={`/?type=${number}`} className={`genreLinks`} type="Link">
      {genreArray[number - 1]}
    </Link>
  );

  return (
    <>
      <div className="Links">
        {filterLink(1)}
        {filterLink(2)}
        {filterLink(3)}
        {filterLink(4)}
        {filterLink(5)}
        {filterLink(6)}
        {filterLink(7)}
        {filterLink(8)}
        {filterLink(9)}
      </div>
    </>
  );
};

export default Genres;
