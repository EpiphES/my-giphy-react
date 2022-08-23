import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import api from "../utils/api";
import NavBar from "./NavBar";
import Gallery from "./Gallery";
import Search from "./Search";
import Gif from "./Gif"
import Random from "./Random";
import Upload from "./Upload";

function App() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [searchedGifs, setSearchedGifs] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [autocompleteSearches, setAutocommpleteSearches] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function loadTrendingGifs() {
    setIsLoading(true);
    api
      .getTrendingGifs()
      .then((gifs) => {
        setTrendingGifs(gifs.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {setIsLoading(false)});
  }

  function loadTrendingSearches() {
    api
      .getTrendingSearches()
      .then((res) => setTrendingSearches(res.data.slice(0, 5)))
      .catch((err) => console.log(err));
  }

  // function handleUpdateTrending() {
  //   loadTrendingGifs();
  // }

  // useEffect(() => {
  //   loadTrendingGifs();
  // }, []);

  

  function loadAutocompleteSearches(query) {
    api
      .getAutocomplete(query)
      .then((res) =>
        setAutocommpleteSearches(res.data.map((item) => item.name))
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (searchInput === "") {
      loadTrendingSearches();
      setSearchedGifs([]);
      loadTrendingGifs();
      setSearchQuery("");
    } else {
      loadAutocompleteSearches(searchInput);
    }
  }, [searchInput]);

  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }

  function handleSearch(query) {
    setIsLoading(true);
    setSearchInput(query);
    setSearchQuery(query);
    api
      .searchGifs(query)
      .then((res) => {
        if (res.data.length === 0) {
          alert("Nothing found!");
        }

        setSearchedGifs(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleResetSearchInput() {
    setSearchInput("");
  }

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: "56px" }}>
        <Switch>
          <Route path="/trending">
            <Gallery gifs={trendingGifs} isLoading={isLoading} />
          </Route>
          <Route path="/search">
            <Search
              trendingSearches={trendingSearches}
              autocompleteSearches={autocompleteSearches}
              searchInput={searchInput}
              onInputChange={handleInputChange}
              onSearch={handleSearch}
              trendingGifs={trendingGifs}
              searchedGifs={searchedGifs}
              searchQuery={searchQuery}
              onResetInput={handleResetSearchInput}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/random">
            <Random />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/gifs/:id">
            <Gif />          
          </Route>
          <Route path="*">
            <Redirect to="/trending" />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
