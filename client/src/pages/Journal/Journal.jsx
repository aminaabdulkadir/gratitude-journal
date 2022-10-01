import "./journal.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNotes, deleteNote } from "../../redux/apiCalls";
import { Link } from "react-router-dom";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';


const Journal = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state)=>state.note.notes);
  const currentUser = useSelector((state)=>state.user.currentUser);
  const userId = currentUser._id;
  const username = currentUser.username;
  
  useEffect(()=>{
    getNotes( dispatch, userId ,notes);
  }, [dispatch]);

  const handleDelete = (id)=>{
    deleteNote( dispatch, id)
  }

  return (
    <div className="main">
      <Navbar/>
    <div className="journal">
    <span className="username"> 
      {username}’s gratitude journal 
      </span>
    <div className="notesWrapper">
      {notes.map((note)=>(
        <ul key={note._id}>
          <li>
            <Link to={"/note/" + note._id} className="text-link">
              <h2>{note.updatedAt.slice(0,10)}</h2>
              <p>{note.note.slice(0,25)}...</p>
            </Link>
            
          </li>
        
          <HighlightOffOutlinedIcon
          className="deleteButton"
          onClick={()=>handleDelete(note._id)}
          />
         
        </ul>
    ))}
    <Link to="/new" className="new-link">
    <ControlPointIcon className="new-link-icon" />
    </Link>
    </div>

    </div>
    </div>
  )
}

export default Journal
