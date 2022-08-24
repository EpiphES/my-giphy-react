import { useState, useEffect } from "react";
import { Route, useRouteMatch} from "react-router-dom";
import Gallery from "./Gallery";
import api from "../utils/api";
import Gif from "./Gif";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { path, url } = useRouteMatch();

  function loadTrendingGifs() {
    setIsLoading(true);
    api
      .getTrendingGifs()
      .then((gifs) => {
        setTrendingGifs(gifs.data);
        console.log(gifs.pagination);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    loadTrendingGifs();
  }, [])

  return (
    <>
      <Route exact path={`${path}`}>
        <Gallery gifs={trendingGifs} isLoading={isLoading} url={url} />
      </Route>
      <Route path={`${path}/gifs/:id`}>
        <Gif />
      </Route>
    </>
  );
}
export default Trending;