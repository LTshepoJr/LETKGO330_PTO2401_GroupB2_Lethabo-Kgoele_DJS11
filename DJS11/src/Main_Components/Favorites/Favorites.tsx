import { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import "./Favorites.css";

const Favorites = () => {
  // const favNames: string[] = JSON.parse(
  //     localStorage.getItem("FavoriteNames") || "[]"
  //   );
  //   console.log(favNames);

  //   filteredSeason.map(({ episodes }) => {
  //     const favoriteObj = episodes.filter(({ title }) => {
  //       return favNames.find((name) => name === title);
  //     });
  //     console.log(optionSeasons);
  //     console.log(favoriteObj);
  //     // localStorage.setItem("FavoriteObject", JSON.stringify(favoriteObj));
  //     const favoriteSeason = selectSeason.filter((parent) =>
  //       parent.episodes.some((child) => favNames.includes(child.title))
  //     );
  //     // localStorage.setItem("FavoriteSeason", JSON.stringify(favoriteSeason));
  //     if (localStorage.getItem("FavoriteNames")) {
  //       localStorage.setItem(
  //         "FavoriteNames",
  //         JSON.stringify([
  //           ...JSON.parse(localStorage.getItem("FavoriteNames") || ""),
  //           favoriteObj,
  //           favoriteSeason,
  //         ])
  //       );
  //     }
  //     console.log(favoriteSeason);
  //   });

  const storageBoolean = JSON.parse(
    localStorage.getItem("Toggle Order") || "true"
  );
  const [toggleOrder, setToggleOrder] = useState(false);

  const favoriteNames: string[] = JSON.parse(
    localStorage.getItem("FavoriteNames") || "[]"
  );
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
