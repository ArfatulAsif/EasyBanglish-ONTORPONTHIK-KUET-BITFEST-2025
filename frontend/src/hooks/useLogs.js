import { useState, useEffect } from "react";
import { getAllLogs } from "../services/logsServices";

const useLogs = (initialPage = 1, pageSize = 20) => {
  const [values, setValues] = useState([]);
  const [operationTypes, setOperationTypes] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async (page = initialPage) => {
    setLoading(true);
    setError(null);

    try {
      const { history: logs, operationTypes: types } = await getAllLogs();

      setOperationTypes(Object.values(types));
      setValues(new Set(Object.values(types)));
      setCurrentPage(page);
      setTotalPages(Math.ceil(logs.length / pageSize));

      // Calculate the start and end indices for pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Slice logs for the current page
      const currentLogs = logs.slice(startIndex, endIndex);
      setLogs(currentLogs);
      setAllLogs(logs);
    } catch (err) {
      const errorMessage = err?.response?.data?.message;
      setError(errorMessage || "Error fetching history data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const selectedValues = [...values];
    const filteredLogs = allLogs.filter((log) =>
      selectedValues.includes(log.operation)
    );
    console.log(filteredLogs);
  }, [values]);

  return {
    logs,
    loading,
    currentPage,
    setCurrentPage,
    values,
    operationTypes,
    setValues,
    totalPages,
    error,
    refetch: () => fetchLogs(),
  };
};

export default useLogs;
