import { RxCross2 } from "react-icons/rx";
import { TiTickOutline } from "react-icons/ti";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useEffect, useState } from "react";
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
import { CiEdit } from "react-icons/ci";
import { FaRegFilePdf } from "react-icons/fa";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import toast from "react-hot-toast";
import PageLoadingSpinner from "../../components/shared/PageLoadingSpinner/PageLoadingSpinner";

const VerifyContributions = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const breadcrumbLinks = [
    {
      text: "Verify Contributions",
      to: "/verify-contributions",
      icon: TiTickOutline,
    },
  ];

  const handleReject = (id) => {
    setLoading(true);

    axiosInstance
      .post(`/translate/delete?token=${localStorage.getItem("token")}`, {
        translationId: id,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Translation deleted successfully");
        setRefetch(!refetch);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleAccept = (id) => {
    setLoading(true);

    axiosInstance
      .post(`/translate/verify?token=${localStorage.getItem("token")}`, {
        translationId: id,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Translation verified successfully");
        setRefetch(!refetch);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/translate/verified?token=${localStorage.getItem("token")}`)
      .then((res) => {
        console.log(res.data.data);
        setLoading(false);
        setRequests(res.data?.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [refetch]);

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          <TiTickOutline className="text-3xl text-primary" />
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Verify Other User's Contribution
          </span>
        </h1>

        {loading && <PageLoadingSpinner />}

        {!loading && (
          <Table
            aria-label="Example static collection table"
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>User ID</TableColumn>
              <TableColumn>Banglish</TableColumn>
              <TableColumn>Bangla</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {requests &&
                requests.length > 0 &&
                requests.map((r, idx) => {
                  return (
                    <TableRow key={r.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{r.user?.id}</TableCell>
                      <TableCell>{r.banglish}</TableCell>
                      <TableCell>{r.bangla}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <Tooltip
                            color="primary"
                            size="sm"
                            content="Verify"
                            closeDelay={100}
                            placement="left"
                            showArrow
                          >
                            <Button
                              onPress={() => handleAccept(r.id)}
                              isIconOnly
                              aria-label="Verify"
                              color="primary"
                            >
                              <TiTickOutline />
                            </Button>
                          </Tooltip>

                          <Tooltip
                            color="primary"
                            size="sm"
                            content="Reject"
                            closeDelay={100}
                            placement="left"
                            showArrow
                          >
                            <Button
                              onPress={() => handleReject(r.id)}
                              isIconOnly
                              aria-label="Reject"
                              color="warning"
                            >
                              <RxCross2 />
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
    </>
  );
};

export default VerifyContributions;
