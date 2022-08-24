import {useState, useEffect} from "react";
import api from "../utils/api";
import Trending from "./Trending";
import Gallery from "./Gallery";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import searchIcon from "../images/search.svg"



function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedGifs, setSearchedGifs] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [autocompleteSearches, setAutocommpleteSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  function resetInput() {
    setSearchInput("");
  }
  
  function getSearchesList(searchesArray) {
    return searchesArray.map((query, index) => (
      <ListGroup.Item action key={index} onClick={() => handleSearch(query)}>
        <img src={searchIcon} alt="search icon" width="10px" hight="10px"/>{" "}{query}
      </ListGroup.Item>
    ));
  }
  const trendingSearchesList = getSearchesList(trendingSearches);
  const autocompleteSearchesList = getSearchesList(autocompleteSearches);

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSearch(searchInput);
  }

  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    if (searchInput === "") {
      loadTrendingSearches();
      setSearchedGifs([]);
      setSearchQuery("");
    } else {
      loadAutocompleteSearches(searchInput);
    }
  }, [searchInput]);

  return (
    <>
      <InputGroup as="form" className="pt-2 mb-3" onSubmit={handleFormSubmit}>
        <Form.Control
          type="text"
          placeholder="Search all the GIFs"
          name="search"
          id="search-input"
          minLength="2"
          required
          value={searchInput}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          variant="outline-dark"
          aria-label="reset input"
          as="input"
          type="reset"
          value="Reset"
          onClick={() => resetInput()}
        />
        <Button
          aria-label="search"
          variant="warning"
          as="input"
          type="submit"
          value="Search"
        />
      </InputGroup>
      <ListGroup variant="flush" className="mb-3">
        {searchInput ? (
          autocompleteSearchesList
        ) : (
          <>
            <p className="h6">Trending searches</p>
            {trendingSearchesList}
          </>
        )}
      </ListGroup>
      {searchInput ? (
        <>
          {searchQuery && <h3>Search results for: {searchQuery}</h3>}
          <Gallery gifs={searchedGifs} isLoading={isLoading} />
        </>
      ) : (
        <>
          <p className="h6">Popular now</p>
          <Trending />
        </>
      )}
    </>
  );
}

export default Search;