import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./loginPage.css";
import drdoBg from "./drdobg.webp";

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    
    setError("");
    
    //logout function
    localStorage.setItem('isLoggedIn', 'true');
    setLoading(true);

    // wait 1.5 sec, then navigate
    setTimeout(() => {
      navigate("/main");
    }, 1500);
    
  };



  return (
    <div style={styles.container}>
      <div style={styles.background}></div>

      <div style={styles.overlay}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>LOGIN</h2>

          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Captcha</label>
          <div style={styles.captchaBox}>
            <span style={styles.captcha}>{captcha}</span>
            <button
            className='refreshbtn'
              type="button"
              onClick={() => setCaptcha(generateCaptcha())}
              style={styles.refresh}
            >
              Refresh
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            style={styles.input}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button
            className="loginbtn"
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Loading…" : "Login"}
          </button>
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
    backgroundImage: `url(${drdoBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
    zIndex: 0,
  },
  overlay: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '16px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#01447C',
  },
  label: {
    fontWeight: '500',
    fontSize: '14px',
    marginBottom: '-8px',
  },
  input: {
    width: '95%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  captchaBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  captcha: {
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#e0e7ff',
    padding: '8px 12px',
    borderRadius: '6px',
    letterSpacing: '2px',
  },
  refresh: {
    padding: '6px 12px',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    border: 'none',
    marginLeft: '10px',
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginTop: '-4px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  button: {
    marginTop: '8px',
    padding: '10px',
    width: '102%',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
};

export default LoginPage;
