import Navbar from "../components/Navbar"
import BottomBox from "../components/BottomBox"
import LeftBox from "../components/LeftBox"
import RightBox from '../components/RightBox';
import '../css/App.css';

export default function App() {


  return (
    <div className="login-page-body">

      <Navbar />
      <div className="global_box">
        <LeftBox />
        <RightBox />
      </div>
      <BottomBox />

    </div>
  )
}