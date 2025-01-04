import { Link } from "react-router";
import bangla from "../../../assets/images/bangla.png";

const Logo = ({ showText }) => {
  return (
    <Link to="/">
      <div className="flex gap-2 items-center">
        {/* <div className="flex">
          <div className="rounded-full primary-gradient h-[36px] w-[36px] relative">
            <div className="h-[23px] w-[23px] border-1 rounded-sm border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="h-[4px] w-[4px] absolute top-[6px] left-[6px] bg-black rounded-full"></div>
            <div className="h-[4px] w-[4px] absolute top-[6px] right-[6px] bg-black rounded-full"></div>
            <div className="h-[4px] w-[4px] absolute bottom-[6px] right-[6px] bg-black rounded-full"></div>
            <div className="h-[4px] w-[4px] absolute bottom-[6px] left-[6px] bg-black rounded-full"></div>
          </div>
        </div> */}
        <img src={bangla} alt="Bangla" className="h-8" />

        {showText && <p className="font-bold text-[#c6c6c6]">Easy Banglish</p>}
      </div>
    </Link>
  );
};

export default Logo;
