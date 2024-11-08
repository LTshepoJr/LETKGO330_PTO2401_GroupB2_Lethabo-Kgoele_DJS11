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
  if (!localStorage.getItem("FavoriteNames")) {
    return <h1>NO FAVORITES!</h1>;
  }
  const favoriteNames: string[] = JSON.parse(
    localStorage.getItem("FavoriteNames") || "[]"
  );
  const titles = favoriteNames.map((names) => <h1 key={names}>{names}</h1>);
  return (
    <>
      <h1>Favorite Title Names:</h1>
      {titles}
    </>
  );
};

export default Favorites;
