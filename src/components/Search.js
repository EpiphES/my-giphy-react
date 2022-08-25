import {useState, useEffect, useCallback} from "react";
import { Route, useRouteMatch } from "react-router-dom";
import api from "../utils/api";
import Trending from "./Trending";
import Gallery from "./Gallery";
import Gif from "./Gif";
import Pagination from "./Pagination";

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
  const { path, url } = useRouteMatch();
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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

  const handleSearch = useCallback((query) => {
    setIsLoading(true);
    setSearchInput(query);
    setSearchQuery(query);
    const offset = page * 30;
    api
      .searchGifs(query, offset)
      .then((res) => {
        if (res.data.length === 0) {
          alert("Nothing found!");
        }
        setSearchedGifs(res.data);
        setTotalCount(res.pagination.total_count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  function resetInput() {
    setSearchInput("");
  }
  
  function getSearchesList(searchesArray) {
    return searchesArray.map((query, index) => (
      <ListGroup.Item action key={index} onClick={() => {
        setPage(0);
        handleSearch(query, page);
        }}>
        <img src={searchIcon} alt="search icon" width="10px" hight="10px"/>{" "}{query}
      </ListGroup.Item>
    ));
  }
  const trendingSearchesList = getSearchesList(trendingSearches);
  const autocompleteSearchesList = getSearchesList(autocompleteSearches);

  function handleFormSubmit(e) {
    e.preventDefault();
    setPage(0);
    handleSearch(searchInput, page);
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

  useEffect(() => {
    if(page > 0)
    handleSearch(searchInput, page);
  }, [page, handleSearch, searchInput])

  function handlePreviousClick() {
    setPage((prevState) => prevState - 1);
  }

  function handleNextClick() {
    setPage((prevState) => prevState + 1);
  }


  return (
    <>
      <Route exact path={`${path}`}>
        <InputGroup as="form" className="pt-3 mb-3" onSubmit={handleFormSubmit}>
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
            <Gallery gifs={searchedGifs} isLoading={isLoading} url={url} />
            <Pagination
              onPreviousClick={handlePreviousClick}
              onNextClick={handleNextClick}
              prevButtonDisabled={page === 0}
              nextButtonDisabled={page === Math.floor(totalCount/30)}></Pagination>
          </>
        ) : (
          <>
            <p className="h6">Popular now</p>
            <Trending />
          </>
        )}
      </Route>
      <Route path={`${path}/gifs/:id`}>
        <Gif />
      </Route>
    </>
  );
}

export default Search;