import React from 'react';
import { Skeleton } from '@mui/material';
import { Calendar } from 'lucide-react';
import "./creneauxSkeleton.css"
const CreneauxPageSkeleton: React.FC = () => {
  return (
    <div className="creneaux-page" style={{ padding: '24px', width: '90%', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '24px' 
      }}>
        <Calendar size={20} className="header-icon" style={{ color: 'var(--text-secondary)' }} />
        <Skeleton variant="text" width={200} height={32} />
      </div>

      {/* Slots Card */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        {/* Header avec date picker */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Skeleton variant="text" width={180} height={28} />
          <Skeleton variant="rounded" width={200} height={40} sx={{ borderRadius: '8px' }} />
        </div>

        {/* Stats cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={{
              padding: '16px',
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="text" width="60%" height={20} />
              </div>
              <Skeleton variant="text" width="80%" height={32} />
              <Skeleton variant="text" width="40%" height={16} />
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: 'var(--bg-main)',
          borderRadius: '8px'
        }}>
          <Skeleton variant="rounded" width={200} height={40} sx={{ borderRadius: '6px' }} />
          <Skeleton variant="rounded" width={150} height={40} sx={{ borderRadius: '6px' }} />
          <Skeleton variant="rounded" width={150} height={40} sx={{ borderRadius: '6px' }} />
        </div>

        {/* Grille des créneaux */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} style={{
              padding: '16px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-card)'
            }}>
              {/* Heure */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="rounded" width={60} height={20} sx={{ borderRadius: '12px' }} />
              </div>

              {/* Capacité et restant */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <Skeleton variant="text" width={60} height={16} />
                  <Skeleton variant="text" width={40} height={24} />
                </div>
                <div>
                  <Skeleton variant="text" width={60} height={16} />
                  <Skeleton variant="text" width={40} height={24} />
                </div>
              </div>

              {/* Barre de progression */}
              <Skeleton variant="rounded" width="100%" height={8} sx={{ borderRadius: '4px', mb: 2 }} />

              {/* Pourcentage */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" width={60} height={16} />
                <Skeleton variant="rounded" width={80} height={32} sx={{ borderRadius: '6px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0'
      }}>
        <div className="pagination-select" style={{ width: '120px' }}>
          <Skeleton variant="rounded" width="100%" height={36} sx={{ borderRadius: '6px' }} />
        </div>

        <div className="pagination-info" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Previous button */}
          <Skeleton variant="circular" width={36} height={36} />

          {/* Page numbers */}
          <div className="pagination-pages" style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((page) => (
              <Skeleton key={page} variant="circular" width={36} height={36} />
            ))}
          </div>

          {/* Next button */}
          <Skeleton variant="circular" width={36} height={36} />
        </div>
      </div>
    </div>
  );
};

export default CreneauxPageSkeleton;