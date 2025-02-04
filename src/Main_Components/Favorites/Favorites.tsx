import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { RiSortNumberAsc, RiSortNumberDesc } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import "./Favorites.css";

const Favorites = () => {
  interface PodcastStorage {
    episode: string;
    name: string;
    season: string[];
    date: string;
  }

  interface StorageInfo {
    title: string;
    podcast: PodcastStorage;
  }

  interface itemsDetails {
    title: string;
    episode: string;
    date: string;
  }
  interface GroupedPodcasts {
    name: string;
    seasons: string[];
    items: itemsDetails[];
  }

  const location = useLocation();
  const storageBoolean = JSON.parse(
    localStorage.getItem("Toggle Order") || "true"
  );
  const storageDateBoolean = JSON.parse(
    localStorage.getItem("Toggle Date Order") || "true"
  );
  const [toggleOrder, setToggleOrder] = useState(false);
  const [toggleDateOrder, setToggleDateOrder] = useState(false);
  const favoriteStorage: StorageInfo[] = JSON.parse(
    localStorage.getItem("FavoriteNames") || "[]"
  );
  const [del, setDel] = useState(false);
  const groupedResults = groupPodcasts(favoriteStorage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  function groupPodcasts(episodes: StorageInfo[]): GroupedPodcasts[] {
    const groups = new Map<string, GroupedPodcasts>();
    for (const episode of episodes) {
      // Create a normalized key combining podcast name and sorted seasons
      const sortedSeasons = episode.podcast.season;
      const groupKey = `${episode.podcast.name}_${sortedSeasons}`;
      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          name: episode.podcast.name,
          seasons: sortedSeasons,
          items: [],
        });
      }

      groups.get(groupKey)?.items.push({
        title: episode.title,
        episode: episode.podcast.episode,
        date: episode.podcast.date,
      });
    }

    return Array.from(groups.values());
  }

  const removeFav = (title: string) => {
    //OnClick. Remove the favorite episode
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
    localStorage.setItem("Toggle Order", JSON.stringify(toggleOrder)); //set to true or false
  };

  const sortDate = () => {
    const newDateArray = favoriteStorage.sort((a, b) => {
      if (toggleDateOrder) {
        const dateA = new Date(a.podcast.date).getTime();
        const dateB = new Date(b.podcast.date).getTime();
        return dateA - dateB; //oldest-newest
      } else {
        const dateA = new Date(a.podcast.date).getTime();
        const dateB = new Date(b.podcast.date).getTime();
        return dateB - dateA; //newest-oldest
      }
    });
    localStorage.setItem("FavoriteNames", JSON.stringify(newDateArray));
    setToggleDateOrder(!toggleDateOrder);
    localStorage.setItem("Toggle Date Order", JSON.stringify(toggleDateOrder)); //set to true or false
  };

  const storageFavInfo = groupedResults.map(({ name, seasons, items }) => {
    const item = items.map(({ episode, title, date }) => {
      return (
        <div key={title}>
          <h5>
            {`${episode} | ${title}`}
            <span onClick={() => removeFav(title)}>
              <MdDelete />
            </span>
          </h5>
          <h6>{`Date Added: ${date}`}</h6>
        </div>
      );
    });
    return (
      <li key={`${name}-${seasons}`}>
        <div>
          <h3>{name}</h3>
          <h4>{seasons}</h4>
          {item}
        </div>
      </li>
    );
  });

  if (!localStorage.getItem("FavoriteNames") || !favoriteStorage[0]) {
    return <h1>NO FAVORITES!</h1>;
  }

  return (
    <>
      <div className="titleSorting">
        <h2 onClick={sortTitles}>
          Favorite Episode Titles:
          <span>
            {!storageBoolean ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          </span>
        </h2>
        <h2 onClick={() => sortDate()}>
          Sort Date:
          {!storageDateBoolean ? " Latest" : " Oldest"}
          {storageDateBoolean ? <RiSortNumberAsc /> : <RiSortNumberDesc />}
        </h2>
        <hr />
        <ul>{storageFavInfo}</ul>
      </div>
    </>
  );
};

export default Favorites;
