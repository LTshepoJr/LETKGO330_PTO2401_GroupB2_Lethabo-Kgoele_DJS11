import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const MainBody = () => {
  interface Description {
    id: number;
    title: string;
    description: string;
    shows: string[];
  }

  const [podcast, setPodcast] = useState([]);
  const [description, setDescription] = useState<Description>({
    id: 0,
    title: "",
    description: "",
    shows: [""],
  });
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useSearchParams();
  const typeFilter = type.get("type");

  useEffect(() => {
    setLoad(true);
    const genreUrl = `https://podcast-api.netlify.app/genre/${Number(
      typeFilter
    )}`;
    const defaultUrl = "https://podcast-api.netlify.app/";

    const fetchPromises = typeFilter
      ? [
          fetch(defaultUrl).then((prom) => prom.json()),
          fetch(genreUrl).then((prom) => prom.json()),
        ]
      : [fetch(defaultUrl).then((prom) => prom.json())];

    Promise.all(fetchPromises)
      .then(([defaultUrl, genreUrl]) => {
        if (typeFilter) {
          setPodcast(defaultUrl);
          setDescription(genreUrl);
        } else {
          setPodcast(defaultUrl);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoad(false));
  }, [typeFilter]);

  const filterDes = description.description;

  function updateTitle<T extends string>(title: T) {
    return title.replace("&amp;", "&");
  }

  function handleFilterType(key: string, type: string | null) {
    setType((prev) => {
      if (type === null) {
        prev.delete(key);
      } else {
        prev.set(key, type);
      }
      return prev;
    });
  }

  const filteredPodcast = podcast.filter(({ genres }) => {
    const genre: number[] = genres;
    if (genre.includes(Number(typeFilter))) {
      return genre;
    }
  });

  const filterPod = typeFilter ? filteredPodcast : podcast;
  const titleArray: Description[] = filterPod;
  titleArray.sort((a, b) => a.title.localeCompare(b.title));

  const pod = filterPod.map(({ image, id, title }) => {
    return (
      <Link
        to={id}
        className="podcastWrapper"
        key={id}
        state={{ searchParams: `?${type}`, type: typeFilter }}
      >
        <div key={id} className="singlePodcast">
          <img src={image} alt={`${title} Picture`} />
          <h4>{updateTitle(title)}</h4>
        </div>
      </Link>
    );
  });

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="jsonError">Something went wrong!!</h1>;
  }

  return (
    <>
      <div className="buttons">
        <button
          className={`genreType ${typeFilter === "1" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "1")}
        >
          Personal Growth
        </button>
        <button
          className={`genreType ${typeFilter === "2" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "2")}
        >
          Investigative Journalism
        </button>
        <button
          className={`genreType ${typeFilter === "3" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "3")}
        >
          History
        </button>
        <button
          className={`genreType ${typeFilter === "4" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "4")}
        >
          Comedy
        </button>
        <button
          className={`genreType ${typeFilter === "5" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "5")}
        >
          Entertainment
        </button>
        <button
          className={`genreType ${typeFilter === "6" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "6")}
        >
          Business
        </button>
        <button
          className={`genreType ${typeFilter === "7" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "7")}
        >
          Fiction
        </button>
        <button
          className={`genreType ${typeFilter === "8" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "8")}
        >
          News
        </button>
        <button
          className={`genreType ${typeFilter === "9" ? "selected" : ""}`}
          type="button"
          onClick={() => handleFilterType("type", "9")}
        >
          Kids and Family
        </button>
        {typeFilter ? (
          <button
            className={`genreType clear-filters`}
            type="button"
            onClick={() => handleFilterType("type", null)}
          >
            Clear Filter
          </button>
        ) : null}
      </div>
      <div className="about">
        {typeFilter ? <h2>About</h2> : null}
        {typeFilter ? (
          <>
            <p>{filterDes}</p>
            <br />
            <hr />
          </>
        ) : null}
      </div>
      <div className="preview">{pod}</div>
    </>
  );
};

export default MainBody;
