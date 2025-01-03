const ErrorBox = ({ text }) => {
  return (
    <div className="h-[150px] flex justify-center items-center">
      <p className="text-center text-red-500 text-lg">{text}</p>
    </div>
  );
};

export default ErrorBox;
