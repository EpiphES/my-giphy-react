function Search({searchQuery, trendingSearches, autocompleteSearches, onInputChange, onSearch}) {
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
    onSearch(searchQuery);
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
          value={searchQuery}
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
        {searchQuery ? 
        autocompleteSearchesList : 
        trendingSearchesList }
      </div>
      
    </>
  );
}

export default Search;