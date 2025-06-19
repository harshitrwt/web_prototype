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
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={styles.logoTitleWrapper}>
          <img src="/imglogo.png" alt="Logo" style={styles.logo} />
          <div style={styles.hindiTitle}>
           ठोसावस्था भौतिकी प्रयोगशाला बुलेटिन बोर्ड /<br />
            Solid State Physics Laboratory Bulletin Board
          </div>
        </div>
      </div>

      <div style={styles.background}></div>

      <div style={styles.overlay}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={{ textAlign: 'center' }}>Login</h2>

          <label>Username:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.input}
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <div style={styles.captchaBox}>
            <span style={styles.captcha}>{captcha}</span>
            <button
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

          <button type="submit" style={styles.button}>Login</button>
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
    flexDirection: 'column', // stack navbar and content vertically
    backgroundColor: '#F1F1F1',
  },
  navbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#01447C',
    zIndex: 2,
    position: 'relative',
  },
  logoTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: '#fff',
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  hindiTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '1.3',
    color: '#fff',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    opacity: 0.2,
    zIndex: 0,
  },
  overlay: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '5px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
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
    backgroundColor: '#3b82f6',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#01447C',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default LoginPage;
