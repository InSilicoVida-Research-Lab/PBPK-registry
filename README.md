# PBPK Model Registry

A React and TypeScript dashboard for PBPK models deployed with the `wasm-pk`
platform. The UI follows the same academic visual theme as
`PBPK-BoilerPlate-UI`.

## What It Shows

The registry discovers deployed models by querying public forks of:

```text
Crispae/PBPK-BoilerPlate-UI
```

Each fork is shown as a model card with repository metadata, inferred GitHub
Pages URL, optional homepage URL, status, topics, and last update date.

## How A Model Appears

1. Fork `Crispae/PBPK-BoilerPlate-UI`.
2. Replace `model/model.sbml` with the PBPK model.
3. Enable GitHub Pages with GitHub Actions as the source.
4. Use the wasm-pk deployment workflow so the model is published to:

```text
https://<owner>.github.io/<repo>/
```

After GitHub lists the repository as a fork, it will appear in this registry.

## Configuration

The default source is `Crispae/PBPK-BoilerPlate-UI`. To point the registry at
another template repository, set these Vite environment variables:

```bash
VITE_GITHUB_OWNER=Crispae
VITE_TEMPLATE_REPO=PBPK-BoilerPlate-UI
```

The app uses the public GitHub REST API from the browser:

```text
GET https://api.github.com/repos/Crispae/PBPK-BoilerPlate-UI/forks?sort=newest&per_page=100
```

No backend server is required for public repositories.

## Local Development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run preview
```

The static build is written to `dist/`.

## Deployment

`.github/workflows/deploy.yml` builds the registry with Node.js 20 and deploys
`dist/` to GitHub Pages. The workflow sets:

```bash
VITE_BASE=/${{ github.event.repository.name }}/
VITE_GITHUB_OWNER=Crispae
VITE_TEMPLATE_REPO=PBPK-BoilerPlate-UI
```

This keeps asset paths correct for GitHub Pages project-site hosting.
