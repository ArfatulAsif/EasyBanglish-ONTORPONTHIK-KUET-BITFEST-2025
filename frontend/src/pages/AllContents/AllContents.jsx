import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const AllContents = () => {
  const [contents, setContents] = useState([]);

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

  const generatePdf = async () => {
    const content = `<p><strong style="font-size: 32px;">amar bajarer list</strong></p><p><strong style="font-size: 32px;"><br></strong></p><ol><li><strong style="font-size: 16px;">alu</strong></li><li><strong style="font-size: 16px;">peyaj</strong></li><li><strong style="font-size: 16px;">komola</strong></li></ol><p><br></p><p><br></p>`;

    // Use html2canvas to capture the HTML content
    const canvas = await html2canvas(content, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    console.log("ok");

    // Create a new PDF document
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // Open the PDF in a new tab
    const pdfBlob = pdf.output("blob");
    const pdfURL = URL.createObjectURL(pdfBlob);
    console.log(pdfURL);
    window.open(pdfURL, "_blank");
  };

  useEffect(() => {
    axiosInstance
      .get(`/pdf/user?token=${localStorage.getItem("token")}`)
      .then((res) => {
        console.log(res.data);
        setContents(res?.data?.userPDFs);
      });
  }, []);

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
          <Table
            aria-label="Example static collection table"
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Title</TableColumn>
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
                          {c?.captionBangla}
                        </span>
                      </TableCell>
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
                            content="View"
                            closeDelay={100}
                            placement="left"
                            showArrow
                          >
                            <Button
                              onPress={generatePdf}
                              isIconOnly
                              aria-label="View"
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
        </div>
      </div>
    </>
  );
};

export default AllContents;
