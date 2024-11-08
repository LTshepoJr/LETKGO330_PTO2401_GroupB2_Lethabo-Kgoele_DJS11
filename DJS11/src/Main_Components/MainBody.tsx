import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { RiSortNumberAsc, RiSortNumberDesc } from "react-icons/ri";

const MainBody = () => {
  interface Description {
    id: number;
    title: string;
    description: string;
    shows: string[];
  }
  interface titleSort {
    title: string;
    updated: string;
    image: string;
    id: string;
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
  const titleArray: titleSort[] = filterPod;
  const [toggleOrder, setToggleOrder] = useState(true);
  const [toggleDateOrder, setToggleDateOrder] = useState(false);
  const [activeSort, setActiveSort] = useState<string | null>(null);
  titleArray.sort((a, b) => a.title.localeCompare(b.title));
  const newDateArray = [...titleArray].sort((a, b) => {
    if (toggleDateOrder) {
      const dateA = new Date(a.updated.slice(0, 10)).getTime();
      const dateB = new Date(b.updated.slice(0, 10)).getTime();
      return dateA - dateB;
    } else {
      const dateA = new Date(a.updated.slice(0, 10)).getTime();
      const dateB = new Date(b.updated.slice(0, 10)).getTime();
      return dateB - dateA;
    }
  });
  if (activeSort === "sort") {
    newDateArray.sort((a, b) =>
      toggleOrder
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }
  const sortTitleDateArray = () => {
    setToggleDateOrder(!toggleDateOrder);
    setActiveSort(null);
  };
  const sortTitleArray = () => {
    setToggleOrder(!toggleOrder);
    setActiveSort("sort");
  };

  const pod = newDateArray.map(({ image, id, title }) => {
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
      <div className="sortingSection">
        <div onClick={sortTitleArray}>
          <h2>
            Sort Title
            {toggleOrder ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          </h2>
        </div>
        <div onClick={sortTitleDateArray}>
          <h2>
            Sort Date:
            {!toggleDateOrder ? " Latest" : " Oldest"}
            {toggleDateOrder ? <RiSortNumberAsc /> : <RiSortNumberDesc />}
          </h2>
        </div>
      </div>
      <div className="preview">{pod}</div>
    </>
  );
};

export default MainBody;
