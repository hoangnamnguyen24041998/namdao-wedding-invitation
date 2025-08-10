import { ReactSVG } from "react-svg";
import { IcHeart } from "../../assets";
import "./heart.css";

const Heart = ({ style }: { style: React.CSSProperties }) => {
  return (
    <div className="heart" style={style}>
      <ReactSVG src={IcHeart} />
    </div>
  );
};

export default Heart;
