function Card({card}) {
  return (
  <div className="card">
    <figure className="card__contain">
      <img className="card__image" src={card.images.original.url} alt={card.title}></img>
      <figcaption className="card__title">{card.title}</figcaption>
    </figure>
  </div>
  )
}
export default Card;