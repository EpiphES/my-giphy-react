import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";


function Gallery({gifs, isLoading, url, onPreviousClick, onNextClick, prevButtonDisabled, nextButtonDisabled}) {
  const gifElements = gifs.map((gif, ind) => {
    return (
      <Link
        key={ind}
        to={`${url}/gifs/${gif.id}`}
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

  return isLoading ? (
    <Container fluid className="pt-3 d-flex justify-content-center">
      <Spinner
        animation="border"
        variant="danger"
        role="status"
        className="mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  ) : (
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 576: 3, 768: 4, 992: 5, 1200: 6 }}
        className="pt-2"
        style={{ paddingBottom: "60px" }}>
        <Masonry gutter="10px">{gifElements}</Masonry>
      </ResponsiveMasonry>
  );
}
export default Gallery;