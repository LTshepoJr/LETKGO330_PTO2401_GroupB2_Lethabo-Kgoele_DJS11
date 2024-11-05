import { useOutletContext } from "react-router-dom";
import "./Seasons.css";
import { ChangeEvent, useEffect, useState } from "react";
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

  const optionSeasons: OptionSeasons = seasons;
  const selectSeason = optionSeasons.seasons;
  const filteredSeason = selectSeason.filter(
    ({ season }) => season === Number(seasonOption)
  );

  const handleEventChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSeasonOption(e.target.value);
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
          Choose Season:
          {selectSeason.map(({ season, title }) => {
            return (
              <option key={title} value={season}>
                Season {season}
              </option>
            );
          })}
        </select>
      </div>
      <div className="filteredSeason">
        {filteredSeason.map(({ title, image, episodes }) => (
          <div key={title}>
            <img src={image} alt={`${title} Picture`} width="150rem" />
            <div className="episodeBlock">
              {episodes.map(({ description, title, episode, file }) => (
                <div key={title}>
                  <h2>
                    <span>
                      S{seasonOption} Ep{episode}:{" "}
                    </span>
                    {title}
                  </h2>
                  <p>{description}</p>
                  <audio controls>
                    <source src={file} type="audio/mpeg"></source>
                  </audio>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Seasons;