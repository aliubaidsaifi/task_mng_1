import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setUserEmail] = useState();
  const [password, setUserPassword] = useState();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch('http://localhost:5000/login',{
        method: 'Post',
        body: JSON.stringify({email,password}),
        headers:{
            'Content-Type': 'application/json'
        },
    });

      result = await result.json()
     if(result) {
      alert("user login")
            localStorage.setItem("SetUser",JSON.stringify(result));
            navigate("/dashboard")
        }else{
         alert("Data Not Found")
        }
    // navigate("/dashboard")
  }


  return (
    <form>
      <div className='loginForm'>
        <h1>Login Form</h1>
        <input
          type='text'
          placeholder='Email'
          name="email"
          value={email}
          onChange={e => setUserEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          name="password"
          value={password}
          onChange={e => setUserPassword(e.target.value)}
          required
        />
        <button type='submit' onClick={onSubmit}>Login</button>
      </div>
    </form>
  )
}

export default Login;
