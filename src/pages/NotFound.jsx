import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#2563EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{
        fontSize: '6rem',
        fontWeight: 900,
        color: '#fff',
        marginBottom: '0.5rem',
        letterSpacing: '2px',
        textShadow: '0 4px 24px #1e40af55',
      }}>
        404
      </div>
      <div style={{
        fontSize: '2rem',
        color: '#fff',
        fontWeight: 600,
        marginBottom: '1.5rem',
      }}>
        Page Not Found
      </div>
      <div style={{
        color: '#fff',
        opacity: 0.8,
        marginBottom: '2rem',
        fontSize: '1.1rem',
        maxWidth: '320px',
        textAlign: 'center',  
      }}>
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'transparent',
          color: '#fff',
          border: '2px solid #fff',
          padding: '0.85rem 2.25rem',
          borderRadius: '2rem',
          fontWeight: 700,
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseOver={e => (e.currentTarget.style.background = '#fff', e.currentTarget.style.color = '#2563EB')}
        onMouseOut={e => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = '#fff')}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;