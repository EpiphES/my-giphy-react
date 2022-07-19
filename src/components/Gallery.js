import Card from "./Card";

function Gallery({gifs}) {
  const cardsElements = gifs.map((item) => {
    return (
      <li key={item.id} className='gallery__item'>
        <Card card={item}/>
      </li>
    );
  });
  return (
  <ul className="gallery">{cardsElements}</ul>
  );
}
export default Gallery;