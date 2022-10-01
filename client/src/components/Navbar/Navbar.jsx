import "./navbar.scss";
import {Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../../redux/apiCalls";


const Navbar = () => {
  const currentUser = useSelector((state)=>state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout(dispatch)
    navigate("/", {replace: true});
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        
        <div className="left">
          <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
        <div className="logo">
          Gratitude. 
        </div>
        </Link>
        </div>
        
        <div className="right"> 
          <Link to="/register" style={{textDecoration:"none", color:"inherit"}}>
          <div className="registerbtn">
          Register
          </div>
          </Link>
          {currentUser ?
          <div className="loginbtn" onClick={handleLogout}>
          Logout
        </div>
        :
          <Link to="/login" style={{textDecoration:"none", color:"inherit"}}>
          <div className="loginbtn">
            Log in
          </div>
          </Link>
           }
        </div>

      </div>
      
    </div>
  )
}

export default Navbar
