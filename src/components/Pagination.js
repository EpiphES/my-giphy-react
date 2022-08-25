import Button from "react-bootstrap/Button";
import prevIcon from "../images/arrow-left.svg";
import nextIcon from "../images/arrow-right.svg";

function Pagination({onPreviousClick, onNextClick, prevButtonDisabled, nextButtonDisabled}) {
  return (
    <div className="py-2 d-flex justify-content-evenly fixed-bottom bg-dark bg-opacity-75">
      <Button
        variant="light"
        size="sm"
        disabled={prevButtonDisabled}
        onClick={onPreviousClick}>
        <img src={prevIcon} alt="left arrow icon" width="25px" hight="25px" />
      </Button>
      <Button
        variant="light"
        size="sm"
        disabled={nextButtonDisabled}
        onClick={onNextClick}>
        <img src={nextIcon} alt="right arrow icon" width="25px" hight="25px" />
      </Button>
    </div>
  );
}
export default Pagination;