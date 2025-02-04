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
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useSearchParams(); //To get type for filtering
  const [toggleOrder, setToggleOrder] = useState(true);
  const [toggleDateOrder, setToggleDateOrder] = useState(false);
  const [activeSort, setActiveSort] = useState<string | null>(null); // To set as a-z first when the page refreshes
  const [description, setDescription] = useState<Description>({
    id: 0,
    title: "",
    description: "",
    shows: [""],
  });
  const typeFilter = type.get("type"); //Returns as a string
  const filterDes = description.description; //Filter description when the user clicks on the filter
  const filteredPodcast = podcast.filter(({ genres }) => {
    const genre: number[] = genres; //Genres set as numbers
    if (genre.includes(Number(typeFilter))) {
      return genre;
    }
  });
  const filterPod = typeFilter ? filteredPodcast : podcast;
  const titleArray: titleSort[] = filterPod;
  const newDateArray = [...titleArray].sort((a, b) => {
    if (toggleDateOrder) {
      const dateA = new Date(a.updated.slice(0, 10)).getTime();
      const dateB = new Date(b.updated.slice(0, 10)).getTime();
      return dateA - dateB; //oldest-newest
    } else {
      const dateA = new Date(a.updated.slice(0, 10)).getTime();
      const dateB = new Date(b.updated.slice(0, 10)).getTime();
      return dateB - dateA; //newest-oldest
    }
  });
  const genreArray: string[] = [
    "Personal Growth",
    "Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];
  const filterFlex = window.matchMedia("(max-width: 480px)"); //To get boolean and to get a whole new body if it is true
  const filterName = genreArray[Number(typeFilter) - 1] || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [typeFilter]); //For when the user clicks on a link

  useEffect(() => {
    setLoad(true);
    const genreUrl = `https://podcast-api.netlify.app/genre/${Number(
      typeFilter
    )}`; //For the description filter
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

  if (activeSort === null) {
    //For when the active sort is false or has a string
    newDateArray.sort((a, b) =>
      toggleOrder
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  } else {
    titleArray.sort((a, b) => a.title.localeCompare(b.title));
  }

  function updateTitle<T extends string>(title: T) {
    return title.replace("&amp;", "&");
  }

  function handleFilterType(key: string, type: string | null) {
    //for replacing the previous type
    setType((prev) => {
      if (type === null) {
        prev.delete(key);
      } else {
        prev.set(key, type);
      }
      return prev;
    });
  }
  const sortTitleDateArray = () => {
    //onClick function;date
    setToggleDateOrder(!toggleDateOrder);
    setActiveSort("sort");
  };

  const sortTitleArray = () => {
    //onClick function;alphabetically
    setActiveSort(null);
    setToggleOrder(!toggleOrder);
  };

  function sliceDate<T extends string>(updated: T) {
    return updated.slice(0, updated.indexOf("T"));
  }

  const filterButton = (number: string) => {
    return (
      <button
        className={`genreType ${typeFilter === number ? "selected" : ""}`}
        type="button"
        onClick={() => handleFilterType("type", number)}
      >
        {genreArray[Number(number) - 1]}
      </button>
    );
  };

  const pod = newDateArray.map(({ image, id, title, updated }) => {
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
        <h4 className="dateUpdated">Updated: {sliceDate(updated)}</h4>
      </Link>
    );
  });

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 className="jsonError">Something went wrong!!</h1>;
  }

  if (typeFilter && filterFlex.matches) {
    return (
      <>
        {/* Filtered Podcast Name */}
        <h1 className="filterName">{filterName}</h1>
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
        {/* Podcast Variable */}
        <div className="preview">{pod}</div>
        <div className="buttons">
          {filterButton("1")}
          {filterButton("2")}
          {filterButton("3")}
          {filterButton("4")}
          {filterButton("4")}
          {filterButton("5")}
          {filterButton("6")}
          {filterButton("7")}
          {filterButton("8")}
          {filterButton("9")}
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
      </>
    );
  }

  return (
    <>
      <div className="buttons">
        {filterButton("1")}
        {filterButton("2")}
        {filterButton("3")}
        {filterButton("4")}
        {filterButton("4")}
        {filterButton("5")}
        {filterButton("6")}
        {filterButton("7")}
        {filterButton("8")}
        {filterButton("9")}
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
      {/* Podcast Variable */}
      <div className="preview">{pod}</div>
    </>
  );
};

export default MainBody;
