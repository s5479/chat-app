import React, {useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Alert } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values.email);
  //   console.log("Received values of form: ", values.password);
  // };

  const onFinish =async(values) => {
    // setEmail(values.email)
    // setPassword(values.password)
    console.log(values)
    console.log(email, password)
    setLoading(true)
    if( !email || !password ){
      //  toast({
      //     title: 'Please Fill the all Fields',
      //     position: "bottom",
      //     status: 'warning',
      //     duration: 5000,
      //     isClosable: true,
      //   });
        <Alert message="Warning" type="warning" showIcon closable />
       setLoading(false)
       return;
    }

    try {
      const config = {
         headers:{
           "Content-type": "application/json",
         },
      };
      const {data} = await axios.post("/api/user/login",{ email, password}, config) ;
      console.log(data);
      // toast({
      //    title: 'Registration Successful ',
      //    position: "bottom",
      //    status: 'success',
      //    duration: 5000,
      //    isClosable: true,
      //  });
       <Alert message="Success Tips" type="success" showIcon />
       
       localStorage.setItem('userInfo',JSON.stringify(data));
       setLoading(false)
       navigate('/chats');
   } catch (error) {
      // toast({
      //    title: 'Error Occured! ',
      //    description:error.reponse.data.message,
      //    status:"error",
      //    position: "bottom",
         
      //    duration: 5000,
      //    isClosable: true,
      //  });
       <Alert message="Error" type="error" showIcon />
     
      setLoading(false);
   }
  }
  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
             value={email}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            // onClick={onFinish}
            loading={loading}
          >
            Log in
          </Button>
          
        </Form.Item>
        {/* <Form.Item>
        <Button
            type="dashed"
            // htmlType="submit"
            // className="login-form-button"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {setEmail("guest@gmail.com");
    setPassword("123456");}} 
          >
            Get Guest User Credentials
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  );
}

export default Login;
