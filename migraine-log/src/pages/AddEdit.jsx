import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const API_BASE = 'https://migraine-log-baa4e5b57c8b.herokuapp.com';

export default function AddEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  console.log('AddEdit token:', token);

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    date: '',
    severity: '',
    trigger: '',
    relief: '',
    medication: '',
  });

  useEffect(() => {
    if (!token) {
      console.warn('No token found. Redirecting to login.');
      navigate('/login');
      return;
    }

    if (isEdit) {
      fetch(`${API_BASE}/api/entries/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized or not found');
          return res.json();
        })
        .then(data => {
          if (data._id) setForm(data);
          else console.error('Entry not found:', data);
        })
        .catch(err => {
          console.error('Fetch error:', err.message);
          alert('Error loading entry. You may need to log in again.');
          navigate('/login');
        });
    }
  }, [id, isEdit, token, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!token) {
      alert('You must be logged in to submit.');
      return navigate('/login');
    }

    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit
      ? `${API_BASE}/api/entries/${id}`
      : `${API_BASE}/api/entries`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save entry');

      navigate('/log');
    } catch (err) {
      console.error('Submission error:', err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>{isEdit ? 'Edit Entry' : 'New Migraine Entry'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.column}>
            <label style={styles.label}>Severity</label>
            <select
              name="severity"
              value={form.severity}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select...</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
        </div>

        <label style={styles.label}>Trigger</label>
        <textarea
          name="trigger"
          value={form.trigger}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Optional – e.g. bright light, stress, dehydration"
        />

        <label style={styles.label}>What did you do to help?</label>
        <textarea
          name="relief"
          value={form.relief}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Rested, drank water, dark room, etc."
        />

        <label style={styles.label}>Medications Taken</label>
        <input
          type="text"
          name="medication"
          value={form.medication}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. Ibuprofen, Sumatriptan"
        />

        <button type="submit" style={styles.button}>
          {isEdit ? 'Update Entry' : 'Save Entry'}
        </button>
      </form>
    </section>
  );
}

const styles = {
  section: {
    padding: '1rem 0',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: 'var(--primary)',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backgroundColor: 'var(--white)',
    padding: '2rem',
    borderRadius: 'var(--border-radius)',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  column: {
    flex: '1 1 300px',
    minWidth: '250px',
  },
  label: {
    fontWeight: '500',
    color: 'var(--text)',
    marginBottom: '0.25rem',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
  },
  button: {
    alignSelf: 'flex-start',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
