import React from 'react';
import { Skeleton } from '@mui/material';
import "./sheduleManagerSkeleton.css"
const ScheduleManagerSkeleton: React.FC = () => {
  return (
    <div className="shedule-manager-page" style={{ padding: '24px', width: '90%', margin: '0 auto' }}>
      {/* Header */}
      <div className="shedule-manager-page-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={250} height={36} />
      </div>

      {/* Schedule Manager Skeleton */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        {/* Header avec titre et bouton */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="rounded" width={120} height={40} sx={{ borderRadius: '8px' }} />
        </div>

        {/* Légende */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '20px',
          padding: '12px',
          backgroundColor: 'var(--bg-main)',
          borderRadius: '8px'
        }}>
          {[1, 2].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton variant="circular" width={12} height={12} />
              <Skeleton variant="text" width={80} height={16} />
            </div>
          ))}
        </div>

        {/* Tableau des horaires */}
        <div style={{
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          {/* En-tête du tableau */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 0.8fr 1fr 1fr 1.2fr 0.8fr',
            padding: '16px',
            backgroundColor: 'var(--bg-main)',
            borderBottom: '1px solid var(--border-color)'
          }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} variant="text" width={80} height={16} />
            ))}
          </div>

          {/* Lignes du tableau */}
          {[1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div key={row} style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 0.8fr 1fr 1fr 1.2fr 0.8fr',
              padding: '16px',
              alignItems: 'center',
              borderBottom: row < 7 ? '1px solid var(--border-color)' : 'none'
            }}>
              {/* Jour */}
              <Skeleton variant="text" width={80} height={20} />
              
              {/* Toggle */}
              <Skeleton variant="rounded" width={44} height={24} sx={{ borderRadius: '12px' }} />
              
              {/* Heure début */}
              <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: '6px' }} />
              
              {/* Heure fin */}
              <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: '6px' }} />
              
              {/* Capacité */}
              <Skeleton variant="rounded" width={80} height={36} sx={{ borderRadius: '6px' }} />
              
              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
              </div>
            </div>
          ))}
        </div>

        {/* Outil de copie */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          backgroundColor: 'var(--bg-main)',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <Skeleton variant="text" width={120} height={16} />
          <Skeleton variant="rounded" width={150} height={36} sx={{ borderRadius: '6px' }} />
          <Skeleton variant="rounded" width={140} height={36} sx={{ borderRadius: '6px' }} />
        </div>

        {/* Résumé et bouton de sauvegarde */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[1, 2].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Skeleton variant="text" width={80} height={16} />
                <Skeleton variant="text" width={40} height={24} />
              </div>
            ))}
          </div>
          <Skeleton variant="rounded" width={150} height={44} sx={{ borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagerSkeleton;