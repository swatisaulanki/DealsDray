import React, { useContext, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Contextsfetch } from '../context/Context';

const Navbar = () => {
  const navigate = useNavigate();
  const {logout} = useContext(Contextsfetch);
  const [authUser, setAuthuser] = useState(localStorage.getItem("authUser"))

  const location = useLocation();
  
  const findCurrentLocation = () => {
    if(location.pathname === '/employeelist') {
      return 'EmployeeList'
    }
    else if(location.pathname === '/employeeEdit') {
      return 'EmployeeEdit'
    }
    else if(location.pathname === '/createEmployee') {
      return 'Create Employee'
    }
    else {
      return 'Dashboard';
    }
  }

   useState(() => {
    setAuthuser(localStorage.getItem("authUser"))
  },[location.pathname])

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      <nav className="flex justify-between items-center bg-custom-color2 text-white text-lg font-bold p-4">
        {location.pathname !== '/signin' ? <div className="flex gap-16">
          <a  className="hover:text-gray-300">Home</a>
          <a className="hover:text-gray-300 cursor-pointer" href='/employeelist'>Employee List</a>
        </div>  :null}
        {location.pathname !== '/signin' ? <div className="flex  gap-16">
          <span>{authUser}</span>
          <button className="hover:text-gray-300" onClick={handleLogout}>Logout</button>
        </div>  :null}
      </nav>
      {location.pathname !== '/signin' ? <div className="bg-gray-200 p-4  rounded-md shadow-md">
        <p className="text-2xl font-bold text-purple-900">{findCurrentLocation()}</p>
      </div> :null}
    </div> 
  );
};

export default Navbar;
