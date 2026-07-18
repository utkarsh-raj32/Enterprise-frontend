import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Landing.module.css';
import { Users, Briefcase, Server, ShieldCheck } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.landingContainer}>
      <main className={styles.hero}>
        <h1 className={styles.title}>Enterprise HRM</h1>
        <p className={styles.subtitle}>
          The industrial-grade Human Resource Management system built for performance, security, and reliability. Manage your organization with precision hardware-inspired tools.
        </p>
        
        <div className={styles.actions}>
          {isAuthenticated ? (
            <button 
              className={`btn btn-primary ${styles.btnLarge}`}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button 
                className={`btn btn-primary ${styles.btnLarge}`}
                onClick={() => navigate('/login')}
              >
                Sign In to Control Panel
              </button>
              <button 
                className={`btn btn-outline ${styles.btnLarge}`}
                onClick={() => navigate('/register')}
              >
                Register Organization
              </button>
            </>
          )}
        </div>
      </main>

      <div className={styles.featuresGrid}>
        <div className={`skeuo-panel ${styles.featureCard}`}>
          <div className={styles.featureIcon} style={{ color: 'var(--primary)' }}>
            <Users size={32} />
          </div>
          <h3 className={styles.featureTitle}>Employee Management</h3>
          <p className={styles.featureDesc}>
            Maintain a secure, centralized directory of all personnel with granular access controls and historical records.
          </p>
        </div>

        <div className={`skeuo-panel ${styles.featureCard}`}>
          <div className={styles.featureIcon} style={{ color: 'var(--accent)' }}>
            <Briefcase size={32} />
          </div>
          <h3 className={styles.featureTitle}>Department Tracking</h3>
          <p className={styles.featureDesc}>
            Organize your workforce into logical units. Monitor department-level statistics and resource allocation.
          </p>
        </div>

        <div className={`skeuo-panel ${styles.featureCard}`}>
          <div className={styles.featureIcon} style={{ color: 'var(--warning)' }}>
            <Server size={32} />
          </div>
          <h3 className={styles.featureTitle}>Cloud Infrastructure</h3>
          <p className={styles.featureDesc}>
            Powered by Spring Boot and PostgreSQL on scalable cloud architecture for maximum uptime and reliability.
          </p>
        </div>

        <div className={`skeuo-panel ${styles.featureCard}`}>
          <div className={styles.featureIcon} style={{ color: 'var(--success)' }}>
            <ShieldCheck size={32} />
          </div>
          <h3 className={styles.featureTitle}>Enterprise Security</h3>
          <p className={styles.featureDesc}>
            Role-based access control (RBAC), JWT authentication, and strict endpoint authorization policies.
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Enterprise Systems Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
