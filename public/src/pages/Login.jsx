import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { loginRoute, host } from '../utils/APIRoutes';
import MovingComponent from 'react-moving-text'


function Login() {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [values, setValues] = useState({ 
    username: "",
    password: "",
  }); 

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const toastOptions = {        
    position: toast.POSITION.BOTTOM_RIGHT, 
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true, 
    theme: 'dark'
  };

  useEffect(() => {
    if (localStorage.getItem('current_user'))
      navigate('/chat');
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const{password, username, email} = values;
      const {data} = await axios.post(loginRoute, {
        username,
        password
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true) {
        localStorage.setItem('current_user', JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };
  
  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  }

  const handleValidation = () => {
    const{password, username} = values;
    if (username.length === 0 || password.length === 0) {
      toast.error(
        "Username and Password are required", toastOptions
      );
      return false;
    }
    return true; 
  }

  const loginBtn = {
    backgroundColor: isHover ? '#9a86f3' :'#F8F9FA',
    color: isHover ? '#000000' : 'FFFFFF',
    padding: '0.3rem 2rem',
    borderStyle: isHover ? '#FFFFFF 1px' : '#9a86f3 1px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '0.4rem',
    fontSize: '1rem',
    textTransform: 'uppercase',
  }

  const link = {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#9a86f3',
  }

  return (
    <>
        <div className='vh-100 container px-0 py-3 d-flex justify-content-center align-items-center'>
          <form onSubmit={(event)=>handleSubmit(event)} className="text-center bg-white"> 
            <div className="text-center">
                <div className="row">
                  <MovingComponent
                  type="bounce"
                  duration="4000ms"
                  delay="3s"
                  direction="normal"
                  timing="ease"
                  iteration="50"
                  fillMode="none">
                  <h1>KAT CHAT</h1>        
                  </MovingComponent>
              </div>
              <div className="col-12">
                <div className="input-group mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Username" 
                      name='username'
                      min="3"
                      onChange={(e) => handleChange(e)} />
                  </div>
                  <div className="input-group mb-3">
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Password" 
                      name='password'
                      onChange={(e) => handleChange(e)} />
                  </div>
                <button type='submit' className="w-100 mb-3 text-center mt-3" style={loginBtn}
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Login</button>
              <span>Don't have an account? <Link to="/register" style={link}><h5>Register</h5></Link></span>
            </div>
            </div>
          </form>
        </div>
      <ToastContainer/>
    </>
  )
}


export default Login;

