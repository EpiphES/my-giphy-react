import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import api from "../utils/api";


function Gif() {
  const history = useHistory();
  const [gif, setGif] = useState({})
  const { id } = useParams();
  function loadGifById(id) {
    api
      .getGifById(id)
      .then((res) => setGif(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    loadGifById(id)
  }, [id]);


  return (
    <Container className="d-flex flex-column justify-content-center pt-3">
      <div
        className="mx-auto bg-warning rounded"
        style={{
          width: gif.images?.original.width
        }}>
        <Image rounded src={gif.images?.original.url} alt={gif.title} />
      </div>
      <Button className="mt-3 mx-auto" onClick={() => history.goBack()}>
        Go back
      </Button>
    </Container>
  );
}
export default Gif;
