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

      <section className={styles.howItWorksSection}>
        <h2 className={styles.howTitle}>How It Works</h2>
        <div className={styles.stepsContainer}>
          <div className={`skeuo-panel ${styles.stepCard}`}>
            <div className={styles.stepNumber}>1</div>
            <h4 className={styles.stepTitle}>Register Organization</h4>
            <p className={styles.stepDesc}>Sign up and instantly gain access to the secure admin dashboard. Your enterprise environment is spun up in seconds.</p>
          </div>
          
          <div className={`skeuo-panel ${styles.stepCard}`}>
            <div className={styles.stepNumber}>2</div>
            <h4 className={styles.stepTitle}>Onboard Employees</h4>
            <p className={styles.stepDesc}>Add your personnel to the system, assigning them departments, roles, and base salary structures.</p>
          </div>
          
          <div className={`skeuo-panel ${styles.stepCard}`}>
            <div className={styles.stepNumber}>3</div>
            <h4 className={styles.stepTitle}>Manage Operations</h4>
            <p className={styles.stepDesc}>Employees can apply for annual or sick leave. HR administrators can review, approve, or reject these requests with a single click.</p>
          </div>

          <div className={`skeuo-panel ${styles.stepCard}`}>
            <div className={styles.stepNumber}>4</div>
            <h4 className={styles.stepTitle}>Process Payroll</h4>
            <p className={styles.stepDesc}>At the end of the month, instantly generate digital payslips reflecting base pay, allowances, and tax deductions.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Enterprise Systems Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
