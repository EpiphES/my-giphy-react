import { useState, useEffect, useCallback } from "react";
import { Route, useRouteMatch} from "react-router-dom";
import Gallery from "./Gallery";
import api from "../utils/api";
import Gif from "./Gif";
import Button from "react-bootstrap/Button";
import prevIcon from "../images/arrow-left.svg";
import nextIcon from "../images/arrow-right.svg";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { path, url } = useRouteMatch();
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
 

  const loadTrendingGifs = useCallback((page) => {
    setIsLoading(true);
    const offset = page * 30;
    api
      .getTrendingGifs(offset)
      .then((gifs) => {        
        setTrendingGifs(gifs.data);
        setTotalCount(gifs.pagination.total_count);        
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
      loadTrendingGifs(page);   
  }, [page, loadTrendingGifs])

  function handlePreviousClick() {
    setPage(prevState => prevState - 1);
  }

  function handleNextClick() {
    setPage((prevState) => prevState + 1);
  }

  return (
    <>
      <Route exact path={`${path}`}>
        <Gallery gifs={trendingGifs} isLoading={isLoading} url={url} />
        <div className="py-2 d-flex justify-content-evenly fixed-bottom bg-dark bg-opacity-75">
          <Button
            variant="light"
            size="sm"
            disabled={page === 0}
            onClick={handlePreviousClick}>
            <img
              src={prevIcon}
              alt="left arrow icon"
              width="25px"
              hight="25px"
            />
          </Button>
          <Button
            variant="light"
            size="sm"
            disabled={page === totalCount % 30}
            onClick={handleNextClick}>
            <img
              src={nextIcon}
              alt="right arrow icon"
              width="25px"
              hight="25px"
            />
          </Button>
        </div>
      </Route>
      <Route path={`${path}/gifs/:id`}>
        <Gif />
      </Route>
    </>
  );
}
export default Trending;