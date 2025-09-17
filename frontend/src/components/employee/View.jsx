import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://employee-management-system-mern-sta-ten.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Employee API response:", response.data);

        if (response.data.success && response.data.employee) {
          setEmployee(response.data.employee);
        } else {
          setError("Employee not found");
        }
      } catch (err) {
        console.error(
          "Error fetching employee:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.error || "Failed to fetch employee");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!employee) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={`http://localhost:5000/${employee.userId?.profileImage}`}
            alt="Profile"
            className="rounded-full border w-72"
          />
        </div>
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">{employee.userId?.name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee Id:</p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Date of Birth:</p>
            <p className="font-medium">
              {employee.dob
                ? new Date(employee.dob).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Gender:</p>
            <p className="font-medium">{employee.gender}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department:</p>
            <p className="font-medium">{employee.department?.dep_name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Maritial Status:</p>
            <p className="font-medium">{employee.maritialStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
