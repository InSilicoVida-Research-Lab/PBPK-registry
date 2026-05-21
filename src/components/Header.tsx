import { registrySource } from '../api/github';

export function Header() {
  return (
    <div className="text-center mb-8 pb-4 border-b-2 border-primary">
      <p className="text-xs text-text-muted mb-2 uppercase tracking-[0.2em]">
        wasm-pk platform
      </p>
      <h1 className="text-2xl font-normal text-primary mb-1.5 uppercase tracking-wide">
        PBPK Model Registry
      </h1>
      <p className="text-sm text-secondary italic">
        Dashboard of pharmacokinetic models deployed from the PBPK boilerplate.
      </p>
      <p className="text-xs text-text-muted mt-1.5 font-mono">
        Source: {registrySource.owner}/{registrySource.templateRepo} forks
      </p>
    </div>
  );
}
