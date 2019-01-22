import React from "react"
import Example from "./navbar"
import { Alert, Toolbar, AppBar, Col, Button, Form, FormGroup, Table, Label, Input, FormText } from 'reactstrap';
import { NavLink } from 'react-router-dom';  
export default class all extends React.Component
{
   constructor(props)
   {
       super(props)
       this.state = {
           employees : [],
            qualifications:[]
       }
   }

  deleteHandler = (index) => 
  {
    let  array =JSON.parse(localStorage.getItem("employees"))
    array.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(array));
    this.setState({ employees: array });
  }
  componentWillMount = ()=>
  {
     let {employees} =this.state;
     employees= JSON.parse(localStorage.getItem('employees')); 
      this.setState({ employees});
  }
  render()
  {
        console.log(this.state.employees);
        return(
            <div class="container">
            <Example />
            <Alert color="info" align="center" >
            DETAILS OF ALL EMPLOYEES
          </Alert>
          {this.state.employees.length !== 0 ? (
          <div>
    <Table bordered>
      <tr>
        <th><b>NAME</b></th>
        <th><b>EMAIL</b></th>
        <th><b>PHONE</b></th>
        <th><b>ADDRESS</b></th>
        <th><b>SALARY</b></th>
        <th><b>EXPERIENCE</b></th>
        <th><b>DEGREE</b></th>
        <th><b>MARKS</b></th>
      </tr>
      
      {this.state.employees.map((employee, index) => (
        <tr key={index}>
          <td>{employee.firstname}</td>
          <td>{employee.email}</td>
          <td>{employee.phone}</td>
          <td>{employee.address}</td>
          <td>{employee.salary}</td>
          <td>{employee.experience}</td>
          {employee.qualifications.map((qualification, sindex) => (
            <tr key={sindex}>
          <td>{qualification.degree}</td>
          <td>{qualification.marks}</td>
          </tr>))}
          <td><NavLink to={"/add/"+index} outline color="primary">Edit</NavLink></td>
          <td><Button outline color="primary" onClick={() => this.deleteHandler(index)}>Delete</Button></td>
        </tr>
      ))}
      
    </Table>
      </div>
      ) : null}
        
    </div>
   )
  }
}