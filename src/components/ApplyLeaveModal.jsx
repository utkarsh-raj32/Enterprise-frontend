import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './AddEmployeeModal.module.css'; // Reusing the same modal CSS
import { X } from 'lucide-react';

const ApplyLeaveModal = ({ isOpen, onClose, onLeaveApplied }) => {
  const { token, user } = useAuth();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveTypeId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: ''
  });

  useEffect(() => {
    if (isOpen) {
      // Fetch leave types
      fetch('https://enterprise-7txq.onrender.com/api/v1/leaves/types', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setLeaveTypes(data.data);
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, leaveTypeId: data.data[0].id }));
          }
        }
      })
      .catch(err => console.error(err));

      // Fetch employees to select who is applying for leave (since Admin is testing)
      fetch('https://enterprise-7txq.onrender.com/api/v1/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          const emps = data.data.content || data.data;
          setEmployees(emps);
          if (emps.length > 0) {
            setFormData(prev => ({ ...prev, employeeId: emps[0].id }));
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
      const res = await fetch('https://enterprise-7txq.onrender.com/api/v1/leaves/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          employeeId: parseInt(formData.employeeId),
          leaveTypeId: parseInt(formData.leaveTypeId),
          startDate: formData.startDate,
          endDate: formData.endDate,
          reason: formData.reason
        })
      });

      const data = await res.json();
      if (res.ok) {
        onLeaveApplied();
        onClose();
      } else {
        setError(data.message || 'Failed to apply for leave');
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
          <h2>Apply for Leave</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {error && <div className={styles.error} style={{ marginBottom: '16px', padding: '12px', background: 'rgba(239, 71, 111, 0.1)', border: '1px solid var(--danger)', borderRadius: '6px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Employee</label>
              <select name="employeeId" value={formData.employeeId} onChange={handleChange} className="input-field" required>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Leave Type</label>
              <select name="leaveTypeId" value={formData.leaveTypeId} onChange={handleChange} className="input-field" required>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input-field" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input-field" required />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Reason</label>
              <textarea 
                name="reason" 
                value={formData.reason} 
                onChange={handleChange} 
                className="input-field" 
                rows="3" 
                placeholder="Medical reason, vacation, etc." 
                required 
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
