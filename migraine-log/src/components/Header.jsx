import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Header() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Migraine Log</h1>
        <nav style={styles.nav}>
          {token && user && (
            <span style={styles.user}>Hello, {user.username}</span>
          )}
          {token ? (
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    borderBottom: '4px solid var(--accent)',
    padding: '1rem 0',
  },
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: 'var(--white)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
  },
  button: {
    background: 'none',
    border: 'none',
    color: 'var(--white)',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
  },
  user: {
    fontWeight: 500,
    fontSize: '1rem',
    marginRight: '0.5rem',
  },
};
