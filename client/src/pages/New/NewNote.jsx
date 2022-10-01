import "./newNote.scss";
import { useState } from "react";
import { addNote } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateOutlinedIcon 
from '@mui/icons-material/AddPhotoAlternateOutlined';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useNavigate } from "react-router";



const NewNote = () => {
  const [input, setInput] = useState("");
  const currentUser = useSelector((state)=>state.user.currentUser);
  const userId = currentUser._id;
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() +1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy



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
          console.log(note)
          addNote(dispatch, note);
          navigate("/my-journal", {replace: true});
          

  });
}
    );
};


  return (
    <div className="newNote">
      <div className="wrapper">
        <div className="left">
          <div className="leftTop">
            <div className="date">
            {today}
            </div>
            <div className="title">
              Reflect on your day and write about some of the things that made you happier!
            </div>
          </div>
          <div className="leftBottom">
            <form className="add-note">
              <div className="noteContainer">
              <textarea 
              placeholder="I am grateful for..." 
              onFocus={(e) => e.target.placeholder = ""}
              onBlur={(e) => e.target.placeholder = "I am grateful for..."}
              onChange={(e)=> setInput(e.target.value)}
              className="text"
              >
              </textarea>
              <div className="imgContainer">
              <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://i.postimg.cc/9QXPY0vX/placeholder-square-1.jpg"
              }
              alt=""
            />

              </div>
              </div>

              <label htmlFor="file">
                <AddPhotoAlternateOutlinedIcon className="icon"/>
              </label>
              <input type="file" id="file" 
              style={{ display: "none" }}
              onChange={(e)=> setFile(e.target.files[0])}
              />

              <button onClick={handleClick}>SAVE</button>


            </form>

          </div>

        </div>
      
      </div>
      
    </div>
  )
}

export default NewNote
