import { useState } from "react";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import api from "../utils/api";


function Gif() {
  const [gif, setGif] = useState({})
  const { id } = useParams();
  function loadGifById(id) {
    api
      .getGifById(id)
      .then((res) => setGif(res.data))
      .catch((err) => console.log(err));
  }
  loadGifById(id);

  return (    
    <div className="bg-warning rounded">
      <Image
        rounded
        src={gif.images?.original.url}
        alt={gif.title}
      />
    </div>
  );
}
export default Gif;
