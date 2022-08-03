import Gallery from "./Gallery";

function Search({searchInput, trendingSearches, autocompleteSearches, onInputChange, onSearch, trendingGifs, searchedGifs, searchQuery}) {
  
  function getSearchesList(searchesArray) {
    return searchesArray.map((query, index) => (
      <p key={index} onClick={() => onSearch(query)}>
        {query}
      </p>
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
      <form className="search__form" name="search-form" onSubmit={handleFormSubmit}>
        <input
          className="search__input"
          type="text"
          name="search"
          id="search-input"
          placeholder="Search all the GIFs"
          minLength="2"
          required
          value={searchInput}
          onChange={(e) => onInputChange(e)}
        />
        <button
          className="search__reset-button"
          type="reset"
          aria-label="reset input" 
          >Reset</button>
        <button
          className="search__submit-button"
          type="submit"
          aria-label="search"
          >Search</button>
      </form>
      <div className="search__query-list">
        {searchInput ? 
        autocompleteSearchesList : 
        trendingSearchesList }
      </div>
      {searchInput ?
      <> 
      {searchQuery && <h2>Search results for: {searchQuery}</h2> }
      <Gallery gifs={searchedGifs} />
      </> : <Gallery gifs={trendingGifs} />}     
    </>
  );
}

export default Search;