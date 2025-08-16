import { ReactSVG } from "react-svg";
import { IcHeart } from "../../assets";
import "./heart.css";

const Heart = ({ style }: { style: React.CSSProperties }) => {
  return (
    <div className="heart" style={style}>
      <ReactSVG
        src={IcHeart}
        beforeInjection={(svg) => {
          svg.setAttribute("width", "1.5rem");
          svg.setAttribute("height", "1.5rem");
        }}
      />
    </div>
  );
};

export default Heart;
