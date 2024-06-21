import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      let response = await axios.get("http://localhost:8088/api/get/employees");
      let result = response.data;
      setEmployees(result);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleNavigate = () => {
    navigate("/createEmployee");
  };
  const Count = 0;

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    const lowerKeyword = keyword.toLowerCase();
    const sortedEmployees = [...employees].sort((a, b) => {
      const nameA = a.name ? a.name.toLowerCase() : "";
      const nameB = b.name ? b.name.toLowerCase() : "";
      if (nameA.includes(lowerKeyword) && !nameB.includes(lowerKeyword)) {
        return -1;
      } else if (
        !nameA.includes(lowerKeyword) &&
        nameB.includes(lowerKeyword)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    setEmployees(sortedEmployees);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <div className="w-[100%] p-[0.5rem] flex justify-end">
        <div className="w-[30%] h-[100%] flex justify-between items-center">
          <p className="text-xl font-medium">{`Count : ${employees.length}`}</p>
          <button
            className="border-2 p-[0.5rem] bg-richblue-50 rounded-md"
            onClick={handleNavigate}
          >
            Create Employee
          </button>
        </div>
      </div>
      <div className="w-[100%] p-[0.5rem] flex justify-end bg-blue-5 ">
        <div className="w-[30%] h-[100%] flex gap-[15px] justify-start items-center">
          <p className="text-xl">Search</p>
          <input
            type="text"
            placeholder="Enter Search Keyword"
            className="p-[0.5rem] rounded-md w-[70%]"
          />
        </div>
      </div>

      <EmployeeTable data={employees} fetchEmployees={fetchEmployees} />
    </div>
  );
};

export default EmployeeList;
