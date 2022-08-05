import Container from "react-bootstrap/Container";
import Gallery from "./Gallery";

function Trending({gifs}) {
  return (
    <Container
      style={{ marginTop: "66px", paddingBottom: "10px" }}>
      <Gallery gifs={gifs} />
    </Container>
  );
}

export default Trending;