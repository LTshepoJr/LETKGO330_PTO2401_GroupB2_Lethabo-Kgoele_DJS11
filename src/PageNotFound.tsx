import { Link } from "react-router-dom";
import "./main.css";

const PageNotFound = () => {
  return (
    <div className="returnHome">
      <h1 className="jsonError">Page not found...</h1>
      <Link to="/" className="homeButton">
        Return to home page
      </Link>
    </div>
  );
};

export default PageNotFound;
