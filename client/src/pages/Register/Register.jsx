import "./register.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addClient } from "../../redux/apiCalls";


const Register = () => {
  const [client, setClient] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setClient((prev)=> {
      return {...prev, [e.target.name]: e.target.value};
    });
  };
 
  const handleClick = (e)=>{
    e.preventDefault();
    addClient(dispatch, client);
    navigate("/", {replace: true});
  };
  

  return (
    <div className="register">
      <div className="wrapper">
        <h1 className="title">Creat An Account</h1>
        <form className="form">
          <label htmlFor="username">Username:</label>
          <input type="text" className="username" placeholder="Username" 
          id="username" name="username" onChange={handleChange}/>
          <label htmlFor="email">Email:</label>
          <input type="text" className="email" placeholder="Email" 
          id="email" name="email" onChange={handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" className="password"  placeholder="6 Charachters at Least" 
          id="password" name="password" onChange={handleChange}/>
          <label htmlFor="confirm">Confirm Password:</label>
          <input type="password" className="password"
           id="confirm" />
          <span className="agreement"> 
          By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button onClick={handleClick}>CREATE</button>
        </form>
      </div>
    </div>
  )
}

export default Register
