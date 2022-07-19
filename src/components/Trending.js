import Gallery from "./Gallery";
function Trending({gifs}) {
  return (
    <>
      <h2>Trending</h2>
      
      <Gallery gifs={gifs} />
    </>
  );
}

export default Trending;