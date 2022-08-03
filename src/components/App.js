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
  const [trendingGifs, setTrendingGifs] = useState([]);

  const [trendingSearches, setTrendingSearches] = useState([]);

  const [autocompleteSearches, setAutocommpleteSearches] = useState([]); 

  const [searchQuery, setSearchQuery] = useState("");
  
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

  function loadTrendingSearches() {
    api
      .getTrendingSearches()
      .then((res) => setTrendingSearches(res.data.slice(0, 5)))
      .catch((err) => console.log(err));
  }

  function loadAutocompleteSearches(query) {
    api
      .getAutocomplete(query)
      .then((res) => {console.log(res.data);setAutocommpleteSearches(res.data.map(item => item.name))})
      .catch((err) => console.log(err));
  }

  useEffect (() => {
    if(searchQuery === "") {
      loadTrendingSearches();
    }
    else {
      loadAutocompleteSearches(searchQuery);
    }

  }, [searchQuery])

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearch(query) {
    api
      .searchGifs(query)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <Tabs />
      <Switch>
        <Route path="/trending">
          <Trending gifs={trendingGifs} onUpdateTrending={handleUpdateTrending}/>
        </Route>
        <Route path="/search">
          <Search 
            trendingSearches={trendingSearches} autocompleteSearches={autocompleteSearches} 
            searchQuery={searchQuery} onInputChange={handleInputChange}
            onSearch={handleSearch} />
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
