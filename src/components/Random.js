import { useState, useEffect } from "react";
import api from "../utils/api";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Random() {
  const [gif, setGif] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function loadRandomGif() {
    setIsLoading(true);
    api
      .getRandomGif()
      .then((res) => {
        setGif(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadRandomGif();
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center pt-3">
      {isLoading ? (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{
            minHeight: "calc(100vh - 56px)",
          }}>
          <Spinner animation="border" variant="danger" role="status" />
        </Container>
      ) : (
        gif && (
          <>
            <div
              className="mx-auto rounded bg-warning"
              style={{
                width: gif.images.original.width + "px",
                maxWidth: "100%",
                aspectRatio:
                  gif.images.original.width / gif.images.original.height,
              }}>
              <Image
                rounded
                src={gif.images.original.url}
                alt={gif.title}
                style={{ maxWidth: "100%" }}
              />
            </div>
            <Button className="mt-3 mx-auto" onClick={loadRandomGif}>
              Update
            </Button>
          </>
        )
      )}
    </Container>
  );
}

export default Random;