import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const API_BASE = 'https://migraine-log-baa4e5b57c8b.herokuapp.com';

export default function EntryCard({ entry }) {
  const navigate = useNavigate();
  const { token } = useAuth(); // get token

  const handleDelete = () => {
    if (confirm('Delete this entry?')) {
      fetch(`${API_BASE}/api/entries/${entry._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // add token
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to delete entry');
          }
          navigate(0);
        })
        .catch(err => {
          console.error('Delete error:', err);
          alert('Unable to delete entry');
        });
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{new Date(entry.date).toLocaleDateString()}</h3>
        <span style={styles.date}>
          {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <p><strong>Severity:</strong> {entry.severity}</p>
      <div style={styles.actions}>
        <Link to={`/entry/${entry._id}`} style={styles.edit}>Edit</Link>
        <button onClick={handleDelete} style={styles.delete}>Delete</button>
      </div>
    </div>
  );
}


const styles = {
  card: {
    backgroundColor: 'var(--white)',
    padding: '1rem',
    borderRadius: 'var(--border-radius)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    marginBottom: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.2rem',
    color: 'var(--primary)',
    margin: 0,
  },
  date: {
    fontSize: '0.9rem',
    color: '#555',
  },
  actions: {
    marginTop: '0.75rem',
    display: 'flex',
    gap: '1rem',
  },
  edit: {
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: '500',
  },
  delete: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontWeight: '500',
  },
};
