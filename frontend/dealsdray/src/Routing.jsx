import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from './Pages/Home';
import EmployeeList from './Pages/EmployeeList';
import EmployeeEdit from './Pages/EmployeeEdit';
import CreateEmployee from './Pages/CreateEmployee';
import Login from './Login/Login';
import RequiredAuth from './context/RequiredAuth';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<RequiredAuth><Home/></RequiredAuth>}/>
        <Route path={'/signin'} element={<Login/>}/>
        <Route path={'/employeelist'} element={<RequiredAuth><EmployeeList/></RequiredAuth>}/>
        <Route path={'/employeeEdit/:f_Id'} element={<RequiredAuth><EmployeeEdit/></RequiredAuth>}/>
        <Route path={'/createEmployee'} element={<RequiredAuth><CreateEmployee/></RequiredAuth>}/>
      </Routes>
    </>
  )
}

export default Routing
