import { useState } from 'react';
import { login } from '../api/api';
import { useAuth } from '../context/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(form.username, form.password);
    if (res.token && res.user) {
      doLogin(res.token, res.user);
      navigate('/');
    } else {
      setError(res.error || 'Login failed');
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    heading: {
      marginBottom: '1rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      padding: '0.75rem',
      marginBottom: '1rem',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '0.75rem',
      fontSize: '1rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    registerText: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.9rem',
    },
    registerLink: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginLeft: '0.3rem',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        <p style={styles.registerText}>
          Don't have an account?
          <Link to="/register" style={styles.registerLink}>Register here</Link>
        </p>
      </form>
    </div>
  );
}
