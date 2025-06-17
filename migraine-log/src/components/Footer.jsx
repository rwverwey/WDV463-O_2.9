export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Migraine Log. Built for clarity, not flair.</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: 'auto',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    fontSize: '0.9rem',
  },
};
