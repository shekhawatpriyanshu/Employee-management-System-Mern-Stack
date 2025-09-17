import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const[filteredLeaves,setFilteredLeaves]=useState()

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://employee-management-system-mern-sta-ten.vercel.app/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?._id || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name || "N/A",
          days:
            leave.startDate && leave.endDate
              ? Math.ceil(
                  (new Date(leave.endDate) - new Date(leave.startDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1
              : "N/A",
          status: leave.status,
        }));
        setLeaves(data);
        setFilteredLeaves(data)
      }
    } catch (error) {
      console.error("Fetch leaves error:", error);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  const filterByInput=(e)=>{
const data=leaves.filter(leave=>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
setFilteredLeaves(data)
  }
  const filterByButton=(status)=>{
const data=leaves.filter(leave=>leave.status.toLowerCase().includes(status.toLowerCase()))
setFilteredLeaves(data)
  }

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <>
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search by Emp Id"
                className="px-4 py-0.5 border"
                onChange={filterByInput}
              />
              <div className="space-x-3">
                <button
                  className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                  onClick={() => filterByButton("Pending")}
                >
                  Pending
                </button>
                <button
                  className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                  onClick={() => filterByButton("Approved")}
                >
                  Approved
                </button>
                <button
                  className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                  onClick={() => filterByButton("Rejected")}
                >
                  Rejected
                </button>
              </div>
            </div>
            <div className="mt-3">
              <DataTable columns={columns} data={filteredLeaves} pagination />
            </div>
          </>
        </div>
      ) : (
        <div>loading....</div>
      )}
    </>
  );
};

export default Table;
