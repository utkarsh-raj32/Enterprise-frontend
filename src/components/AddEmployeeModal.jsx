import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './AddEmployeeModal.module.css';
import { X } from 'lucide-react';

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
  const { token } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    empCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    joiningDate: new Date().toISOString().split('T')[0],
    departmentId: '',
    salary: '0',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (isOpen) {
      // Fetch departments when modal opens
      fetch('https://enterprise-7txq.onrender.com/api/v1/departments', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setDepartments(data.data);
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, departmentId: data.data[0].id }));
          }
        }
      })
      .catch(err => console.error(err));
    }
  }, [isOpen, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('https://enterprise-7txq.onrender.com/api/v1/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          departmentId: parseInt(formData.departmentId),
          salary: parseFloat(formData.salary)
        })
      });

      const data = await res.json();
      if (res.ok) {
        onEmployeeAdded();
        onClose();
      } else {
        setError(data.message || 'Failed to create employee');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`skeuo-panel ${styles.modalContent}`}>
        <div className={styles.modalHeader}>
          <h2>Add New Employee</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {error && <div className={styles.error} style={{ marginBottom: '16px', padding: '12px', background: 'rgba(239, 71, 111, 0.1)', border: '1px solid var(--danger)', borderRadius: '6px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Employee Code</label>
              <input type="text" name="empCode" value={formData.empCode} onChange={handleChange} className="input-field" placeholder="EMP-001" required />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="john@enterprise.com" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Designation</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="input-field" placeholder="Software Engineer" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Department</label>
              <select name="departmentId" value={formData.departmentId} onChange={handleChange} className="input-field" required>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name} ({dept.deptCode})</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input-field" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Annual Salary</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="input-field" required />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
