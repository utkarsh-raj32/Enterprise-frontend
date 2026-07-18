import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './AddEmployeeModal.module.css'; // Reusing modal CSS
import { X, FileText } from 'lucide-react';

const SalaryModal = ({ isOpen, onClose, employee }) => {
  const { token } = useAuth();
  const [structure, setStructure] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    basicPay: 0,
    hra: 0,
    lta: 0,
    specialAllowance: 0,
    providentFund: 0,
    taxDeduction: 0,
    otherDeductions: 0
  });

  useEffect(() => {
    if (isOpen && employee) {
      // Fetch existing structure if any
      fetch(`https://enterprise-7txq.onrender.com/api/v1/salary/structure/${employee.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setStructure(data.data);
          setFormData({
            basicPay: data.data.basicPay,
            hra: data.data.hra,
            lta: data.data.lta,
            specialAllowance: data.data.specialAllowance,
            providentFund: data.data.providentFund,
            taxDeduction: data.data.taxDeduction,
            otherDeductions: data.data.otherDeductions
          });
        }
      })
      .catch(err => console.error(err));
    }
  }, [isOpen, employee, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveStructure = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const endpoint = structure 
      ? `https://enterprise-7txq.onrender.com/api/v1/salary/structure/${structure.id}`
      : `https://enterprise-7txq.onrender.com/api/v1/salary/structure`;
      
    const method = structure ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          employeeId: employee.id,
          effectiveDate: new Date().toISOString().split('T')[0],
          ...formData
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Salary structure saved successfully!');
        setStructure(data.data);
      } else {
        setError(data.message || 'Failed to save salary structure');
      }
    } catch (err) {
      setError('A network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneratePayslip = async () => {
    setIsGenerating(true);
    setError(null);
    setSuccess(null);
    
    const now = new Date();
    try {
      const res = await fetch('https://enterprise-7txq.onrender.com/api/v1/salary/payslip/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          employeeId: employee.id,
          month: now.getMonth() + 1,
          year: now.getFullYear()
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(`Payslip #${data.data.payslipNumber} generated for ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}!`);
      } else {
        setError(data.message || 'Failed to generate payslip');
      }
    } catch (err) {
      setError('A network error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`skeuo-panel ${styles.modalContent}`}>
        <div className={styles.modalHeader}>
          <h2>Payroll: {employee?.firstName} {employee?.lastName}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {error && <div className={styles.error} style={{ marginBottom: '16px', padding: '12px', background: 'rgba(239, 71, 111, 0.1)', border: '1px solid var(--danger)', borderRadius: '6px' }}>{error}</div>}
        {success && <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(6, 214, 160, 0.1)', border: '1px solid var(--success)', borderRadius: '6px', color: 'var(--success)', fontWeight: 500 }}>{success}</div>}

        <form onSubmit={handleSaveStructure}>
          <h3 style={{ marginBottom: '16px', color: 'var(--text-main)', fontSize: '1.1rem' }}>Earnings (Monthly)</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Basic Pay</label>
              <input type="number" name="basicPay" value={formData.basicPay} onChange={handleChange} className="input-field" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>HRA</label>
              <input type="number" name="hra" value={formData.hra} onChange={handleChange} className="input-field" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>LTA</label>
              <input type="number" name="lta" value={formData.lta} onChange={handleChange} className="input-field" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Special Allowance</label>
              <input type="number" name="specialAllowance" value={formData.specialAllowance} onChange={handleChange} className="input-field" required />
            </div>
          </div>

          <h3 style={{ margin: '24px 0 16px', color: 'var(--text-main)', fontSize: '1.1rem' }}>Deductions (Monthly)</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Provident Fund</label>
              <input type="number" name="providentFund" value={formData.providentFund} onChange={handleChange} className="input-field" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tax Deduction (TDS)</label>
              <input type="number" name="taxDeduction" value={formData.taxDeduction} onChange={handleChange} className="input-field" required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Other Deductions</label>
              <input type="number" name="otherDeductions" value={formData.otherDeductions} onChange={handleChange} className="input-field" required />
            </div>
          </div>

          <div className={styles.actions} style={{ justifyContent: 'space-between' }}>
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ color: 'var(--accent)', borderColor: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={handleGeneratePayslip}
              disabled={isGenerating || !structure}
            >
              <FileText size={18} />
              {isGenerating ? 'Generating...' : 'Generate Payslip'}
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>Close</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Structure'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalaryModal;
