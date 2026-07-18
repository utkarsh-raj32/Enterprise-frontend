import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';
import { Users, Briefcase, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { token, user } = useAuth();
  const [stats, setStats] = useState({ employees: 0, departments: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [deptRes, empRes] = await Promise.all([
          fetch('https://enterprise-7txq.onrender.com/api/v1/departments', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('https://enterprise-7txq.onrender.com/api/v1/employees?size=1', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const deptData = await deptRes.json();
        const empData = await empRes.json();

        setStats({
          departments: (deptRes.ok && deptData.data) ? deptData.data.length : 0,
          employees: (empRes.ok && empData.data) ? empData.data.totalElements : 0
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h1>Welcome back, {user?.username}</h1>
          <p>Here is what's happening in your organization today.</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={`skeuo-panel ${styles.statCard}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(123, 44, 191, 0.2)', color: 'var(--primary)' }}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Departments</h3>
            <p className={styles.statValue}>{isLoading ? '...' : stats.departments}</p>
          </div>
        </div>

        <div className={`skeuo-panel ${styles.statCard}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(76, 201, 240, 0.2)', color: 'var(--accent)' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Total Employees</h3>
            <p className={styles.statValue}>{isLoading ? '...' : stats.employees}</p>
          </div>
        </div>
        
        <div className={`skeuo-panel ${styles.statCard}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(255, 209, 102, 0.2)', color: 'var(--warning)' }}>
            <Calendar size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Pending Leaves</h3>
            <p className={styles.statValue}>0</p>
          </div>
        </div>
      </div>

      <div className={`skeuo-panel ${styles.recentSection}`}>
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <button className="btn btn-primary" onClick={() => window.location.href = '/employees'}>Go to Employees</button>
          <button className="btn btn-outline" onClick={() => alert('Leave requests coming soon!')}>Apply for Leave</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
