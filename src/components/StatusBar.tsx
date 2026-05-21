import type { RegistryStatus } from '../types';

interface StatusBarProps {
  message: string;
  type: RegistryStatus;
  showSpinner?: boolean;
}

export function StatusBar({ message, type, showSpinner = false }: StatusBarProps) {
  return (
    <div className={`px-3.5 py-2 mb-5 text-xs border-l-4 bg-bg-light ${
      type === 'loading' ? 'border-warning bg-warning-bg text-warning' :
      type === 'success' ? 'border-success bg-success-bg text-success' :
      'border-error bg-error-bg text-error'
    }`}>
      {showSpinner && <span className="spinner" />}
      {message}
    </div>
  );
}
