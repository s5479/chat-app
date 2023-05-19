import React ,{useState}from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Alert } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from "antd";
function Signup() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmpassword, setConfirmpassword] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();



  const postDetails =(pics) => {
    setLoading(true)
    if(pics === undefined){
      //  toast({
      //     title: 'Please select an image!',
      //     position: "bottom",
      //     status: 'warning',
      //     duration: 5000,
      //     isClosable: true,
      //   });
        <Alert message="Warning" type="warning" showIcon closable />
        return;

    }

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
       const data = new FormData();
       data.append("file", pics);
       data.append("upload_preset", "chatapp");
       data.append("cloud_name", "surendrasingh");
       fetch("https://api.cloudinary.com/v1_1/surendrasingh/image/upload",{
          method:'post', body: data,
       }).then((res) => res.json()).then(data => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
       })
       .catch((err) =>{
          console.log(err);
          setLoading(false);
       });
    }else{
      //  toast({
      //     title: 'Please select an image!',
      //     position: "bottom",
      //     status: 'warning',
      //     duration: 5000,
      //     isClosable: true,
      //   });
      <Alert message="Warning" type="warning" showIcon closable />
        setLoading(false);
        return;
    }
}
  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };


  const onFinish = async(values) => {
    setLoading(true)
    if(!name || !email || !password || !confirmpassword){
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

    if(password !== confirmpassword){
      //  toast({
      //     title: 'Password Do not Match ',
      //     position: "bottom",
      //     status: 'warning',
      //     duration: 5000,
      //     isClosable: true,
      //   });
      <Alert message="Warning" type="warning" showIcon closable />

       return;
    }

    try {
       const config = {
          headers:{
            "Content-type": "application/json",
          },
       };
       const {data} = await axios.post("/api/user",{name, email, password, pic}, config) ;
       console.log(data);
      //  toast({
      //     title: 'Registration Successful ',
      //     position: "bottom",
      //     status: 'success',
      //     duration: 5000,
      //     isClosable: true,
      //   });
      <Alert message="Success Tips" type="success" showIcon />

        localStorage.setItem('userInfo',JSON.stringify(data));
        setLoading(false)
        navigate('/chats');
    } catch (error) {
      //  toast({
      //     title: 'Error Occured! ',
      //     description:error.reponse.data.message,
      //     status:"error",
      //     position: "bottom",
          
      //     duration: 5000,
      //     isClosable: true,
      //   });
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
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
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </Form.Item>
        <Form.Item
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please input your password again!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}

          />
        </Form.Item>
        <Form.Item
          name="pic"
          rules={[
            {
              required: true,
              message: "Please Upload your Pitcher!",
            },
          ]}
        >
          <Input
            prefix={<FileImageOutlined className="site-form-item-icon" />}
            type="file"
            placeholder="Upload your Pitcher"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            // onClick={submitHandler}
             loading={loading}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;
