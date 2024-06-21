const express = require('express');
const EmployeeModel = require('../models/Employee');

const employeeRoute = express();
employeeRoute.use(express.json());

// CREATE a new employee with email check
employeeRoute.post('/create/employee', async (req, res) => {
    try {
      const { f_Email } = req.body;
      
      // Check if email already exists
      const existingEmployee = await EmployeeModel.findOne({ f_Email });
      if (existingEmployee) {
        return res.status(400).send({ error: 'Email already exists' });
      }
      
      // Create and save the new employee
      const newEmployee = new EmployeeModel(req.body);
      await newEmployee.save();
      res.status(201).send(newEmployee);
    } catch (error) {
      res.status(400).send(error);
    }
});

// READ all employees
employeeRoute.get('/get/employees', async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ a single employee by ID
employeeRoute.get('/get/employee/:f_Id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findOne({f_Id:req.params.f_Id});
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE an employee by ID
employeeRoute.put('/update/employee/:f_Id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate({f_Id:req.params.f_Id}, req.body );
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE an employee by ID
employeeRoute.delete('/delete/employee/:f_Id', async (req, res) => {
  try {
  const employee = await EmployeeModel.deleteOne({f_Id:req.params.f_Id});
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = employeeRoute;