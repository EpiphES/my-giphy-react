import Gif from "./Gif";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function Gallery({gifs}) {
  const gifElements = gifs.map((item) => {
    return (      
        <Gif key={item.id} gif={item} />
    );
  });

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 576: 3,768: 4, 992: 5, 1200: 6 }}>
      <Masonry gutter="10px">
        {gifElements}
      </Masonry>
    </ResponsiveMasonry>
  );
}
export default Gallery;