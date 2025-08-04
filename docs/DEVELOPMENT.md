# Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the package
npm run build

# Check bundle size
npm run size

# Run linter
npm run lint
```

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

### Automated Workflows

1. **CI Pipeline** (`ci.yml`)

   - Runs on every push to `main` and pull requests
   - Tests against Node.js 18.x and 20.x
   - Runs linting, tests, and bundle size checks
   - Publishes to npm on successful pushes to main (if version doesn't exist)

2. **Release Workflow** (`release.yml`)

   - Triggers when you push a tag (e.g., `v1.0.1`)
   - Runs full test suite
   - Publishes to npm
   - Creates GitHub release with changelog

3. **Version Bump** (`version-bump.yml`)
   - Automatically bumps patch version on pushes to main
   - Creates git tags and GitHub releases
   - Skips documentation-only changes

### Publishing to npm

To publish a new version:

**Manual Release:**

```bash
# Bump version
npm version patch|minor|major

# Push with tag
git push origin main --tags
```

**Automatic Release:**

- Push to main branch (automatically bumps patch version)
- Or push a tag for specific version control

### Required Secrets

Set up these secrets in your GitHub repository:

- `NPM_TOKEN`: Your npm authentication token

## Git Hooks

This project uses Husky to enforce code quality with git hooks:

### Pre-commit Hook

- Runs linting checks
- Performs TypeScript type checking
- Prevents commits with code style issues

### Pre-push Hook

- Runs full test suite
- Performs linting checks
- Builds the package
- Checks bundle size
- Prevents pushing broken code

### Setup

The hooks are automatically installed when you run `npm install`. If you need to reinstall them:

```bash
npm run prepare
```

### Bypassing Hooks (Emergency Only)

If you absolutely need to bypass the hooks (not recommended):

```bash
git commit --no-verify
git push --no-verify
```
