import { Button, Checkbox, Form, Input, Typography, Divider, notification } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import TelegramLoginButton from 'telegram-login-button';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, LOADING, LOGIN } from '../../../redux/actions/action-types';
import axios from "../../../api";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loading = useSelector(state => state.loading);

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING });
      const { data } = await axios.post("/auth/login", values);
      console.log(data);
      dispatch({ type: LOGIN, token: data.payload.token, user: data.payload.user });

      if(data?.payload?.token){
        navigate('/dashboard')
      }

      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
        placement: 'topRight',
      });
    } catch (error) {
      dispatch({ type: ERROR });

      notification.error({
        message: 'Login Failed',
        description: 'There was an error during login. Please check your credentials and try again.',
        placement: 'topRight',
      });
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className="text-center">Login</Title>
      <Form.Item
        label="Username"
        name="username"
        style={{ marginBottom: "6px" }}
        rules={[
          {
            required: true,
            message: "Please enter your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        style={{ marginBottom: "6px" }}
        rules={[
          {
            required: true,
            message: "Please enter your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "6px" }}
        className="w-full"
        wrapperCol={{
          span: 24,
        }}
      >
        <Button className="w-full" type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
      <Divider> <span className='text-gray-500'>Or</span> </Divider>
      <div className='flex justify-center flex-col items-center gap-4'>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const decode = credentialResponse.credential.split(".")[1];
            const userData = JSON.parse(atob(decode));
            const user = {
              username: userData.name,
              password: userData.sub,
              first_name: userData.given_name,
            }

            const response = await axios.post("/auth/login", user);
            console.log(response.data);

            if (credentialResponse.credential) {
              dispatch({ type: LOGIN, token: response.data.payload.token, user: response.data.payload.user });

              notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in with Google!',
                placement: 'topRight',
              });
            }
          }}
          onError={() => {
            console.log('Login Failed');
            notification.error({
              message: 'Login Failed',
              description: 'There was an error during Google login. Please try again.',
              placement: 'topRight',
            });
          }}
          useOneTap
        />
        <TelegramLoginButton
          botName="ecommerce60_bot"
          dataOnauth={user => console.log(user)}
        />
      </div>
      <Text className='mt-[20px] block text-center'> Don't have an account? <Link to="/auth/register">Register</Link> </Text>
    </Form>
  );
};

export default Login;
