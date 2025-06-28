import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Log() {
  const { token, user } = useAuth(); // fixed: directly use token and user
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchEntries = async () => {
      try {
        const response = await fetch(`${API_BASE}/entries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch entries');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setEntries(sorted);
        } else {
          console.error('Unexpected response:', data);
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
      }
    };

    fetchEntries();
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;

    try {
      const response = await fetch(`${API_BASE}/entries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Delete failed');

      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const closeModal = () => setSelected(null);

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {user ? `${user.username}'s Migraine Log` : 'Migraine Log'}
        </h2>
        <Link to="/entry" style={styles.newBtn}>+ New Entry</Link>
      </div>

      {entries.length === 0 ? (
        <p style={styles.empty}>No entries yet. Start logging to track your patterns.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Severity</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => (
                <tr key={entry._id}>
                  <td style={styles.td}>
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>{entry.severity}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => setSelected(entry)}
                      style={styles.viewBtn}
                    >
                      View
                    </button>
                    <Link to={`/entry/${entry._id}`} style={styles.editBtn}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Migraine Details</h3>
            <p><strong>Date:</strong> {new Date(selected.date).toLocaleDateString()}</p>
            <p><strong>Severity:</strong> {selected.severity}</p>
            <p><strong>Trigger:</strong> {selected.trigger || '—'}</p>
            <p><strong>Relief:</strong> {selected.relief || '—'}</p>
            <p><strong>Medication:</strong> {selected.medication || '—'}</p>
            <button style={styles.modalClose} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    padding: '2rem 1rem',
    background: '#f0f0f0',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.75rem',
    color: '#145da0',
    fontWeight: '700',
  },
  newBtn: {
  backgroundColor: '#e0e0e0',
  color: '#333',
  padding: '0.4rem 0.75rem',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: '500',
  textDecoration: 'none',
  border: '1px solid #ccc',
  transition: 'background 0.2s ease',
},

  empty: {
    fontStyle: 'italic',
    color: '#555',
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontWeight: '600',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '0.85rem 1rem',
    borderBottom: '1px solid #eee',
  },
  viewBtn: {
    background: '#145da0',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.75rem',
    marginRight: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  editBtn: {
    marginRight: '0.5rem',
    color: '#378ef0',
    fontWeight: '500',
    fontSize: '0.875rem',
    textDecoration: 'none',
  },
  deleteBtn: {
    color: '#e53935',
    fontWeight: '500',
    fontSize: '0.875rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  },
  modalTitle: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: '#145da0',
  },
  modalClose: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: '#378ef0',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

