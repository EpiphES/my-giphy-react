import Gallery from "./Gallery";

function Trending({gifs, onUpdateTrending}) {
  return (
    <>
      <h2>Trending</h2>
      <button className="update-button" onClick={onUpdateTrending}>Update</button>
      
      <Gallery gifs={gifs} />
    </>
  );
}

export default Trending;