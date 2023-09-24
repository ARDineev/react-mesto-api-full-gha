import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {

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
    const { password, email } = formValue;

    auth.register(password, email)
      .then(() => {
        navigate('/sign-in', { replace: true });
        props.onRegSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        props.onRegFailure(true)
      })
  }

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      container="form"
      btnCaption="Зарегистрироваться"
      formValue={formValue}
      onSubmit={handleSubmit}
      onChange={handleChange}
      showLink={true}
    />
  )
}

export default Register;