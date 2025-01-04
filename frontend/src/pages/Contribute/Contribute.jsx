import { LuHeartHandshake } from "react-icons/lu";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { IoDocumentsOutline } from "react-icons/io5";
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const Contribute = () => {
  const breadcrumbLinks = [
    { text: "Contribute", to: "/dashboard/contribute", icon: LuHeartHandshake },
  ];
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    const form = event.target;
    const banglish = event.target.banglish.value;
    const bangla = event.target.bangla.value;

    axiosInstance
      .post(`/translate/add?token=${localStorage.getItem("token")}`, {
        banglish,
        bangla,
      })
      .then((res) => {
        toast.success("Contribution submitted successfully!");
        console.log(res.data);
        setLoading(false);
        form.reset();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          <LuHeartHandshake className="text-3xl text-primary" />
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Contribute To System Improvement
          </span>
        </h1>

        <div>
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-4">
              <Textarea
                name="banglish"
                className=""
                label="Banglish Text"
                placeholder="Enter Banglish Text"
                minRows={10}
                maxRows={15}
              />
              <Textarea
                name="bangla"
                className=""
                label="Bangla Translation"
                placeholder="Enter Bangla Translation"
                minRows={10}
                maxRows={15}
              />
            </div>

            <div className="flex justify-end my-4">
              <Button isLoading={loading} color="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contribute;
