const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function fetchEntries(token) {
  const res = await fetch(`${BASE_URL}/entries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function fetchEntryById(token, id) {
  const res = await fetch(`${BASE_URL}/entries/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createEntry(token, entry) {
  const res = await fetch(`${BASE_URL}/entries`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return res.json();
}

export async function updateEntry(token, id, updatedEntry) {
  const res = await fetch(`${BASE_URL}/entries/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEntry),
  });
  return res.json();
}

export async function deleteEntry(token, id) {
  const res = await fetch(`${BASE_URL}/entries/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
