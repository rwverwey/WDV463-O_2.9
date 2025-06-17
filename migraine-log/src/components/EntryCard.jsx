import { Link, useNavigate } from 'react-router-dom';

export default function EntryCard({ entry }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm('Delete this entry?')) {
      fetch(`http://localhost:5000/api/entries/${entry._id}`, {
        method: 'DELETE',
      }).then(() => navigate(0));
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>
          {new Date(entry.date || entry.createdAt).toLocaleDateString()}
        </h3>
        <span style={styles.date}>
          {new Date(entry.createdAt).toLocaleTimeString()}
        </span>
      </div>
      <p><strong>Severity:</strong> {entry.severity}</p>
      <p><strong>Trigger:</strong> {entry.trigger}</p>
      <p><strong>Relief:</strong> {entry.relief}</p>
      <p><strong>Medication:</strong> {entry.medication}</p>
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
    fontSize: '0.85rem',
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
