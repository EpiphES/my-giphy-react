import "../styles/Gallery.css"
import {useEffect, useRef} from "react"
import Gif from "./Gif";
import Masonry from "masonry-layout";


function Gallery({gifs}) {
  const gifElements = gifs.map((item) => {
    return (
      <Gif key={item.id} gif={item} />
    );
  });
  const gallery = useRef(null)

  function initMasonry() {
    console.log("init");
    return new Masonry(gallery.current, {
      itemSelector: ".gif",
      columnWidth: 200,
      horizontalOrder: true,
      gutter: 20,
      fitWidth: true,
    });    
         
  }

  useEffect (() => {
    initMasonry()
  })

  return (
    <div className="gallery" ref={gallery} onLoad={initMasonry}>
      {gifElements}
    </div>
  );
}
export default Gallery;