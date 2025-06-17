import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Header />
      <main style={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
  },
  main: {
    flexGrow: 1,
    padding: '2rem 1rem',
    maxWidth: '1140px',
    margin: '0 auto',
    borderRadius: 'var(--border-radius)',
    backgroundColor: 'var(--content-bg)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
};
