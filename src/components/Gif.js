import Image from "react-bootstrap/Image";

function Gif({ gif }) {
  return (
    <div className="bg-warning rounded">
      <Image
        className="w-100 "
        rounded
        src={gif.images.original.url}
        alt={gif.title}></Image>
    </div>
  );
}
export default Gif;
