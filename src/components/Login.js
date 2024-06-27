import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    // Regex para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Verifica se o e-mail e a senha são válidos
    const emailIsValid = emailRegex.test(email);
    const passwordIsValid = password.length >= 8;

    setIsValid(emailIsValid && passwordIsValid);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validate();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate('/list');  // Redireciona para a página de listagem após o login
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit" disabled={!isValid}>Login</button>
        {!isValid && <p className="error-message">Please enter a valid email and password (at least 8 characters).</p>}
      </form>
    </div>
  );
};

export default Login;
