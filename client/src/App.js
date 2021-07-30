import './App.css';
import { useState } from 'react'
import Axios from 'axios'

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [newCountry, setNewCountry] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newWage, setNewWage] = useState(0);


  const addEmployee = () =>{
     Axios.post('http://localhost:3001/create',{
       name: name,
       age: age,
       country:country,
       position:position,
       wage:wage
     }).then(() => {
       setEmployeeList([
         ...employeeList,
         {
          name: name,
          age: age,
          country:country,
          position:position,
          wage:wage
         }
       ])
     } )
  }

  const deleteEmployee = (id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) =>{
      setEmployeeList(employeeList.filter((val) => {
        return val.id !== id
      }))
    })
  };

  const getEmployee = () =>{
    Axios.get('http://localhost:3001/selectemp').then((response) =>{
      setEmployeeList(response.data);
    })
  };

  // fonction de mise à jour des données d'un employé

  //updateName
  const updateEmployeeName = (id) =>{
    Axios.put('http://localhost:3001/updateName', {name: newName, id:id}).then((response) =>{
      setEmployeeList(employeeList.map((val) =>{
        return(val.id === id) ? {id: val.id, name: newName, country:val.country, age: val.age, position: val.position, wage: val.wage} : val
      }))
    })
  }
  //updateAge
  const updateEmployeeAge = (id) =>{
    Axios.put('http://localhost:3001/updateAge', {age: newAge, id:id}).then((response) =>{
      setEmployeeList(employeeList.map((val) =>{
        return(val.id === id) ? {id: val.id, name: newName, country:val.country, age: newAge, position: val.position, wage: val.wage} : val
      }))
    })
  }

  //updateCountry
  const updateEmployeeCountry = (id) =>{
    Axios.put('http://localhost:3001/updateCountry', {country: newCountry, id:id}).then((response) =>{
      setEmployeeList(employeeList.map((val) =>{
        return(val.id === id) ? {id: val.id, name: newName, country:newCountry, age: val.age, position: val.position, wage: val.wage} : val
      }))
    })
  }

  //updatePosition
  const updateEmployeePosition = (id) =>{
    Axios.put('http://localhost:3001/updatePosition', {country: newPosition, id:id}).then((response) =>{
      setEmployeeList(employeeList.map((val) =>{
        return(val.id === id) ? {id: val.id, name: newName, country:val.country, age: val.age, position: newPosition, wage: val.wage} : val
      }))
    })
  }

  //updateWage
  const updateEmployeeWage = (id) =>{ 
    Axios.put('http://localhost:3001/updateWage',{wage:newWage, id:id}).then((response) =>{
      // alert('Update! you can refresh page to see it');
       setEmployeeList(employeeList.map((val)=>{
        return (val.id === id) ? {id: val.id, name: val.name, country:val.country, age: val.age, position: val.position, wage: newWage} : val
      })) 
    });
  };

  return (
    <div className="App">
        <div className='information'>
          <label>Name:</label>
          <input 
            type= 'text' 
            onChange={(event)=> {
              setName(event.target.value)
            }}
          />
          <label>age:</label>
          <input
            type= 'number'
            onChange={(event) =>{
              setAge(event.target.value)
           }}
          />
          <label>country:</label>
          <input
           type= 'text'
            onChange={(event) =>{
              setCountry(event.target.value);
           }}
          />
          <label>position:</label>
          <input 
            type= 'text'
            onChange={(event) =>{
              setPosition(event.target.value)
           }}
          />
          <label>wage(year):</label>
          <input 
            type= 'number'
            onChange={(event) => {
             setWage(event.target.value)
            }}
          />
        <button className = 'addEmployee'onClick={addEmployee}>Add Employee</button>
      </div>

      <div className='bloc2'>
          <button onClick={getEmployee}>Show Employee</button>
          <div className='employees'>
            <table width='' height=''border='1'>
              <caption>Liste des Employés</caption>
                <tr>
                  <th>Nom</th>
                  <th>Pays</th>
                  <th>age</th>
                  <th>poste</th>
                  <th>salaire</th>
                </tr>
                {employeeList.map((val, key) => {
                  return (
                        <tr>
                          <td>{val.name}</td>
                          <td>{val.country}</td>
                          <td>{val.age}</td>
                          <td>{val.position}</td>
                          <td>{val.wage}</td>

                          <td className='update'>
                            <table>

                            </table>
                            <p className='inputupdate'>
                              <p><input type='text'
                                placeholder='update name'
                                onChange={(event) => {
                                  setNewName(event.target.value)
                                 }} 
                              /></p>
                              
                              <p><input type='number'
                                placeholder='update age'
                                onChange={(event) => {
                                  setNewAge(event.target.value)
                                 }} 
                              /></p>

                               
                              <p><input type='text'
                                placeholder='update country'
                                onChange={(event) => {
                                  setNewCountry(event.target.value)
                                 }} 
                              /></p>

                               
                              <p><input type='text'
                                placeholder='update position'
                                onChange={(event) => {
                                  setNewPosition(event.target.value)
                                 }} 
                              /></p>

                               
                              <p><input type='number'
                                placeholder='update wage'
                                onChange={(event) => {
                                  setNewWage(event.target.value)
                                 }} 
                              /></p>

                               
                            </p>
                            <div className='updatebutton'>
                              <p><button onClick={() =>{updateEmployeeName(val.id)}}>UPDATE NAME </button></p>
                              <p><button onClick={() =>{updateEmployeeAge(val.id)}}>UPDATE AGE</button></p>
                              <p><button onClick={() =>{updateEmployeeCountry(val.id)}}>UPDATE COUNTRY</button></p>
                              <p><button onClick={() =>{updateEmployeePosition(val.id)}}>UPDATE POSITION</button></p>
                              <p><button onClick={() =>{updateEmployeeWage(val.id)}}>UPDATE WAGE</button></p>
                            </div>
                            <button onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                          </td>
                        </tr> 
                  )
                })}
            </table>    
          </div>
      </div>
    </div>
  )
}

export default App;
