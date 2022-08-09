// import Gif from "./Gif";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

function Gallery({gifs}) {
  const gifElements = gifs.map((gif) => {
    return (
        <Link
          key={gif.id}
          to={`/gifs/${gif.id}`}
          className="bg-warning rounded"
          style={{
            aspectRatio: gif.images.original.width / gif.images.original.height,
          }}>
          <Image
            className="w-100 "
            rounded
            src={gif.images.original.url}
            alt={gif.title}
        />
      </Link>        
    );
  });

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 576: 3,768: 4, 992: 5, 1200: 6 }} className="pt-2 pb-2">
      <Masonry gutter="10px">
        {gifElements}
      </Masonry>
    </ResponsiveMasonry>
  );
}
export default Gallery;