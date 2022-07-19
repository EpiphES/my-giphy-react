import Card from "./Card";

function Gallery({gifs}) {
  const cardsElements = gifs.map((item) => {
    console.log(item);
    return (
      <li key={item.id}>
        <Card
          card={item}
          
        />
      </li>
    );
  });
  return <ul className="gallery">{cardsElements}</ul>;
}
export default Gallery;