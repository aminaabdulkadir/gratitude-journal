import "./note.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AddPhotoAlternateOutlinedIcon 
from '@mui/icons-material/AddPhotoAlternateOutlined';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateNote } from "../../redux/apiCalls";
import { useNavigate } from "react-router";

const Note = () => {
  const location = useLocation();
  const noteId = location.pathname.split("/")[2];
  const note = useSelector((state)=>state.note.notes.find((note)=>note._id === noteId));
  const currentUser = useSelector((state)=>state.user.currentUser);
  const userId = currentUser._id;

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const  navigate = useNavigate();

  const handleClick = (e)=>{
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

     // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const note = {userId: userId, note: input, img: downloadURL};
          updateNote(dispatch, noteId, note);
          navigate("/my-journal", {replace: true});
         
          

  });
}
    );
};

  
  

  return (
    <div className="note">
      <div className="wrapper">

        <div className="top">
  
          <div className="textContainer">
            <h1>Gratitude of Day {note.updatedAt.slice(0,10)}</h1>
            <p>{note.note}</p>
          </div>
          <div className="imgContainer">
            <img src={note.img} alt="" />
          </div>
    
        </div>

        <div className="bottom">

        <form className="edit-note">
              <div className="noteContainer">
              <textarea placeholder={note.note} 
              onFocus={(e) => e.target.placeholder = ""}
              onBlur={(e) => e.target.placeholder = note.note}
              onChange={(e)=>setInput(e.target.value)}
              className="text"
              >
              </textarea>
              <div className="imgContainer">
             <img src={note.img} alt="" />

              </div>
              </div>

              <label htmlFor="file">
                <AddPhotoAlternateOutlinedIcon className="icon"/>
              </label>
              <input type="file" id="file" 
              style={{ display: "none" }}
              onChange={(e)=> setFile(e.target.files[0])}
             
              />

              <button onClick={handleClick} >EDIT</button>
              </form>
       
        </div>
      </div>
      
    </div>
  )
}

export default Note
