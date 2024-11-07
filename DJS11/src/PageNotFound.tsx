import { Link } from "react-router-dom";
import "./main.css";

const PageNotFound = () => {
  return (
    <>
      <h1>This is page not found</h1>
      <Link to="/">Return to home page</Link>
    </>
  );
};

export default PageNotFound;
