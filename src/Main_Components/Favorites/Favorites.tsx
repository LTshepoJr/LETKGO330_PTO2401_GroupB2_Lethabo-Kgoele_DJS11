import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import "./Favorites.css";

const Favorites = () => {
  interface PodcastStorage {
    episode: string;
    name: string;
    season: string;
    date: string;
  }

  interface NewPodcastStorage {
    episode: string;
    name: string;
    date: string;
  }

  interface StorageInfo {
    title: string;
    podcast: PodcastStorage;
  }

  const location = useLocation();
  const storageBoolean = JSON.parse(
    localStorage.getItem("Toggle Order") || "true"
  );
  const [toggleOrder, setToggleOrder] = useState(false);
  const favoriteStorage: StorageInfo[] = JSON.parse(
    localStorage.getItem("FavoriteNames") || "[]"
  );
  const [del, setDel] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const removeFav = (title: string) => {
    setDel(!del);
    const removedFav = JSON.parse(
      localStorage.getItem("FavoriteNames") || "[]"
    ).filter((name: StorageInfo) => name.title !== `${title}`);
    localStorage.setItem("FavoriteNames", JSON.stringify(removedFav));
  };

  const sortTitles = () => {
    const sortedTitle = favoriteStorage.sort((a, b) =>
      toggleOrder
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    localStorage.setItem("FavoriteNames", JSON.stringify(sortedTitle));
    setToggleOrder(!toggleOrder);
    localStorage.setItem("Toggle Order", JSON.stringify(toggleOrder));
  };
  interface GroupedFavorites {
    [title: string]: {
      [season: string]: NewPodcastStorage[];
    };
  }
  function groupFavoritesByShowAndSeason(favoritesArray: StorageInfo[]) {
    return favoritesArray.reduce((grouped: GroupedFavorites, episode) => {
      if (!grouped[episode.podcast.name]) {
        grouped[episode.podcast.name] = {};
      }

      if (!grouped[episode.podcast.name][episode.podcast.season]) {
        grouped[episode.podcast.name][episode.podcast.season] = [];
      }

      grouped[episode.podcast.name][episode.podcast.season].push({
        name: episode.title,
        episode: episode.podcast.episode,
        date: episode.podcast.date,
      });

      return grouped;
    }, {});
  }

  const groupedFavorites = groupFavoritesByShowAndSeason(favoriteStorage);
  console.log(groupedFavorites);

  const storageFavInfo = favoriteStorage.map(
    ({ title, podcast: { episode, name, season, date } }) => {
      return (
        <li key={title}>
          <h3>{name}</h3>
          <h4>
            {season}: {episode}
          </h4>
          <h5>
            {title}
            <span id={`episode${title}`} onClick={() => removeFav(title)}>
              <MdDelete />
            </span>
          </h5>
          <h6>Date added: {date}</h6>
        </li>
      );
    }
  );

  if (!localStorage.getItem("FavoriteNames") || !favoriteStorage[0]) {
    return <h1>NO FAVORITES!</h1>;
  }

  return (
    <div className="titleSorting">
      <h2 onClick={sortTitles}>
        Favorite Episode Titles:
        <span>{!storageBoolean ? <FaSortAlphaDown /> : <FaSortAlphaUp />}</span>
      </h2>
      <hr />
      <ul>{storageFavInfo}</ul>
    </div>
  );
};

export default Favorites;
