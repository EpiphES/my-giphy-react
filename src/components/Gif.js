import { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import api from "../utils/api";


function Gif() {
  const history = useHistory();
  const [gif, setGif] = useState({})
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const loadGifById = useCallback(
    (id) => {
      setIsLoading(true);
      api
        .getGifById(id)
        .then((res) => setGif(res.data))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    },
    [setIsLoading]
  );
  
  useEffect(() => {
    loadGifById(id)
  }, [id, loadGifById]);

  return (
    <Container
      className="d-flex flex-column align-items-center pt-3"
      >
      {isLoading ? (
         <Container className="d-flex align-items-center justify-content-center" style={{
          minHeight:"calc(100vh - 56px)"
        }}>
          <Spinner animation="border" variant="danger" role="status" />          
        </Container>
      ) : (
        <div
          className="mx-auto rounded bg-warning"
          style={{
            width: gif.images?.original.width + "px",
            maxWidth: "100%",
            aspectRatio: gif.images?.original.width / gif.images?.original.height,
          }}>
          <Image
            rounded
            src={gif.images?.original.url}
            alt={gif.title}
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
      <Button className="mt-3 mx-auto" onClick={() => history.goBack()}>
        Go back
      </Button>
    </Container>
  );
}
export default Gif;
