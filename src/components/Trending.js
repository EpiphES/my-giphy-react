import { useState, useEffect, useCallback } from "react";
import { Route, useRouteMatch} from "react-router-dom";
import api from "../utils/api";
import Gallery from "./Gallery";
import Gif from "./Gif";
import Pagination from "./Pagination";


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
        <Gallery gifs={trendingGifs} isLoading={isLoading} url={url}/>
        <Pagination onPreviousClick={handlePreviousClick} onNextClick={handleNextClick} prevButtonDisabled={page === 0} nextButtonDisabled={page === totalCount & 30}></Pagination>        
      </Route>
      <Route path={`${path}/gifs/:id`}>
        <Gif />
      </Route>
    </>
  );
}
export default Trending;