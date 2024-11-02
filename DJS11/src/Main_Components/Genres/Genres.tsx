import { Link } from "react-router-dom";
import "./Genres.css";

const Genres = () => {
  return (
    <>
      <div className="Links">
        <Link to={`/?type=${1}`} className={`genreLinks`} type="Link">
          Personal Growth
        </Link>
        <Link to={`/?type=${2}`} className={`genreLinks`} type="Link">
          Investigative Journalism
        </Link>
        <Link to={`/?type=${3}`} className={`genreLinks`} type="Link">
          History
        </Link>
        <Link to={`/?type=${4}`} className={`genreLinks`} type="Link">
          Comedy
        </Link>
        <Link to={`/?type=${5}`} className={`genreLinks`} type="Link">
          Entertainment
        </Link>
        <Link to={`/?type=${6}`} className={`genreLinks`} type="Link">
          Business
        </Link>
        <Link to={`/?type=${7}`} className={`genreLinks`} type="Link">
          Fiction
        </Link>
        <Link to={`/?type=${8}`} className={`genreLinks`} type="Link">
          News
        </Link>
        <Link to={`/?type=${9}`} className={`genreLinks`} type="Link">
          Kids and Family
        </Link>
      </div>
    </>
  );
};

export default Genres;
