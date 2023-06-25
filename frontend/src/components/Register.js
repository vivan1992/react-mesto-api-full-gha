import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({onRegister, isLoaded}) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(formValue);
  }

  return (
    <section className="login">
      <h1 className='login__header'>Регистрация</h1>
      <form className="form form_login" onSubmit={handleSubmit}>
        <div>
          <label className="form__field">
            <input
              id="email-input"
              name="email"
              type="email"
              className="form__input form__input_name_email form__input_type_login"
              placeholder="Email"
              required
              value={formValue.email}
              onChange={handleChange}
              />
            <span className="form__input-error email-input-error" >
            </span>
          </label>
          <label className="form__field">
            <input
              id="password-input"
              name="password"
              type="password"
              className="form__input form__input_name_password form__input_type_login"
              placeholder="Пароль"
              required
              value={formValue.password}
              onChange={handleChange}
              />
            <span className="form__input-error password-input-error" >
            </span>
          </label>
        </div>
        <button className="form__button form__button_login form__button_register">
          {isLoaded ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;
