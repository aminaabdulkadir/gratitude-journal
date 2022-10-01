import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal"
import Note from "./pages/Note/Note";
import NewNote from "./pages/New/NewNote";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function App() {
  const currentUser = useSelector((state)=>state.user.currentUser);
  
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path={"/my-journal"} element= {<Journal/>} />
        <Route path="/note/:noteId" element= {<Note/>}/>
        <Route path="/new" element={<NewNote/>}/>
        <Route path="/register" element={ currentUser
        ? <Navigate to="/" />
        : <Register/>} />
        <Route path="/login" element={ currentUser
        ? <Navigate to="/" />
        : <Login/>} />
      </Routes>
    
    </div>
  );
}

export default App;
