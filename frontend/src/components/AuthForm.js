import { Link } from 'react-router-dom';

function AuthForm(props) {
  return (
    <div className={"auth"}>
      <div className={`auth__container auth__container_type_${props.container}`}>
        <h2 className="auth__caption">{props.title}</h2>
        <form className="auth__form" name={`${props.name}`} noValidate onSubmit={props.onSubmit}>
          <input
            className="auth__input auth__input_field_email"
            type="email"
            name="email"
            required
            minLength="2"
            maxLength="40"
            placeholder="Email"
            value={props.formValue.email}
            onChange={props.onChange}
          />
          <input
            className="auth__input auth__input_field_password"
            type="password"
            name="password"
            required
            minLength="2"
            maxLength="20"
            placeholder="Пароль"
            value={props.formValue.password}
            onChange={props.onChange}
          />
          <button className={`auth__submit-btn auth__submit-btn_type_${props.name}`} type="submit">{props.btnCaption}</button>
        </form>
        {props.showLink && <Link to="/sign-in" className="auth__login-link">Уже зарегистрированы? Войти</Link>}
      </div>
    </div>
  );
}

export default AuthForm;