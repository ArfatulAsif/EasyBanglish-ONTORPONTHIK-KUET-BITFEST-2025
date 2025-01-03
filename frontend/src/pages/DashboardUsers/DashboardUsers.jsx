import { LuLayoutDashboard } from "react-icons/lu";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { FaRegUserCircle } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";
import ErrorBox from "../../components/shared/ErrorBox/ErrorBox";
import PageLoadingSpinner from "../../components/shared/PageLoadingSpinner/PageLoadingSpinner";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const DashboardUsers = () => {
  // Breadcrumb links
  const breadcrumbLinks = [
    { text: "Dashboard", to: "/dashboard", icon: LuLayoutDashboard },
    { text: "Users", to: "/dashboard/users", icon: FaRegUserCircle },
  ];

  // Load users
  const { users, error, loading } = useUsers();

  console.log(users);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        {loading && <PageLoadingSpinner />}
        {error && <ErrorBox text={error} />}

        {!loading && !error && (
          <Table
            aria-label="Example static collection table"
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>ID</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Role</TableColumn>
            </TableHeader>
            <TableBody>
              {users &&
                users.length > 0 &&
                users.map((user, idx) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === "admin" ? (
                          <Chip color="secondary">
                            {capitalizeFirstLetter(user.role)}
                          </Chip>
                        ) : (
                          <Chip color="warning">
                            {capitalizeFirstLetter(user.role)}
                          </Chip>
                        )}
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

export default DashboardUsers;
