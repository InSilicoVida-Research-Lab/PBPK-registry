import type { RegistryStats } from '../types';

interface SummaryStatsProps {
  stats: RegistryStats;
}

export function SummaryStats({ stats }: SummaryStatsProps) {
  const items = [
    { label: 'Total models', value: stats.totalModels },
    { label: 'Active', value: stats.activeModels },
    { label: 'Archived', value: stats.archivedModels },
    { label: 'Updated in 30 days', value: stats.recentlyUpdated },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mb-5 max-lg:grid-cols-2">
      {items.map(item => (
        <div key={item.label} className="panel">
          <div className="panel-body-padded">
            <div className="text-2xl text-primary font-mono leading-none">
              {item.value.toLocaleString()}
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wide mt-2">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
