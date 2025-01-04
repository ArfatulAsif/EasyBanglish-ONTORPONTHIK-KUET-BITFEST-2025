import FeatureCard from "./FeatureCard";
import voice from "../../assets/images/voice.png";
import editor from "../../assets/images/editor.png";
import search from "../../assets/images/search.png";
import group from "../../assets/images/group.png";
import docker from "../../assets/images/docker.png";

const FeatureSection = () => {
  return (
    <div className="mx-6">
      <div className="py-20 bg-gradient-to-b">
        {/* Section title */}
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          {/* <FaWpexplorer className="text-3xl text-primary" /> */}
          <span className="mb-8 text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Exclusive Features
          </span>
        </h1>

        {/* Container for feature cards, with responsive grid layout */}
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 justify-center">
          <FeatureCard
            image={voice}
            title={"Voice Interaction"}
            subTitle={
              "Embed voice functionality for users to input text using voice in both Bangla and English, with content in Bangla."
            }
          />

          <FeatureCard
            image={editor}
            title={"Smart Editor"}
            subTitle={
              "Smart editor along with a translation system to detect common banglish typing mistakes."
            }
          />

          <FeatureCard
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsJg0VZ_OohPt6dIBkUV2kloFjIo-7M0q2Q&s"
            }
            title={"Customizable Bangla Fonts for PDFs"}
            subTitle={
              "Allow users to choose from various Bangla fonts when generating PDFs."
            }
          />

          <FeatureCard
            image={group}
            title={"Real-Time Collaboration"}
            subTitle={
              "Allows multiple users to collaborate on a single document in real-time."
            }
          />

          <FeatureCard
            image={search}
            title={"Search Functionality"}
            subTitle={
              "Search PDFs and user profiles in both Bangla and Banglish."
            }
          />

          <FeatureCard
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsJg0VZ_OohPt6dIBkUV2kloFjIo-7M0q2Q&s"
            }
            title={"Analytics Dashboard"}
            subTitle={
              "Provide an analytics dashboard displaying metrics such as words translated, stories etc."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
