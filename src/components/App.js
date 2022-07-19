import "../styles/App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import api from "../utils/api";
import Tabs from './Tabs';
import Trending from "./Trending";
import Search from "./Search";
import Random from "./Random";
import Upload from "./Upload";


function App() {
  const [trendingGifs, setTrendingGifs] = useState([])

  useEffect(() => {
    api
      .getTrendingGifs()
      .then((gifs) => {
        setTrendingGifs(gifs.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Tabs />
        <Switch>
          <Route path="/trending">
            <Trending gifs={trendingGifs}/>
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/random">
            <Random />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
