import { Spinner } from "@nextui-org/react";

const PageLoadingSpinner = () => {
  return (
    <div className="h-[150px] flex justify-center items-center">
      <Spinner color="primary" label="Loading..." />
    </div>
  );
};

export default PageLoadingSpinner;
