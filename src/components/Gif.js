function Gif({gif}) {
  return (
    <div className="bg-light rounded">
      <img
        className="w-100 rounded"
        src={gif.images.original.url}
        alt={gif.title}
        ></img>
    </div>
  );
}
export default Gif;