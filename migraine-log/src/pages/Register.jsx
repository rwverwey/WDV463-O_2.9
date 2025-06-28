import { useState } from 'react';
import { register } from '../api/api';
import { useAuth } from '../context/useAuth'; 
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register(form.username, form.password);
    if (res.token && res.user) {
      doLogin(res.token, res.user);
      navigate('/');
    } else {
      setError(res.error || 'Registration failed');
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
      backgroundColor: '#28a745',
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
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
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
          Register
        </button>
      </form>
    </div>
  );
}
