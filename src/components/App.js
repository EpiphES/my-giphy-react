import "../styles/App.css";
import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import api from "../utils/api";
import Tabs from './Tabs';
import Trending from "./Trending";
import Search from "./Search";
import Random from "./Random";
import Upload from "./Upload";



function App() {
  const [trendingGifs, setTrendingGifs] = useState([])
  
  function loadTrendingGifs() {
    api
      .getTrendingGifs()
      .then((gifs) => {
        setTrendingGifs(gifs.data);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateTrending() {
    loadTrendingGifs();
  }

  useEffect(() => {
    loadTrendingGifs();
  }, []);

  return (
    <div className="App">
      <Tabs />
      <Switch>
        <Route path="/trending">
          <Trending gifs={trendingGifs} onUpdateTrending={handleUpdateTrending}/>
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
        <Route path="/gifs/:id">
          
        </Route>
        <Route path="*">
          <Redirect to="/trending"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
