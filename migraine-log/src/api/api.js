const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function login(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (err) {
    throw new Error(err.message || 'Login failed');
  }
}

export async function register(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (err) {
    throw new Error(err.message || 'Registration failed');
  }
}

export async function fetchEntries(token) {
  const res = await fetch(`${BASE_URL}/entries`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch entries');
  }

  return data;
}

export async function fetchEntryById(token, id) {
  const res = await fetch(`${BASE_URL}/entries/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch entry');
  }

  return data;
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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create entry');
  }

  return data;
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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update entry');
  }

  return data;
}

export async function deleteEntry(token, id) {
  const res = await fetch(`${BASE_URL}/entries/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete entry');
  }

  return data;
}
