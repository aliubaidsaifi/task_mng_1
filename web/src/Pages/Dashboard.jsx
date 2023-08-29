import React, { useState } from 'react';
import './dashboard.style.css';
import { useEffect } from 'react';


const Dashboard = () => {
  const [task, setTask] = useState({ title: '', description: '' });
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  
const storage = JSON.parse(localStorage.getItem('SetUser'))


  useEffect(async () => {
  await  getAllTask()
  }, [])

const getAllTask =async()=>{
  let result = await fetch('http://localhost:5000/getAll/task', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  result = await result.json()
await  setTaskList(result.data)
}

const deleteRow =async(id)=>{
  console.log(id,'id..............');
  let result = await fetch(`http://localhost:5000/task/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  result = await result.json()
  await  getAllTask()
}

const editRow =async(data)=>{
await setIsEdit(true)
 await setEditData(data)
 await setTask({ title: data.title, description: data.description })
}

const onUpdate =async()=>{
  let body={
    "_id":editData._id,
    "userId":storage._id,
    "title": task.title,
    "description": task.description,
    "status":false
  }
  console.log(body,'body........');
  let result = await fetch(`http://localhost:5000/task/update/${body._id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  result = await result.json()
  await setIsEdit(false)  
setTask({ title: '', description: '' })
  await  getAllTask()
}

const updateStatus =async(body)=>{
  body.status=true
  let result = await fetch(`http://localhost:5000/task/update/${body._id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  result = await result.json()
  await  getAllTask()
}


  const onsubmit=async()=>{
let body={
  "userId":storage._id,
  "title": task.title,
  "description": task.description,
  "status":false
}
let result = await fetch('http://localhost:5000/create/task',{
    method: 'Post',
    body: JSON.stringify(body),
    headers:{
        'Content-Type': 'application/json'
    },
});

  result = await result.json()
setTask({ title: '', description: '' })
await  getAllTask()
  }

  return (
    <>
<div >      
   
  <div>
    {isEdit?
    <div style={{ display: 'flex', flexDirection: 'row',  margin: '0 auto',marginBottom:'50px' }}>
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        style={{ padding: '8px', marginRight:'30px' }}
      />
      <textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        style={{ padding: '8px', marginRight:'30px' }}
      />
      <button style={{ padding: '8px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }} onClick={onUpdate}>
        update
      </button>
    </div>
    :
    <div style={{ display: 'flex', flexDirection: 'row',  margin: '0 auto',marginBottom:'50px' }}>
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        style={{ padding: '8px', marginBottom: '8px', marginRight:'30px' }}
      />
      <textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        style={{ padding: '8px', marginBottom: '8px',marginRight:'30px' }}
      />
      <button style={{ padding: '8px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }} onClick={onsubmit}>
        Add Task
      </button>
    </div>    
    }
  </div>
    


  <div className="task-list">
      <table >
        <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {taskList && taskList.map((item,i) => (
          <tr key={item._id}>
          <td>{i+1}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>
            {item.status?
              <button class="btn btn-complete">Complete</button>
              :<button class="btn btn-incomplete" onClick={()=>{updateStatus(item)}}>Incomplete</button>
              }
              </td>
            <td>
                <button onClick={()=>{editRow(item)}} style={{marginRight:"10px"}}>Edit</button>
                <button onClick={()=>{deleteRow(item._id)}}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
</div>
    </>
  )
}

export default Dashboard
