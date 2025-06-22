import React, { useState, useEffect } from 'react';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !password || !captchaInput) {
      setError('All fields are required.');
      return;
    }

    if (captchaInput !== captcha) {
      setError('Captcha does not match.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    setError('');
    alert('Login successful!');
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;