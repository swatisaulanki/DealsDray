// Install dependencies before using this component
// npm install react react-dom

import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({data,fetchEmployees}) => {
    const navigate = useNavigate();

    const dateFormat = (date) => {

        const formattedDate  = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return formattedDate;
    }

    const HandleEdit = (id) => {
        navigate(`/employeeEdit/${id}`)
    }

    const deleteEmployee = async(f_Id) => {
        try {
            const res = await axios.delete(`http://localhost:8088/api/delete/employee/${f_Id}`);
            const result = res.data;
            if(result){
                alert("deleted!");
                fetchEmployees();
                navigate("/employeelist")
            }else{
                alert("Invalid Reuqest")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (id) => {
        deleteEmployee(id);
    }
    

    return (
        <div className="container mx-auto">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <th className="px-6 py-3 border-b">Unique ID</th>
                            <th className="px-6 py-3 border-b">Image</th>
                            <th className="px-6 py-3 border-b">Name</th>
                            <th className="px-6 py-3 border-b">Email</th>
                            <th className="px-6 py-3 border-b">Mobile No</th>
                            <th className="px-6 py-3 border-b">Designation</th>
                            <th className="px-6 py-3 border-b">Gender</th>
                            <th className="px-6 py-3 border-b">Course</th>
                            <th className="px-6 py-3 border-b">Create Date</th>
                            <th className="px-6 py-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data.map((row) => (
                            <tr key={row.id} className="border-t">
                                <td className="px-4 py-4 border-b">{row.f_Id}</td>
                                <td className="px-4 py-4 border-b">
                                    <img src={row.f_Image} alt="profile" className="w-12 h-12 rounded-full" />
                                </td>
                                <td className="px-4 py-4 border-b">{row.f_Name}</td>
                                <td className="px-4 py-4 border-b">{row.f_Email}</td>
                                <td className="px-4 py-4 border-b">{row.f_Mobile}</td>
                                <td className="px-4 py-4 border-b">{row.f_Designation}</td>
                                <td className="px-4 py-4 border-b">{row.f_Gender}</td>
                                <td className="px-4 py-4 border-b">{row.f_Course}</td>
                                <td className="px-4 py-4 border-b">{dateFormat(row.f_Createdate)}</td>
                                <td className="px-4 py-4 border-b">
                                    <button onClick={() => HandleEdit(row.f_Id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(row.f_Id)} className="ml-2 px-4 py-2 bg-[#FF0000] text-white rounded-md hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
