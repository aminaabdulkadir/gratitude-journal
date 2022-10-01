import "./home.scss";
import Navbar from "../../components/Navbar/Navbar";
import { cards } from "../../cards";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";



const Home = () => {
  const currentUser = useSelector((state)=>state.user.currentUser);
  
  return (
    <div className="home">
      <Navbar/>
      <div className="homeContainer">
        <div className="homeBody">
        <h1 className="statement">
    Happiness starts with <span className="bigger">Gratitude!</span>
        </h1>
        <div className="imgBox">
          {cards.map((card)=>(
            <div className="cards" key={card.id}>
              <img className="cardImg" src={card.img} />
              <p className="cardDesc"> {card.desc} </p>
            </div>
          ))}
        </div>
        { currentUser &&
        <div className="callToAction">
        <Link to={"/my-journal"} style={{textDecoration:"none", color:"inherit"}}>
           <u>YOUR GRATITUDE JOURNAL!</u>
           </Link>
        </div>
         }
        </div>
 



      </div>

      
      
    </div>
  )
}

export default Home
