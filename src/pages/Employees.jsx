import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css'; // Reusing the same grid layout logic
import { Users, UserPlus, Search } from 'lucide-react';

const Employees = () => {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('https://enterprise-7txq.onrender.com/api/v1/employees', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.data) {
          setEmployees(data.data.content || data.data); // Handle both paginated and non-paginated
        }
      } catch (e) {
        console.error("Failed to fetch employees:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, [token]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Employees Directory</h1>
            <p>Manage all enterprise employees and roles.</p>
          </div>
          <button className="btn btn-primary">
            <UserPlus size={18} /> Add Employee
          </button>
        </div>
      </header>

      <div className="skeuo-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search employees by name or email..." 
              style={{ paddingLeft: '48px' }}
            />
          </div>
          <button className="btn btn-outline">Filter</button>
        </div>

        {isLoading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No employees found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>#{emp.id}</td>
                    <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>{emp.firstName} {emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td><span className={`badge ${emp.role === 'ADMIN' ? 'badge-danger' : emp.role === 'HR' ? 'badge-warning' : 'badge-success'}`}>{emp.role}</span></td>
                    <td>{emp.department?.name || 'N/A'}</td>
                    <td>
                      <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
