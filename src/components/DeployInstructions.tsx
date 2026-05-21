import { registrySource } from '../api/github';

const BOILERPLATE_URL = `https://github.com/${registrySource.owner}/${registrySource.templateRepo}`;
const WASM_PK_URL = 'https://github.com/Crispae/wasm-pk';

const deploySteps = [
  `Fork ${registrySource.owner}/${registrySource.templateRepo} on GitHub.`,
  'Replace model/model.sbml with your PBPK SBML model.',
  'In repository Settings → Pages, set the source to GitHub Actions.',
  'Push to main. The workflow compiles SBML to WebAssembly and publishes a static React site to GitHub Pages.',
  'Open the deployed site in your browser at https://<owner>.github.io/<repo>/ to run simulations. The fork will appear in this registry once GitHub lists it.',
];

export function DeployInstructions() {
  return (
    <aside className="panel h-fit lg:sticky lg:top-5">
      <div className="panel-header">
        <h2 className="panel-title">Deploy in Browser</h2>
      </div>
      <div className="panel-body-padded">
        <p className="text-xs text-text-muted mb-4 leading-relaxed">
          Publish a PBPK model as an interactive web simulator using the wasm-pk platform and GitHub Pages.
        </p>
        <ol className="grid gap-3 text-xs text-text-dark list-decimal list-inside">
          {deploySteps.map((step, index) => (
            <li key={index} className="leading-relaxed pl-1">
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="panel-footer flex flex-col gap-2 text-xs">
        <a href={BOILERPLATE_URL} target="_blank" rel="noreferrer" className="text-primary hover:underline">
          Boilerplate repository
        </a>
        <a href={WASM_PK_URL} target="_blank" rel="noreferrer" className="text-primary hover:underline">
          wasm-pk platform
        </a>
      </div>
    </aside>
  );
}
