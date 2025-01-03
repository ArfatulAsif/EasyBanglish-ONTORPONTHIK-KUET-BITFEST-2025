import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import axiosInstance, { serverUrl } from "../../utils/axiosInstance";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { formatDate } from "../../utils/formatDate";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";
import PageLoadingSpinner from "../../components/shared/PageLoadingSpinner/PageLoadingSpinner";
import { useNavigate } from "react-router";

const AllContents = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const breadcrumbLinks = [
    {
      text: "Content Management",
      to: "/dashboard/content-management",
      icon: MdOutlineDocumentScanner,
    },
    {
      text: "All Content",
      to: "/dashboard/content-management/all-contents",
      icon: IoDocumentsOutline,
    },
  ];

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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

  useEffect(() => {
    axiosInstance
      .get(`/pdf/user?token=${localStorage.getItem("token")}`)
      .then((res) => {
        console.log(res.data);
        setContents(res?.data?.userPDFs);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/content-management/new-content?id=${id}`);
  };

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          <IoDocumentsOutline className="text-3xl text-primary" />
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            All Contents
          </span>
        </h1>

        <div>
          {loading && <PageLoadingSpinner />}
          {!loading && (
            <Table
              aria-label="Example static collection table"
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Caption</TableColumn>
                <TableColumn>Visibility</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {contents &&
                  contents.length > 0 &&
                  contents.map((c, idx) => {
                    return (
                      <TableRow key={c.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          <span className="hover:text-primary hover:underline cursor-pointer">
                            {c?.titleBangla}
                          </span>
                        </TableCell>
                        <TableCell>{c?.captionBangla}</TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(c?.visibility)}
                        </TableCell>
                        <TableCell>{formatDate(c.time)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 items-center">
                            <Tooltip
                              color="primary"
                              size="sm"
                              content="Change Visibility"
                              closeDelay={100}
                              placement="left"
                              showArrow
                            >
                              <Button
                                isIconOnly
                                aria-label="Change Visibility"
                                color="default"
                              >
                                <RiGitRepositoryPrivateLine />
                              </Button>
                            </Tooltip>

                            <Tooltip
                              color="primary"
                              size="sm"
                              content="Download"
                              closeDelay={100}
                              placement="left"
                              showArrow
                            >
                              <Button
                                onPress={() =>
                                  handleGeneratePdf(
                                    c.id,
                                    c.titleBangla,
                                    c.banglaText,
                                    c.captionBangla
                                  )
                                }
                                isIconOnly
                                aria-label="Download"
                                color="primary"
                              >
                                <FaRegFilePdf />
                              </Button>
                            </Tooltip>

                            <Tooltip
                              color="primary"
                              size="sm"
                              content="Edit"
                              closeDelay={100}
                              placement="left"
                              showArrow
                            >
                              <Button
                                onPress={() => handleEdit(c.id)}
                                isIconOnly
                                aria-label="Edit"
                                color="success"
                              >
                                <CiEdit />
                              </Button>
                            </Tooltip>

                            <Tooltip
                              color="danger"
                              size="sm"
                              content="Delete"
                              closeDelay={100}
                              placement="left"
                              showArrow
                            >
                              <Button
                                isIconOnly
                                aria-label="Delete"
                                color="warning"
                              >
                                <MdOutlineDeleteOutline />
                              </Button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default AllContents;
