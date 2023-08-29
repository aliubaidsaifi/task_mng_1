import React, { useState } from 'react';
import '../Pages/dashboard.style.css'

const FormTable = () => {
  const [task, setTask] = useState({ title: '', description: '' });

  const onsubmit=async()=>{
const storage = JSON.parse(localStorage.getItem('SetUser'))
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
  }


  return ( 
    <div style={{ display: 'flex', flexDirection: 'row',  margin: '0 auto',marginBottom:'550px' }}>
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
  )
}

export default FormTable
