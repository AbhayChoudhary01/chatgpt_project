import Navbar from "./components/Navbar"
import BottomBox from "./components/BottomBox"
import LeftBox from "./components/LeftBox"
import RightBox from './components/RightBox';
import './App.css';

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="global_box">
        <LeftBox />
        <RightBox />
      </div>
      <BottomBox />
    </div>
  )
}
