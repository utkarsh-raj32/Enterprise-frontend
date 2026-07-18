import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';
import { Wallet, Settings2, FileText } from 'lucide-react';
import SalaryModal from '../components/SalaryModal';

const Salary = () => {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://enterprise-7txq.onrender.com/api/v1/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setEmployees(data.data.content || data.data);
      }
    } catch (e) {
      console.error("Failed to fetch employees:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [token]);

  const openSalaryModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Payroll & Salary</h1>
            <p>Manage salary structures and generate payslips.</p>
          </div>
        </div>
      </header>

      {selectedEmployee && (
        <SalaryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          employee={selectedEmployee}
        />
      )}

      <div className="skeuo-panel" style={{ padding: '24px' }}>
        {isLoading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading payroll data...</p>
        ) : employees.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No employees found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Base Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>{emp.firstName} {emp.lastName}</td>
                    <td>{emp.department?.name || 'N/A'}</td>
                    <td>{emp.designation}</td>
                    <td>${emp.salary?.toLocaleString() || '0'}</td>
                    <td>
                      <button 
                        className="btn btn-outline" 
                        style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={() => openSalaryModal(emp)}
                      >
                        <Settings2 size={16} /> Manage Payroll
                      </button>
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

export default Salary;
