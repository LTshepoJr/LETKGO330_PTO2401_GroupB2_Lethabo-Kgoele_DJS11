import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import "./Favorites.css";
import { useLocation } from "react-router-dom";

const Favorites = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const storageBoolean = JSON.parse(
    localStorage.getItem("Toggle Order") || "true"
  );
  const [toggleOrder, setToggleOrder] = useState(false);

  const favoriteNames: string[] = JSON.parse(
    localStorage.getItem("FavoriteNames") || "[]"
  );
  // const removeTitle = () => {};
  const titles = favoriteNames.map((names) => (
    <ul key={names}>
      <li>{names}</li>
    </ul>
  ));
  const sortTitles = () => {
    const sortedTitle = [...favoriteNames.map((names) => names)].sort((a, b) =>
      toggleOrder ? a.localeCompare(b) : b.localeCompare(a)
    );
    localStorage.setItem("FavoriteNames", JSON.stringify(sortedTitle));
    setToggleOrder(!toggleOrder);
    localStorage.setItem("Toggle Order", JSON.stringify(toggleOrder));
  };

  if (!localStorage.getItem("FavoriteNames")) {
    return <h1>NO FAVORITES!</h1>;
  }
  return (
    <div className="titleSorting">
      <h2 onClick={sortTitles}>
        Favorite Title Names:
        <span>{!storageBoolean ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</span>
      </h2>
      <hr />
      {titles}
    </div>
  );
};

export default Favorites;
