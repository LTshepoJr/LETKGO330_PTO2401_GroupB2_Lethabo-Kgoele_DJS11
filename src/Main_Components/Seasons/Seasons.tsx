import { useOutletContext } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import "./Seasons.css";

const Seasons = () => {
  interface Seasons {
    episodes: Episodes[];
    image: string;
    season: number;
    title: string;
  }

  interface Episodes {
    description: string;
    episode: number;
    file: string;
    title: string;
  }

  interface OptionSeasons {
    description: string;
    genres: string[];
    id: string;
    image: string;
    seasons: Seasons[];
    title: string;
    updated: string;
  }

  interface StorageInfo {
    title: string;
  }

  const [endpoint, setEndpoint] = useState(0);
  const [load, setLoad] = useState(false);
  const [seasonOption, setSeasonOption] = useState("1");
  const [error, setError] = useState(null);
  const [seasons, setSeasons] = useState({
    id: "",
    title: "",
    description: "",
    seasons: [
      {
        season: 0,
        title: "",
        image: "",
        episodes: [{ description: "", title: "", episode: 0, file: "" }],
      },
    ],
    image: "",
    genres: [""],
    updated: "",
  });
  const outletPod: [] = useOutletContext();
  const optionSeasons: OptionSeasons = seasons;
  const selectSeason = optionSeasons.seasons;
  const filteredSeason = selectSeason.filter(
    ({ season }) => season === Number(seasonOption)
  );
  const [selectedTitle, setSelectedTitle] = useState(false);
  const storageFav: [] = JSON.parse(
    localStorage.getItem("FavoriteNames") || "[]"
  );
  const storageTitle: string[] = storageFav.map(({ title }) => {
    return title;
  });
  const date = new Date();
  const currentDate = date.toLocaleString();

  useEffect(() => {
    if (endpoint) {
      fetch(`https://podcast-api.netlify.app/id/${endpoint}`)
        .then((prom) => prom.json())
        .then((data) => setSeasons(data))
        .catch((err) => setError(err))
        .finally(() => setLoad(false));
    }
  }, [endpoint]);

  useEffect(() => {
    outletPod.map(({ key }) => {
      setEndpoint(key);
    });
  }, [outletPod]);

  const handleEventChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSeasonOption(e.target.value);
  };

  const favEpisode = (
    title: string,
    episode: number,
    filteredSeason: Seasons[],
    Season: OptionSeasons
  ) => {
    setSelectedTitle(!selectedTitle);
    if (storageTitle.includes(title)) {
      localStorage.setItem(
        "FavoriteNames",
        JSON.stringify(
          storageFav.filter((pod: StorageInfo) => pod.title !== title)
        )
      );
    } else {
      localStorage.setItem(
        "FavoriteNames",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("FavoriteNames") || "[]"),
          {
            title,
            podcast: {
              name: Season.title,
              season: filteredSeason.map(({ season }) => `Season ${season}`),
              episode: `Episode: ${episode}`,
              date: currentDate,
            },
          },
        ])
      );
    }
  };

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="jsonError">Something went wrong!!</h1>;
  }

  return (
    <>
      <div className="seasonContainer">
        <select
          name={`Season ${seasonOption}`}
          value={seasonOption}
          onChange={handleEventChange}
          id="seasonSelect"
          aria-label="Choose Season"
        >
          {selectSeason.map(({ season, title }) => {
            return (
              <option key={`${title}${season}`} value={season}>
                Season {season}
              </option>
            );
          })}
        </select>
      </div>
      <div className="filteredSeason">
        {filteredSeason.map(({ title, image, episodes }) => {
          return (
            <div key={title}>
              <img src={image} alt={`${title} Picture`} width="150rem" />
              <h1 className="podHead">{title}</h1>
              <div className="episodeBlock">
                {episodes.map(({ description, title, episode, file }) => (
                  <div key={title}>
                    <h2>
                      <span>
                        S{seasonOption} Ep{episode}:{" "}
                      </span>
                      {title}
                    </h2>
                    <div
                      className={`favorite ${
                        storageTitle.includes(title) ? "favEpisodePath" : ""
                      }`}
                      onClick={() =>
                        favEpisode(title, episode, filteredSeason, seasons)
                      }
                    >
                      <h3>
                        Set as Favorite:{" "}
                        <span>
                          <IoIosStar />
                        </span>{" "}
                      </h3>
                    </div>
                    <p>{description}</p>
                    <div className="audioPlayer">
                      <audio controls className="audioControls">
                        <source src={file} type="audio/mpeg"></source>
                      </audio>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Seasons;
