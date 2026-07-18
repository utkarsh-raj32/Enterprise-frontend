import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';
import { CalendarDays, Plus } from 'lucide-react';
import ApplyLeaveModal from '../components/ApplyLeaveModal';

const Leaves = () => {
  const { token, user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeaves = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://enterprise-7txq.onrender.com/api/v1/leaves', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setLeaves(data.data.content || data.data);
      }
    } catch (e) {
      console.error("Failed to fetch leaves:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await fetch(`https://enterprise-7txq.onrender.com/api/v1/leaves/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comments: 'Approved via dashboard' })
      });
      fetchLeaves();
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`https://enterprise-7txq.onrender.com/api/v1/leaves/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comments: 'Rejected via dashboard' })
      });
      fetchLeaves();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Leave Management</h1>
            <p>Track and manage employee time off.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Apply for Leave
          </button>
        </div>
      </header>

      <ApplyLeaveModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLeaveApplied={fetchLeaves}
      />

      <div className="skeuo-panel" style={{ padding: '24px' }}>
        {isLoading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading leave requests...</p>
        ) : leaves.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No leave requests found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Dates</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(leave => (
                  <tr key={leave.id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>{leave.employeeName}</td>
                    <td>{leave.leaveType?.name || 'Unknown'}</td>
                    <td>{leave.startDate} to {leave.endDate}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className={`badge ${leave.status === 'APPROVED' ? 'badge-success' : leave.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td>
                      {leave.status === 'PENDING' && user?.role === 'ADMIN' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--success)', borderColor: 'var(--success)' }}
                            onClick={() => handleApprove(leave.id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}
                            onClick={() => handleReject(leave.id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
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

export default Leaves;
