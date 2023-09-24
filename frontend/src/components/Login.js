import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import { api } from '../utils/Api';

function Login(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          props.setUserEmail(formValue.email);
          setFormValue({ email: '', password: '' });
          props.handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        props.onLogInFailure(true)
      })
  }

  return (
    <AuthForm
      name="register"
      title="Вход"
      container="form"
      btnCaption="Войти"
      formValue={formValue}
      onSubmit={handleSubmit}
      onChange={handleChange}
      showLink={false}
    />
  )
}

export default Login;