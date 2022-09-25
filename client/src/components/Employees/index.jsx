import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../shared/Layout'
import * as EmployeeService from '../../shared/EmployeeService'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class Employees extends Component {
  state = {
    employees: [],
    openModal : false,
    employee: {
      selectedId: '',
      firstName: '',
      lastName: '',
      age:''
    }
  }

  onClickButton = e =>{
      e.preventDefault()
      this.setState({openModal : true})
  }

  onCloseModal = ()=>{
    this.setState({openModal : false})
    this.setState({employee: {...this.state.employee, firstName:'', lastName:'', age:''}})
  }
  
  handleSubmit = (event) => {
    if(this.state.employee.selectedId) {
      EmployeeService.editEmployee(this.state.employee)
        .then(response => {
          alert('employee has been updated')
          window.location.reload();
        })
    } else {
      EmployeeService.createEmployee(this.state.employee)
        .then(response => {
          //alert('New employee has been added')
          window.location.reload();
        })
    }
    event.preventDefault()
  }

  handleFirst = (event) => {
    this.setState({employee: {...this.state.employee, firstName: event.target.value}})
  }
  
  handleLast = (event) => {
    this.setState({employee: {...this.state.employee, lastName: event.target.value}})

  }

  handleAge = (event) => {
    this.setState({employee: {...this.state.employee, age: event.target.value}})
  }
  
  handleDelete = (id) => {
    EmployeeService.deleteEmployee(id)
    .then(response => {
      alert('The employee has been deleted')
        window.location.href='../employees';
      })
    }
    
    handleModal = (id) => {
      EmployeeService.getEmployee(id)
      .then(response => {
        console.log(response);
        if(response.status == '200' ) {
          this.setState({employee: {...this.state.employee, firstName : response.data[0].first}})
          this.setState({employee: {...this.state.employee, lastName : response.data[0].last}})
          this.setState({employee: {...this.state.employee, age : response.data[0].age}})
          this.setState({employee: {...this.state.employee, selectedId : response.data[0].id}})
          this.setState({openModal : true})
        }
      })
    }
    
    componentDidMount () {
      EmployeeService.getEmployees()
      .then(({data}) => this.setState({employees: data}))
    }
    
    render () {
      return (
      <Layout>
        <div className="page-data">
        
          <h1>List of employees</h1>
          <button className="btn" onClick={this.onClickButton}>Add Employee</button>
          <br />
          <div className="data-table">
              <table border="1" cellpadding="7" cellspacing="7">
                  <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Age</th>
                      <th>Edit Action</th>
                      <th>Delete Action</th>
                  </tr>
                {this.state.employees.map(e => {
                  return (
                    <tr>
                        <td>{e.id}</td>
                        <td>{e.first}</td>
                        <td>{e.last}</td>
                        <td>{e.age}</td>
                        <td><a onClick={()=>this.handleModal(e.id)}>Edit</a></td>
                        <td><a onClick={()=>this.handleDelete(e.id)}> X </a></td>
                    </tr>
                  )
                })}
              </table>
            </div>
          
          <br />
          <Modal open={this.state.openModal} onClose={this.onCloseModal}>
            {/* <h1>Add employee</h1> */}
            <form onSubmit={this.handleSubmit}>
              <br />
              <input type="text" onChange={this.handleFirst} placeholder='First Name' value={this.state.employee.firstName}/>
              <br />
              <input type="text" onChange={this.handleLast} placeholder='Last Name'  value={this.state.employee.lastName}/>      
              <br />
              <input type="text" onChange={this.handleAge} placeholder='Age' value={this.state.employee.age} />      
              <div className="data-btn">
                <button>Save Employee</button>
              </div>
            </form>
          </Modal>

        </div>
      </Layout>
    )
  }
}

export default Employees
