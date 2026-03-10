import React from 'react';
import { Skeleton } from '@mui/material';
import "./dashboardSkeleton.css"
const DashboardSkeleton: React.FC = () => {
  return (
    <div style={{ padding: '24px', width: '90%', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Skeleton variant="text" width={200} height={48} />
        <Skeleton variant="rounded" width={180} height={40} />
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} style={{ 
            padding: '16px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px',
            backgroundColor: 'var(--bg-card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Skeleton variant="circular" width={40} height={40} style={{ marginRight: '16px' }} />
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" height={32} />
              </div>
            </div>
            <Skeleton variant="rounded" width="100%" height={6} />
          </div>
        ))}
      </div>

      {/* Appointments and Chart */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        {/* Appointments Today */}
        <div style={{ 
          padding: '16px', 
          border: '1px solid var(--border-color)', 
          borderRadius: '8px',
          backgroundColor: 'var(--bg-card)'
        }}>
          <Skeleton variant="text" width={200} height={32} style={{ marginBottom: '16px' }} />
          
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '8px 0',
              borderBottom: item < 5 ? '1px solid var(--border-color)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Skeleton variant="circular" width={40} height={40} />
                <div>
                  <Skeleton variant="text" width={150} />
                  <Skeleton variant="text" width={100} />
                </div>
              </div>
              <Skeleton variant="rounded" width={80} height={32} />
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ 
          padding: '16px', 
          border: '1px solid var(--border-color)', 
          borderRadius: '8px',
          backgroundColor: 'var(--bg-card)',
          height: '90%'
        }}>
          <Skeleton variant="text" width={180} height={32} style={{ marginBottom: '16px' }} />
          
          {/* Barres du graphique */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'center', 
            gap: '8px', 
            height: '200px',
            marginTop: '32px'
          }}>
            {[40, 65, 80, 55, 70, 45, 60, 75, 50, 85, 55, 70].map((height, i) => (
              <Skeleton 
                key={i} 
                variant="rounded" 
                width={20} 
                height={height} 
                style={{ 
                  borderRadius: '4px 4px 0 0',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} 
              />
            ))}
          </div>

          {/* Légende */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton variant="circular" width={12} height={12} />
              <Skeleton variant="text" width={60} height={16} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton variant="circular" width={12} height={12} />
              <Skeleton variant="text" width={60} height={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--border-color)', 
        borderRadius: '8px',
        backgroundColor: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Skeleton variant="text" width={200} height={32} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Skeleton variant="rounded" width={80} height={32} />
            <Skeleton variant="rounded" width={80} height={32} />
          </div>
        </div>

        {/* Grille des créneaux */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px' 
        }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} style={{ 
              padding: '16px', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px',
              backgroundColor: 'var(--bg-card)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="rounded" width={60} height={20} />
              </div>
              
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

              <Skeleton variant="rounded" width="100%" height={8} style={{ marginBottom: '16px' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="rounded" width={80} height={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardSkeleton;