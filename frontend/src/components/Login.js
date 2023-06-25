
import { useState } from 'react';

const Login = ({onLogin, isLoaded}) => {
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

    if (!formValue.email || !formValue.password){
      return;
    }

    onLogin(formValue);
  }

  return (
    <section className="login">
      <h1 className='login__header'>Вход</h1>
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
        <button className="form__button form__button_login">
          {isLoaded ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </section>
  )
}

export default Login;
