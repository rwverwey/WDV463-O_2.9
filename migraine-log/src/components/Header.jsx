import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Migraine Log</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/log" style={styles.link}>Log</Link>
          <Link to="/entry" style={styles.link}>+ Entry</Link>
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
  },
  link: {
    color: 'var(--white)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
  },
};
