import { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import "./Favorites.css";

const Favorites = () => {
  const storageBoolean = JSON.parse(
    localStorage.getItem("Toggle Order") || "true"
  );
  const [toggleOrder, setToggleOrder] = useState(false);

  const favoriteNames: string[] = JSON.parse(
    localStorage.getItem("FavoriteNames") || "[]"
  );
  // const removeTitle = () => {};
  const titles = favoriteNames.map((names) => <h2 key={names}>{names}</h2>);
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
  console.log(storageBoolean);
  return (
    <div className="titleSorting">
      <h1 onClick={sortTitles}>
        Favorite Title Names:
        <span>{!storageBoolean ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</span>
      </h1>
      {titles}
    </div>
  );
};

export default Favorites;
