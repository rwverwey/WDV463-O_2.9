// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section style={styles.section}>
      <h1 style={styles.heading}>Migraine Tracker</h1>
      <p style={styles.intro}>
        Keep track of your migraine symptoms, triggers, and relief methods. View past logs or start a new entry to monitor patterns over time.
      </p>
      <div style={styles.links}>
        <Link to="/log" style={styles.button}>View Log</Link>
        <Link to="/entry" style={styles.button}>New Entry</Link>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: 'var(--primary)',
    marginBottom: '1rem',
  },
  intro: {
    fontSize: '1rem',
    color: 'var(--text)',
    maxWidth: '600px',
    margin: '0 auto 2rem',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'var(--accent)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    textDecoration: 'none',
    fontWeight: '600',
  },
};
