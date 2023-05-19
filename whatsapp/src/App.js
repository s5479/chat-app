
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import Chatpage from './components/Chatpage';

function App() {
  return (
    <div className="App">
     
    <Routes>
      <Route path="/" element={<Homepage />} exact/>
        <Route path="/chats" element={<Chatpage />} exact />
    
    </Routes>

    </div>
  );
}

export default App;
