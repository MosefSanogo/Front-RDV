import React from 'react';
import { Skeleton } from '@mui/material';
import "./statisticSkeleton.css"
const StatisticsPageSkeletonSimple: React.FC = () => {
  return (
    <div className="statistics-page" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={300} height={20} />
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Skeleton variant="rounded" width={200} height={40} />
        <Skeleton variant="rounded" width={200} height={40} />
        <Skeleton variant="rounded" width={180} height={40} />
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="rounded" width="100%" height={200} />
          </div>
        ))}
      </div>

      {/* Grand graphique */}
      <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '24px' }}>
        <Skeleton variant="text" width={160} height={30} />
        <Skeleton variant="rounded" width="100%" height={200} />
      </div>

      {/* Alertes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} variant="rounded" width="100%" height={60} />
        ))}
      </div>

      {/* Tableau */}
      <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
        <Skeleton variant="text" width={160} height={30} />
        <Skeleton variant="rounded" width="100%" height={200} />
      </div>
    </div>
  );
};
export default StatisticsPageSkeletonSimple;