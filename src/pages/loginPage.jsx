import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./loginPage.css";
import drdoBg from "./drdobg.webp";
 // Adjust path based on file location


function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize navigation

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

    if (password !== 'admin') {
      setError('Wrong password.');
      return;
    }

    setError('');
    navigate('/main'); // Redirect to main page
  };

  return (
    <div  style={styles.container}>
      <div style={styles.background}></div>

      <div style={styles.overlay}>
        <form id="container" onSubmit={handleSubmit} style={styles.form}>
          <h2  style={{ textAlign: 'center' }}>LOGIN</h2>

          <label>Username:</label>
          <input
            type="text"
            placeholder='enter username'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.input}
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder='enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <div style={styles.captchaBox}>
            <span style={styles.captcha}>{captcha}</span>
            <button
              id="refreshbtn"
              type="button"
              onClick={() => setCaptcha(generateCaptcha())}
              style={styles.refresh}
            >
              Refresh
            </button>
          </div>

          <label>Enter Captcha:</label>
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            style={styles.input}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button id="loginbtn" type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}


const styles = {
  container: {
  position: 'fixed', 
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  backgroundColor: 'fff',
  backgroundImage: `url(${drdoBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
},
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2,
    zIndex: 0,
  },
  overlay: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '5px',
    width: '320px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0 16px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  captchaBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  captcha: {
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    padding: '5px 10px',
    backgroundColor: '#e0e7ff',
    borderRadius: '6px',
  },
  refresh: {
    padding: '6px 10px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    
  },
  
};

export default LoginPage;