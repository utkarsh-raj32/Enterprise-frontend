import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Sidebar.module.css';
import { LayoutDashboard, Users, CalendarDays, Wallet, LogOut, ShieldCheck } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Employees', path: '/employees', icon: <Users size={20} /> },
    { name: 'Leaves', path: '/leaves', icon: <CalendarDays size={20} /> },
    { name: 'Salary', path: '/salary', icon: <Wallet size={20} /> }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <ShieldCheck color="var(--accent)" />
        Enterprise AI
      </div>
      
      <nav className={styles.navLinks}>
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.userProfile}>
        <div className={styles.userInfo}>
          <span className={styles.username}>{user?.username || 'User'}</span>
          <span className={styles.role}>{user?.role || 'EMPLOYEE'}</span>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
