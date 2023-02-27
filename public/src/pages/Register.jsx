import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import MovingComponent from 'react-moving-text'

function Register() {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [values, setValues] = useState({ 
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const{password, userName, email} = values;
      const {data} = await axios.post(registerRoute, {
        userName,
        email, 
        password
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true) {
        localStorage.setItem('current_user', JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  }

  const handleValidation = () => {
    const{password, confirmPassword, userName, email} = values;
    if (password !== confirmPassword) {
      toast.error("Passwords don't match.", toastOptions);
      return false;
    } else if (userName.length < 3) {
      toast.error(
        "Username should be greater than three characters", toastOptions
      );
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than eight characters", toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error(
        "Email is required.", toastOptions
      );
      return false;
    }
    return true; 
  }

  const registerBtn = {
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
    <div>
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <div className='container px-0 py-3 text-center'>
        {/* style="max-width:1050px;" */}
          <form onSubmit={(event)=>handleSubmit(event)} > 
            <div className="justify-content-center align-items-center text-center">
              <div className='brand'>
                <h1>WELCOME TO
                <MovingComponent
                  type="fadeInFromBottom"
                  duration="4000ms"
                  delay="1s"
                  direction="normal"
                  timing="ease"
                  iteration="1"
                  fillMode="none">
                  KAT CHAT       
                  </MovingComponent>
                  </h1> 
              </div>
              <div className='container col-4'>
                <div className="input-group mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Username" 
                      name='userName'
                      onChange={(e) => handleChange(e)} />
                  </div>
                  <div className="input-group mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Email" 
                      name='email'
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
                  <div className="input-group mb-3">
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Confirm Password" 
                      name='confirmPassword'
                      onChange={(e) => handleChange(e)} />
                  </div>
                <button type='submit' className="w-100 mb-3 text-center" style={registerBtn}
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Sign Up</button>
              <span>already have an account? <Link to="/login" style={link}><h5>login</h5></Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;

