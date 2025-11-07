# Install Script Migration Status

✅ **COMPLETED**: The install script has been moved from `mlosfoundation.org` to the `mlOS-foundation/axon` repository.

## Current Status

- ✅ Install script (`install.sh`) is now in [mlOS-foundation/axon](https://github.com/mlOS-foundation/axon)
- ✅ Install test script (`install-test.sh`) is now in [mlOS-foundation/axon](https://github.com/mlOS-foundation/axon)
- ✅ Cloudflare redirect configured: `axon.mlosfoundation.org` → GitHub raw content
- ✅ Website documentation updated to reference the new location

## Installation Command

Users can now install Axon using:

```bash
curl -sSL axon.mlosfoundation.org | sh
```

This redirects to: `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh`

## Benefits

- ✅ Script lives with the project it installs
- ✅ Version control with Axon releases
- ✅ No website deployment needed for script updates
- ✅ Simpler infrastructure (just Cloudflare redirect)
- ✅ Better organization and maintainability

## Documentation

- [INSTALL.md](INSTALL.md) - Installation instructions
- [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) - Cloudflare configuration guide

## Repository Links

- **Axon Repository**: https://github.com/mlOS-foundation/axon
- **Install Script**: https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh
- **Website Repository**: https://github.com/mlOS-foundation/mlosfoundation.org
