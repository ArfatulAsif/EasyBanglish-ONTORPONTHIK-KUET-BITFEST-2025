import { MdOutlineManageSearch } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegFilePdf, FaWpexplorer } from "react-icons/fa6";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { FaRegUser } from "react-icons/fa";

import {
  Button,
  Card,
  CardBody,
  Input,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import axiosInstance, { serverUrl } from "../../utils/axiosInstance";
import PageLoadingSpinner from "../../components/shared/PageLoadingSpinner/PageLoadingSpinner";

const Explore = () => {
  const breadcrumbLinks = [
    { text: "Explore", to: "/dashboard/explore", icon: FaWpexplorer },
  ];

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const handleUserSearch = (event) => {
    event.preventDefault();
    const searchString = event.target?.userSearchString?.value;

    setLoading(true);
    axiosInstance
      .post(`/auth/search`, {
        text: searchString,
      })
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setUsers([]);
      });
  };

  const handlePdfSearch = (event) => {
    event.preventDefault();
    const searchString = event.target?.pdfSearchString?.value;

    setLoading(true);
    axiosInstance
      .post(`/pdf/search`, {
        text: searchString,
      })
      .then((res) => {
        setPdfs(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setPdfs([]);
      });
  };

  const handleGeneratePdf = async (
    id,
    titleBangla,
    banglaText,
    captionBangla
  ) => {
    setLoading(true);

    const finalPdf =
      `<div>
            <h1>${titleBangla}</h1>
            <h2>${captionBangla}</h2>
          </div>` + banglaText;

    axiosInstance
      .post(`/pdf/create`, {
        pdf_id: id,
        fileName: titleBangla,
        htmlContent: JSON.stringify(finalPdf),
      })
      .then((res) => {
        console.log(res.data);
        window.open(serverUrl + res.data.url, "_blank");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
          <FaWpexplorer className="text-3xl text-primary" />
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Explore Other Users And Their Contents
          </span>
        </h1>

        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" color="primary">
            <Tab
              key="Users"
              title={
                <div className="flex items-center space-x-2">
                  <FaRegUser />
                  <span>Users</span>
                </div>
              }
            >
              <Card>
                <CardBody className="min-h-[60vh] ">
                  <form
                    onSubmit={handleUserSearch}
                    className="flex  gap-4 items-center"
                  >
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          name="userSearchString"
                          label="Search User"
                          type="input"
                          variant="underlined"
                        />
                      </div>
                    </div>
                    <Button
                      isLoading={loading}
                      type="submit"
                      color="primary"
                      endContent={<IoSearchOutline className="text-3xl" />}
                    >
                      Search
                    </Button>
                  </form>
                  {users && users.length === 0 ? (
                    <div className="mt-12">
                      <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
                        <MdErrorOutline className="text-3xl text-warning" />
                        <span className="font-bold bg-gradient-to-r from-amber-500 to-red-500  bg-clip-text text-transparent">
                          No Users Found
                        </span>
                      </h1>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
                        <MdOutlineManageSearch className="text-3xl text-warning" />
                        <span className="font-bold bg-gradient-to-r from-secondary-500 to-secondary-300  bg-clip-text text-transparent">
                          Search Results
                        </span>
                      </h1>
                      <div className="flex flex-col gap-3">
                        {loading && <PageLoadingSpinner />}
                        {!loading &&
                          users.map((user) => {
                            return (
                              <div
                                key={user.id}
                                className="border-1 border-default rounded-lg p-4 grid grid-cols-4"
                              >
                                <User
                                  avatarProps={{
                                    src: "https://i.ibb.co.com/5KFrXxd/user.png",
                                  }}
                                  description={
                                    <div
                                      // isExternal
                                      href="https://x.com/jrgarciadev"
                                      size="sm"
                                    >
                                      {user?.email}
                                    </div>
                                  }
                                  name={user?.name}
                                />
                                <div className=""></div>
                                <div className="col-span-2">
                                  <h1 className="font-semibold text-primary tracking-wide">
                                    Created PDFs
                                  </h1>

                                  {user?.pdfs && user?.pdfs.length > 0 ? (
                                    <ul className="list-disc list-inside mt-2">
                                      {user?.pdfs.map((pdf) => (
                                        <li
                                          key={pdf.id}
                                          onClick={() =>
                                            handleGeneratePdf(
                                              pdf.id,
                                              pdf.titleBangla,
                                              pdf.banglaText,
                                              pdf.captionBangla
                                            )
                                          }
                                        >
                                          <span className="hover:text-primary hover:underline cursor-pointer">
                                            {pdf.titleBangla}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <h1 className="mt-2 italic opacity-50">
                                      No pdf found
                                    </h1>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="PDFs"
              title={
                <div className="flex items-center space-x-2">
                  <FaRegFilePdf />
                  <span>PDFs</span>
                </div>
              }
            >
              <Card>
                <CardBody className="min-h-[60vh]">
                  <form
                    onSubmit={handlePdfSearch}
                    className="flex  gap-4 items-center"
                  >
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          name="pdfSearchString"
                          label="Search PDF"
                          type="input"
                          variant="underlined"
                        />
                      </div>
                    </div>
                    <Button
                      isLoading={loading}
                      type="submit"
                      color="primary"
                      endContent={<IoSearchOutline className="text-3xl" />}
                    >
                      Search
                    </Button>
                  </form>

                  {pdfs && pdfs.length === 0 ? (
                    <div className="mt-12">
                      <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
                        <MdErrorOutline className="text-3xl text-warning" />
                        <span className="font-bold bg-gradient-to-r from-amber-500 to-red-500  bg-clip-text text-transparent">
                          No PDF Found
                        </span>
                      </h1>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
                        <MdOutlineManageSearch className="text-3xl text-warning" />
                        <span className="font-bold bg-gradient-to-r from-secondary-500 to-secondary-300  bg-clip-text text-transparent">
                          Search Results
                        </span>
                      </h1>
                      <div className="flex flex-col gap-3">
                        {loading && <PageLoadingSpinner />}
                        <ul>
                          {!loading &&
                            pdfs.map((pdf) => (
                              <li key={pdf.id} className="mb-4">
                                <Card>
                                  <CardBody>
                                    <h1 className="font-semibold text-primary tracking-wide">
                                      {pdf.titleBangla}
                                    </h1>
                                    <p className="text-sm mt-2">
                                      {pdf.captionBangla}
                                    </p>
                                    <Button
                                      onPress={() =>
                                        handleGeneratePdf(
                                          pdf.id,
                                          pdf.titleBangla,
                                          pdf.banglaText,
                                          pdf.captionBangla
                                        )
                                      }
                                      color="primary"
                                      className="mt-4"
                                    >
                                      Download PDF
                                    </Button>
                                  </CardBody>
                                </Card>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Explore;
