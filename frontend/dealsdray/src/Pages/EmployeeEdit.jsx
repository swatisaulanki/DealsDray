import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EmployeeEdit = () => {
  const navigate = useNavigate();
  const { f_Id } = useParams();

  const [formValues, setFormValues] = useState({
    f_Id: "",
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: ""
  });

// Handle input change
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
    ...formValues,
    [name]: value
    });
};

  const updateEmployee = async() => {
    try {
      const response = await axios.put(`http://localhost:8088/api/update/employee/${f_Id}`,formValues);
      const result = response.data;
      if(result){
        alert("Updated!");
        navigate("/employeelist")
      }
      else{
        alert("Invalid Request!")
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleFormSubmission = (e) => {
      e.preventDefault();
      updateEmployee(formValues);
  }

  const fetchEmployeeData = async() => {
    try {
      const response = await axios.get(`http://localhost:8088/api/get/employee/${f_Id}`);
      const result = response.data;
      console.log(result)
      setFormValues(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEmployeeData();
  },[])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
    <form action="/your-server-side-script" method="post" encType="multipart/form-data" onSubmit={handleFormSubmission}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input type="text" id="name" onChange={handleInputChange} value={formValues.f_Name} name="f_Name" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>

        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input type="email" id="email" onChange={handleInputChange} value={formValues.f_Email} name="f_Email" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>

        <div className="mb-4">
            <label htmlFor="mobile" className="block text-gray-700">Mobile No:</label>
            <input type="tel" id="mobile" onChange={handleInputChange} value={formValues.f_Mobile} name="f_Mobile" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>

        <div className="mb-4">
            <label htmlFor="designation" className="block text-gray-700">Designation:</label>
            <select id="designation" onChange={handleInputChange}  value={formValues.f_Designation} name="f_Designation" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200">
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
        </div>

        <div className="mb-4">
            <span className="block text-gray-700">Gender:</span>
            <div className="flex items-center">
                <input type="radio" id="male" onChange={handleInputChange} checked={formValues.f_Gender === "Male"}  name="f_Gender" value="Male" required className="mr-2" />
                <label htmlFor="male" className="mr-4">Male</label>
                <input type="radio" id="female" onChange={handleInputChange} checked={formValues.f_Gender === "Female"} name="f_Gender" value="Female" required className="mr-2" />
                <label htmlFor="female">Female</label>
            </div>
        </div>

        <div className="mb-4">
            <span className="block text-gray-700">Course:</span>
            <div className="flex flex-row gap-[15px]">
                <label className="inline-flex items-center mt-2">
                    <input type="checkbox" onChange={handleInputChange} checked={formValues.f_Course === "MCA"} name="f_Course" value="MCA" className="mr-2" />
                    <span>MCA</span>
                </label>
                <label className="inline-flex items-center mt-2">
                    <input type="checkbox" onChange={handleInputChange} checked={formValues.f_Course === "BCA"} name="f_Course" value="BCA" className="mr-2" />
                    <span>BCA</span>
                </label>
                <label className="inline-flex items-center mt-2">
                    <input type="checkbox" onChange={handleInputChange} checked={formValues.f_Course === "BSC"} name="f_Course" value="BSC" className="mr-2" />
                    <span>BSC</span>
                </label>
            </div>
        </div>

        <div className="mb-4">
            <label htmlFor="imgUpload" className="block text-gray-700">Image Upload:</label>
            <input type="file" id="imgUpload" name="f_Image" accept="image/*" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>

        

        <div className="text-center bg-black rounded-md cursor-pointer">
            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">
                Submit
            </button>
        </div>
    </form>
</div>
  )
}

export default EmployeeEdit
