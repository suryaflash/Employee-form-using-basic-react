import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Alert, Toolbar, AppBar, Col, Button, Form, FormGroup, Table, Label, Input, FormText } from 'reactstrap';
import Example from './navbar';

export default class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        employees: [],
        employee:
        {
          firstname: "",
          email: "",
          phone: "",
          address: "",
          salary: "",
          experience: "",
          qualifications: [],
        },
        qualification:
        {
          degree: '',
          marks: ''
        },
        edit: false,
        editId: "",
        nameError: '',
        emailError: '',
        emailFormatError: '',
        phoneError: '',
        phoneFormatError: '',
        addressError: '',
        salaryError: '',
        salaryFormatError: '',
        experienceError: '',
        experienceFormatError: '',
        degreeError:'',
        marksError:'',
        marksFormatError:'',
        isDisabled: true
      };
  }
  componentWillMount = () => {
    if (this.props.match.params.id) {
      this.state.isDisabled = false;
      let employees = JSON.parse(localStorage.getItem("employees"))
      let employee = { ...employees[this.props.match.params.id] };
      this.setState({ employees, employee, edit: true, editId: this.props.match.params.id })
    }
  }
  handleChange = (e) => {
    let { employee } = this.state;
    employee[e.target.name] = e.target.value;
    this.setState({ employee })

    if (e.target.name === 'firstname') {
      if (e.target.value === '' || e.target.value === null)
        this.setState({ nameError: true })
      else
        this.setState({ nameError: false, name: e.target.value })
    }
    if (e.target.name === 'email') {
      if (e.target.value === '' || e.target.value === null)
        this.setState({ emailError: true, emailFormatError: false })
      else {
        const pattern = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[a-zA-Z]/
        const ptest = pattern.test(e.target.value)
        if (ptest === true)
          this.setState({ emailFormatError: false, emailError: false, email: e.target.value })
        else
          this.setState({ emailFormatError: true, emailError: false })
      }
    }
    if (e.target.name === 'phone') {
      if (e.target.value === '' || e.target.value === null)
        this.setState({ phoneError: true, phoneFormatError: false })
      else {
        const pattern = /^[0-9]*$/
        const ptest = pattern.test(e.target.value)
        if (ptest === true)
          this.setState({ phoneFormatError: false, phoneError: false, phone: e.target.value })
        else
          this.setState({ phoneFormatError: true, phoneError: false })
      }
    }
    if (e.target.name === 'address') {
      if (e.target.value === '' || e.target.value === null)
        this.setState({ addressError: true })
      else
        this.setState({ addressError: false, address: e.target.value })
    }
    if (e.target.name === 'salary') {
      if (e.target.value === '' || e.target.value === null)
        this.setState({ salaryError: true })
      else {
        const pattern = /^[0-9]*$/
        const ptest = pattern.test(e.target.value)
        if (ptest === true)
          this.setState({ salaryFormatError: false, salaryError: false, salary: e.target.value })
        else
          this.setState({ salaryFormatError: true, salaryError: false })
      }
    }
    if (e.target.name === 'experience') {
      if (e.target.value === '' || e.target.value === null)
        this.setState({ experienceError: true })
      else {
        const pattern = /^[0-9]*$/
        const ptest = pattern.test(e.target.value)
        if (ptest === true)
          this.setState({ experienceFormatError: false, experienceError: false, experience: e.target.value })
        else
          this.setState({ experienceFormatError: true, experienceError: false })
      }
    }
      // if (e.target.name === 'degree') {
      //   if (e.target.value === '' || e.target.value === null)
      //     this.setState({ degreeError: true })
      // }
      // if (e.target.name === 'marks') {
      //   if (e.target.value === '' || e.target.value === null)
      //     this.setState({ marksError: true })
      //   else {
      //     const pattern = /^[0-9]*$/
      //     const ptest = pattern.test(e.target.value)
      //     if (ptest === true)
      //       this.setState({ marksFormatError: false, marksError: false, marks: e.target.value })
      //     else
      //       this.setState({ marksFormatError: true, marksError: false })
      //   }
      //}
    if (this.state.nameError === false &&
      this.state.emailError === false &&
      this.state.emailFormatError === false &&
      this.state.phoneError === false &&
      this.state.phoneFormatError === false &&
      this.state.addressError === false &&
      this.state.salaryError === false &&
      this.state.salaryFormatError === false &&
      this.state.experienceError === false &&
      this.state.experienceFormatError === false ){
      // this.state.degreeError === false &&
      // this.state.marksError === false &&
      // this.state.marksFormatError === false) {
      this.setState({ isDisabled: false })
    }
  }

  handleQualificationsChange = (idx) => (evt) => {
    let { qualification } = this.state;
    qualification[evt.target.name] = evt.target.value;
    this.setState({ qualification })
  }

  addEmployee = () => {
    let { employees } = this.state;
    if (this.state.edit) {
      employees[this.state.editId] = this.state.employee;

      this.state.edit = false;
    }
    else {
      employees.push(this.state.employee);
      debugger;
    }
    let employee1 =
    {
      firstname: "",
      email: "",
      phone: "",
      address: "",
      salary: "",
      experience: "",
      qualifications: [],

    }
    this.setState({ employees, employee: employee1 })
    localStorage.setItem('employees', JSON.stringify(this.state.employees));
  }
  handleAddQualification = () => {
    let { qualification } = this.state;
    let { employee } = this.state;
    employee.qualifications.push(qualification);
    this.setState({ employee })
  }
  addQualify = () => {
    let qualification =
    {
      degree: "",
      marks: ""
    }
    this.setState({ qualification })
  }

  render() {
    return (
      <div>
        <div class="container">
          <Example />
          <div>
            <Alert color="info" align="center" >
              ADD EMPLOYEE DETAILS
    </Alert>
            <Form>
              <FormGroup>
                <Label for="exampleName">Name*</Label>
                <Input type="text" name="firstname" id="exampleName"  placeholder="Enter Employee Name" value={this.state.employee.firstname} onChange={this.handleChange} />
                {this.state.nameError ? <span style={{ color: "red" }}> *Enter Name </span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email*</Label>
                <Input type="text" name="email" id="exampleEmail" placeholder="Enter Email Address" value={this.state.employee.email} onChange={this.handleChange} />
                {this.state.emailError ? <span style={{ color: "red" }}> *Enter Email Address </span> :
                  this.state.emailFormatError ? <span style={{ color: "red" }}> *Enter a valid EmailID </span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="examplePhone">Phone*</Label>
                <Input type="text" name="phone" id="examplePhone" placeholder="Enter Phone Number" value={this.state.employee.phone} onChange={this.handleChange} />
                {this.state.phoneError ? <span style={{ color: "red" }}> *Enter Phone Number </span> :
                  this.state.phoneFormatError ? <span style={{ color: "red" }}> *Enter a valid Phone Number </span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="exampleAddress">Address*</Label>
                <Input type="textarea" name="address" id="exampleAddress" placeholder="Enter Address" value={this.state.employee.address} onChange={this.handleChange} />
                {this.state.addressError ? <span style={{ color: "red" }}> *Enter your Address </span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="exampleSalary">Salary*</Label>
                <Input type="text" name="salary" id="examplesalary" placeholder="Enter Employee Salary" value={this.state.employee.salary} onChange={this.handleChange} />
                {this.state.salaryError ? <span style={{ color: "red" }}> *Enter your Salary </span> :
                  this.state.salaryFormatError ? <span style={{ color: "red" }}> *Use Numeric Values </span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="exampleExperience">Experience*</Label>
                <Input type="text" name="experience" id="exampleExperience" placeholder="Enter Years of Experience" value={this.state.employee.experience} onChange={this.handleChange} />
                {this.state.experienceError ? <span style={{ color: "red" }}> *Enter Experience </span> :
                  this.state.experienceFormatError ? <span style={{ color: "red" }}> *Use Numeric Values </span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="exampleQualification"> Qualifications </Label>
                <Button outline color="info" align="center" onClick={this.handleAddQualification} > ADD QUALIFICATION </Button>
              </FormGroup>
              {this.state.employee.qualifications.map((qualification, idx) => (
                <div key={idx}>
                  <Label>  Name of the Degree </Label>
                  <input
                    type="text"
                    name="degree"
                    placeholder={`Enter Degree Name`}
                    value={qualification.degree}
                    onChange={this.handleQualificationsChange(idx)}
                  />
                  {/* {this.state.degreeError ? <span style={{ color: "red" }}> *Enter your Salary </span> :''} */}
                  <Label > Marks </Label>
                  <input
                    type="text"
                    name="marks"
                    placeholder={`Enter marks`}
                    value={qualification.marks}
                    onChange={this.handleQualificationsChange(idx)}
                  />
                  {/* {this.state.marksError ? <span style={{ color: "red" }}> *Enter your Marks </span> :
                  this.state.marksFormatError ? <span style={{ color: "red" }}> *Use Numeric Values </span> : ''} */}
                  <Button outline color="primary" align="center" onClick={this.addQualify}> ADD </Button>
                </div>
              ))}
            </Form>
            <div style={{ textAlign: 'center' }}>
              <Button outline color="success" align="center" disabled={this.state.isDisabled} onClick={this.addEmployee}>SAVE</Button>
            </div>
            <Label> *Mandatory Fields </Label>
          </div>
        </div>
      </div>
    );
  }
}

