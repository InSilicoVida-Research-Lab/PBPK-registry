import type { ChangeEvent } from 'react';
import type { RegistryFilters } from '../types';

interface SearchControlsProps {
  filters: RegistryFilters;
  onFiltersChange: (filters: RegistryFilters) => void;
}

export function SearchControls({ filters, onFiltersChange }: SearchControlsProps) {
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, query: event.target.value });
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      status: event.target.value as RegistryFilters['status'],
    });
  };

  return (
    <section className="panel mb-5">
      <div className="panel-header">
        <h2 className="panel-title">Registry Search</h2>
      </div>
      <div className="panel-body-padded">
        <div className="grid grid-cols-[1fr_220px] gap-4 max-lg:grid-cols-1">
          <div className="form-group mb-0 grid-cols-1 gap-1">
            <label htmlFor="model-search">Search deployed models</label>
            <input
              id="model-search"
              type="search"
              value={filters.query}
              onChange={handleQueryChange}
              placeholder="Search by model, owner, description, or topic"
            />
          </div>
          <div className="form-group mb-0 grid-cols-1 gap-1">
            <label htmlFor="model-status">Repository status</label>
            <select id="model-status" value={filters.status} onChange={handleStatusChange}>
              <option value="all">All repositories</option>
              <option value="active">Active only</option>
              <option value="archived">Archived only</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
