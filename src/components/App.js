
import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import api from "../utils/api";
import NavBar from "./NavBar";
import Gallery from "./Gallery";
import Search from "./Search";
import Random from "./Random";
import Upload from "./Upload";
import { Container } from "react-bootstrap";

function App() {
  const [trendingGifs, setTrendingGifs] = useState([]);

  const [searchedGifs, setSearchedGifs] = useState([]);

  const [trendingSearches, setTrendingSearches] = useState([]);

  const [autocompleteSearches, setAutocommpleteSearches] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function loadTrendingGifs() {
    api
      .getTrendingGifs()
      .then((gifs) => {
        setTrendingGifs(gifs.data);
      })
      .catch((err) => console.log(err));
  }

  // function handleUpdateTrending() {
  //   loadTrendingGifs();
  // }

  // useEffect(() => {
  //   loadTrendingGifs();
  // }, []);

  function loadTrendingSearches() {
    api
      .getTrendingSearches()
      .then((res) => setTrendingSearches(res.data.slice(0, 5)))
      .catch((err) => console.log(err));
  }

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
      .catch((err) => console.log(err));
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
            <Gallery gifs={trendingGifs} />
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
            />
          </Route>
          <Route path="/random">
            <Random />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/gifs/:id">
            GifView
            {/* <GifView /> */}
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
