import BackgroundGradient from "../../components/BackgroundGradient/BackgroundGradient";

const FeatureCard = ({ image, title, subTitle }) => {
  return (
    <BackgroundGradient className="h-full cursor-pointer rounded-[22px] w-full p-4 sm:p-10 bg-zinc-900">
      <div className="flex items-center justify-left">
        <img draggable={false} src={image} height="200" width="200" />
      </div>
      <p className="text-base sm:text-xl text-black mt-4 mb-2 text-white">
        {title}
      </p>

      <p className="text-sm text-neutral-400">{subTitle}</p>
    </BackgroundGradient>
  );
};

export default FeatureCard;
