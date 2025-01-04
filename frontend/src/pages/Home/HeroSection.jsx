import { Link } from "react-router";
import voice from "../../assets/images/voice.png";
import editor from "../../assets/images/editor.png";
import search from "../../assets/images/search.png";
import group from "../../assets/images/group.png";
import docker from "../../assets/images/docker.png";

const HeroSection = () => {
  return (
    <div className="relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#243B55] to-black min-h-screen ">
      {/* Container for decorative shapes */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0">
        {/* Shape 1: */}
        {/* <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-pink-500 to-purple-500 w-40 h-40 rounded-full mix-blend-multiply opacity-20 animate-bounce-slow"></div> */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-pink-500 to-purple-500 w-40 h-40 rounded-full mix-blend-multiply opacity-20"></div>
        {/* Shape 2: */}
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-tl from-purple-500 to-pink-500 w-24 h-24 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
        {/* Shape 3: */}
        {/* <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-gradient-to-tr from-[#9796f0] to-[#fbc7d4] w-32 h-32 rounded-full mix-blend-multiply opacity-20 animate-bounce"></div> */}
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-gradient-to-tr from-[#9796f0] to-[#fbc7d4] w-32 h-32 rounded-full mix-blend-multiply opacity-20"></div>
      </div>

      {/* Container for floating icons */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        {/* Floating icons with delay animations */}
        {/* <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMnuMzbz69vYztPu00uvu2dXN9afSzfsvFA&s"
          }
          alt="Icon 1"
          className="float-animation anim-delay-1 absolute bottom-[15vh] left-[5vw] hidden md:block md:h-[60px] md:w-[60px] lg:h-[90px] lg:w-[90px]"
        /> */}

        <img
          src={editor}
          alt="Icon 2"
          className="float-animation anim-delay-2 absolute bottom-[43vh] left-[12vw] hidden md:block md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px]"
        />

        <img
          src={search}
          alt="Icon 2"
          className="float-animation anim-delay-3 absolute bottom-[70vh] left-[24vw] hidden md:block md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px]"
        />

        <img
          src={voice}
          alt="Icon 2"
          className="float-animation anim-delay-4 absolute bottom-[80vh] hidden md:block md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px]"
        />

        <img
          src={group}
          alt="Icon 2"
          className="float-animation anim-delay-5 absolute bottom-[70vh] right-[24vw] hidden md:block md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px]"
        />

        <img
          src={docker}
          alt="Icon 2"
          className="float-animation anim-delay-6 absolute bottom-[43vh] right-[12vw] hidden md:block md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px]"
        />

        {/* <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMnuMzbz69vYztPu00uvu2dXN9afSzfsvFA&s"
          }
          alt="Icon 1"
          className="float-animation anim-delay-7 absolute bottom-[15vh] right-[5vw] hidden md:block md:h-[60px] md:w-[60px] lg:h-[90px] lg:w-[90px]"
        /> */}
      </div>

      {/* Main content of the hero section */}
      <div className="mx-6 text-center min-h-[100vh] flex flex-col py-20 justify-center items-center relative z-0 overflow-hidden">
        {/* Title with gradient text */}
        <h1 className="md:translate-y-[15px] text-4xl font-extrabold z-1">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffdde1] to-[#ee9ca7]">
            Enhance Your{" "}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C779D0] to-[#4BC0C8]">
            Bangla Stories
          </span>
        </h1>

        {/* Subtitle with underlined text */}
        <p className="md:translate-y-[15px] text-xl mt-4 text-purple-200">
          <span className="relative">
            <span>AI-powered</span>
            <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 to-purple-500" />
          </span>{" "}
          tools and collaborative features
        </p>

        {/* Call to action button */}
        <Link to="/dashboard">
          <button className="md:translate-y-[15px] my-6 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] group">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF,#393BB2_50%,#E2CBFF)]" />
            <span className=" group-hover:bg-gradient-to-r group-hover:from-[#9796f0] group-hover:to-[#fbc7d4] inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Get Started
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
