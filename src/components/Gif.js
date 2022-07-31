import "../styles/Gif.css"
function Gif({gif}) {
  return (
  <div className="gif">
    <img className="gif__image" src={gif.images.original.url} alt={gif.title}></img>
  </div>
  )
}
export default Gif;