import React from 'react';
import { Skeleton } from '@mui/material';
import "./appointementSkeleton.css"
const AppointmentsPageSkeleton: React.FC = () => {
  return (
    <div className="appointments-page print-area" style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', width: '90%' }}>
      {/* Header */}
      <header className="p-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width={150} height={32} />
          </div>
          <Skeleton variant="rounded" width={300} height={48} sx={{ borderRadius: '8px' }} />
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: '6px' }} />
          <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: '6px' }} />
        </div>
      </header>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} style={{ 
            padding: '20px', 
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Skeleton variant="circular" width={48} height={48} />
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="80%" height={32} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filters-section" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        marginBottom: '0px'
      }}>
        <div className="search-box" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          padding: '8px 16px',
          backgroundColor: 'var(--bg-main)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          width: '300px'
        }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="100%" height={24} />
        </div>

        <div className="filter-group" style={{ display: 'flex', gap: '12px' }}>
          <div className="filter-select" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            width: '200px'
          }}>
            <Skeleton variant="circular" width={18} height={18} />
            <Skeleton variant="text" width="100%" height={24} />
          </div>

          <div className="filter-select" style={{ 
            padding: '8px 16px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            width: '150px'
          }}>
            <Skeleton variant="text" width="100%" height={24} />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="main-content" style={{ 
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        {/* Table Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 2fr 1.5fr 2fr 1fr 80px',
          padding: '16px',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-main)'
        }}>
          <Skeleton variant="text" width={60} height={16} />
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={120} height={16} />
          <Skeleton variant="text" width={60} height={16} />
          <Skeleton variant="text" width={40} height={16} />
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 2fr 1.5fr 2fr 1fr 80px',
            padding: '16px',
            borderBottom: item < 8 ? '1px solid var(--border-color)' : 'none',
            alignItems: 'center'
          }}>
            {/* Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={60} height={24} />
            </div>

            {/* Client */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Skeleton variant="circular" width={40} height={40} />
              <div>
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={80} height={16} />
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="circular" width={28} height={28} />
            </div>

            {/* Service */}
            <div>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={80} height={16} />
            </div>

            {/* Status */}
            <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: '20px' }} />

            {/* Actions */}
            <Skeleton variant="circular" width={32} height={32} />
          </div>
        ))}
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
          <div>
            <Skeleton variant="circular" width={36} height={36} />
          </div>

          <div className="pagination-pages" style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((page) => (
              <Skeleton key={page} variant="circular" width={36} height={36} />
            ))}
          </div>

          <div>
            <Skeleton variant="circular" width={36} height={36} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
        
        .MuiSkeleton-root {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AppointmentsPageSkeleton;