import Gallery from "./Gallery";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import searchIcon from "../images/search.svg"


function Search({searchInput, trendingSearches, autocompleteSearches, onInputChange, onSearch, trendingGifs, searchedGifs, searchQuery, onResetInput}) {
  
  function getSearchesList(searchesArray) {
    return searchesArray.map((query, index) => (
      <ListGroup.Item action key={index} onClick={() => onSearch(query)}>
        <img src={searchIcon} alt="search icon" width="10px" hight="10px"/>{" "}{query}
      </ListGroup.Item>
    ));
  }
  const trendingSearchesList = getSearchesList(trendingSearches);
  const autocompleteSearchesList = getSearchesList(autocompleteSearches);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSearch(searchInput);
  }

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
          onChange={(e) => onInputChange(e)}
        />
        <Button
          variant="outline-dark"
          aria-label="reset input"
          as="input"
          type="reset"
          value="Reset"
          onClick={() => onResetInput()}
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
          <Gallery gifs={searchedGifs} />
        </>
      ) : (
        <>
          <p className="h6">Popular now</p>
          <Gallery gifs={trendingGifs} />
        </>
      )}
    </>
  );
}

export default Search;