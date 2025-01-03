import { LuLayoutDashboard } from "react-icons/lu";
import { Pagination } from "@nextui-org/react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineManageHistory } from "react-icons/md";
import useLogs from "../../hooks/useLogs";
import PageLoadingSpinner from "../../components/shared/PageLoadingSpinner/PageLoadingSpinner";
import ErrorBox from "../../components/shared/ErrorBox/ErrorBox";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { formatDate } from "../../utils/formatDate";
import LogTypeSelector from "./LogTypeSelector";

const DashboardLogs = () => {
  // Breadcrumb links
  const breadcrumbLinks = [
    { text: "Dashboard", to: "/dashboard", icon: LuLayoutDashboard },
    { text: "History", to: "/dashboard/history", icon: MdOutlineManageHistory },
  ];

  // Load history
  const {
    logs,
    error,
    loading,
    values,
    setValues,
    operationTypes,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useLogs();

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        {loading && <PageLoadingSpinner />}
        {error && <ErrorBox text={error} />}

        {!loading && !error && (
          <>
            <div className="mb-4">
              <LogTypeSelector
                operationTypes={operationTypes}
                values={values}
                setValues={setValues}
              />
            </div>
            <Table
              aria-label="Example static collection table"
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn>Table Name</TableColumn>
                <TableColumn>Operation</TableColumn>
                <TableColumn>Details</TableColumn>
                <TableColumn>Timestamp</TableColumn>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.tableName}</TableCell>
                    <TableCell>{log.operation}</TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>{formatDate(log.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="m-4 mx-auto flex justify-center items-center">
              <Pagination
                loop
                showControls
                color="primary"
                initialPage={currentPage}
                total={totalPages}
                onChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardLogs;
