import React ,{useEffect}from 'react'
import { Tabs} from 'antd';
import './Homepage.css'
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
function Homepage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
   
   
   if(user){
    navigate('/chats');
   }
}, [navigate]);
  return (
    <div className="card-container"  >
    <div className="header"><h3>Chat App </h3></div>
    <Tabs defaultActiveKey="1" centered size='large' tabBarGutter={100} >
    <TabPane tab="Login" key="1"  >
      <Login />
    </TabPane>
    <TabPane tab="Sign Up" key="2"  >
      <Signup />
    </TabPane>
    
  </Tabs>
  </div>
  )
}

export default Homepage
