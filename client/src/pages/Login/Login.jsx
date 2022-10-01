import "./login.scss"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../redux/apiCalls"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsernam] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isFetching, error} = useSelector((state)=>state.user);

    const handleClick= (e)=>{
        e.preventDefault();
        login(dispatch, {username, password});
        navigate("/", {replace: true});
    };

  return (
    <div className="login">
        <div className="wrapper">
            <h1 className="title">SIGN IN</h1>
            <form className="form">
                <input type="text" placeholder="Username" onChange={(e)=>setUsernam(e.target.value)}  />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={handleClick} disabled={isFetching}>
                    LOGIN
                </button>
                {error && <h3 className="error">Something went wrong</h3>}
                <Link to="/register"> DO NOT REMEMBER YOUR PASSWORD? </Link>
                <Link to="/register">CREATE A NEW ACCOUNT</Link>
            </form>
        </div>
    </div>
  )
}

export default Login
