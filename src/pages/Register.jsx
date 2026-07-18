import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css'; // Reusing login styles for consistency
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await registerUser(firstName, lastName, email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`skeuo-panel ${styles.loginCard}`}>
        
        <div className={styles.loginHeader}>
          <h1>Create Admin Account</h1>
          <p>Join the Enterprise HRM workspace</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName"
                className="input-field" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />
            </div>
            
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                className="input-field" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@enterprise.com"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{marginTop: '10px'}} disabled={isLoading}>
            <UserPlus size={18} />
            {isLoading ? 'Creating Account...' : 'Sign Up as Admin'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
