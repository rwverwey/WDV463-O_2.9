import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Log() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/entries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setEntries(sorted);
        } else {
          console.error('Unexpected response:', data);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, [token]);

  const closeModal = () => setSelected(null);

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Migraine Log</h2>
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
                      onClick={() => {
                        if (confirm('Delete this entry?')) {
                          fetch(`${API_BASE}/entries/${entry._id}`, {
                            method: 'DELETE',
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }).then(() => location.reload());
                        }
                      }}
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
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
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
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: 'var(--primary)',
  },
  newBtn: {
    backgroundColor: 'var(--accent)',
    color: 'var(--white)',
    padding: '0.75rem 1.25rem',
    borderRadius: 'var(--border-radius)',
    textDecoration: 'none',
    fontWeight: '600',
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
    borderCollapse: 'separate',
    borderSpacing: '0 0.75rem',
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    backgroundColor: 'var(--header-bg)',
    color: 'var(--black)',
    fontWeight: '600',
    borderBottom: '2px solid #ccc',
  },
  td: {
    padding: '1rem',
    backgroundColor: 'var(--white)',
    borderBottom: '1px solid #eee',
  },
  viewBtn: {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.75rem',
    marginRight: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editBtn: {
    marginRight: '0.5rem',
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: '500',
  },
  deleteBtn: {
    color: '#ef4444',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    background: 'var(--white)',
    padding: '2rem',
    borderRadius: 'var(--border-radius)',
    maxWidth: '500px',
    width: '90%',
  },
  modalTitle: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: 'var(--primary)',
  },
  modalClose: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
