import { useState, useEffect } from "react";
import Gallery from "./Gallery";
import api from "../utils/api";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return <Gallery gifs={trendingGifs} isLoading={isLoading} />;
}
export default Trending;