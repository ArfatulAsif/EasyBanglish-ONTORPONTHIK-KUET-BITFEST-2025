import { useState, useEffect } from "react";
import { getAllUsers } from "../services/userServices";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const users = await getAllUsers();

      setUsers(users);
    } catch (err) {
      const errorMessage = err?.response?.data?.message;
      setError(errorMessage || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: () => fetchUsers(),
  };
};

export default useUsers;
