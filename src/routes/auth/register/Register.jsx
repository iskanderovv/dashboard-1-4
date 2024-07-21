import { Button, Checkbox, Form, Input, Typography, Divider, notification } from 'antd';
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from "../../../api";
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, LOADING, REGISTER } from '../../../redux/actions/action-types';
import TelegramLoginButton from 'telegram-login-button';


const { Title, Text } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loading = useSelector(state => state.loading)

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING });
      const { data } = await axios.post("/auth", values);
      dispatch({ type: REGISTER, token: data.payload.token, user: data.payload.user });

      notification.success({
        message: 'Registration Successful',
        description: 'You have successfully registered! Please log in to continue.',
        placement: 'topRight',
      });
    } catch (error) {
      dispatch({ type: ERROR });

      console.log(error);

      notification.error({
        message: 'Registration Failed',
        description: 'There was an error during registration. Please try again.',
        placement: 'topRight',
      });
    }
    form.resetFields();
  };

  const onRememberMeChange = (e) => {
    dispatch({ type: SET_REMEMBER_ME, payload: e.target.checked });
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
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className="text-center">Register</Title>
      <Form.Item
        style={{ marginBottom: "6px" }}
        label="Firstname"
        name="first_name"
        rules={[
          {
            required: true,
            message: "Please enter your firstname!",
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: "6px" }}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please enter your username!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "6px" }}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password!"
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "6px" }}
        name="remember"
        valuePropName="checked"
        onChange={onRememberMeChange}
        wrapperCol={{
          span: 16,
        }}
      >
        <Checkbox onChange={onRememberMeChange}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        className="w-full"
        wrapperCol={{
          span: 24,
        }}
      >
        <Button className="w-full" type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
      <Divider> <span className='text-gray-500'>Or</span> </Divider>
      <div className='flex justify-center flex-col gap-4 w-full'>
        <GoogleLogin
          
          onSuccess={async (credentialResponse) => {
            const decode = credentialResponse.credential.split(".")[1];
            const userData = JSON.parse(atob(decode));
            const user = {
              username: userData.name,
              password: userData.sub,
              first_name: userData.given_name,
            }

            try {
              const response = await axios.post("/auth", user);

              dispatch({ type: REGISTER, token: response.data.payload.token, user: response.data.payload.user });

              notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in with Google!',
                placement: 'topRight',
              });
            } catch (error) {
              if (error.response && error.response.data && error.response.data.message === 'User already exists') {
                notification.error({
                  message: 'User Already Exists',
                  description: 'The user is already registered. Please log in.',
                  placement: 'topRight',
                });
              } else {
                console.log('Login Failed', error);
                notification.error({
                  message: 'Login Failed',
                  description: 'There was an error during Google login. Please try again.',
                  placement: 'topRight',
                });
              }
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
      <Text className='mt-[20px] block text-center'> Already have an account? <Link to="/auth">Login</Link> </Text>
    </Form>
  );
}

export default Register;
