import "../styles/Gallery.css"
import Gif from "./Gif";

function Gallery({gifs}) {
  const gifElements = gifs.map((item) => {
    return (
      <Gif key={item.id} gif={item} />
    );
  });
           
  return (
    <div className="gallery">
      {gifElements}
    </div>
  );
}
export default Gallery;