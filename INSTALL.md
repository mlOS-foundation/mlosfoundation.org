# Axon CLI Installation

The Axon CLI installer script is hosted in the [mlOS-foundation/axon](https://github.com/mlOS-foundation/axon) repository.

## Quick Install

```bash
curl -sSL axon.mlosfoundation.org | sh
```

This command:
- Automatically detects your OS (Linux/macOS) and architecture (amd64/arm64)
- Downloads the latest Axon release from GitHub
- Installs Axon to `~/.local/bin` (no sudo required)
- Provides instructions to add to your PATH

## How It Works

The installer script is hosted in the Axon repository and served via Cloudflare redirect:

1. **Cloudflare Redirect**: `axon.mlosfoundation.org` → `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh`
2. **Auto-detection**: Detects OS and architecture
3. **Version Management**: Fetches latest version from GitHub releases
4. **Installation**: Downloads and installs the appropriate binary

## Customization

```bash
# Install specific version
AXON_VERSION=1.0.0 curl -sSL axon.mlosfoundation.org | sh

# Install to custom directory
AXON_INSTALL_DIR=/usr/local/bin curl -sSL axon.mlosfoundation.org | sh
```

## Requirements

- **OS**: Linux or macOS
- **Architecture**: amd64 (x86_64) or arm64 (aarch64)
- **Dependencies**: `curl`, `tar`, `gzip`
- **GitHub Release**: Requires at least v1.0.0 release on [mlOS-foundation/axon](https://github.com/mlOS-foundation/axon)

## GitHub Release Format

The installer expects GitHub releases with binaries named:

```
axon_<VERSION>_<OS>_<ARCH>.tar.gz
```

Examples:
- `axon_1.0.0_darwin_amd64.tar.gz`
- `axon_1.0.0_linux_arm64.tar.gz`
- `axon_1.0.0_darwin_arm64.tar.gz`
- `axon_1.0.0_linux_amd64.tar.gz`

The archive should contain the `axon` binary at the root.

## DNS Configuration (Cloudflare)

The install script is hosted in the `mlOS-foundation/axon` repository. To use `axon.mlosfoundation.org`, configure a Cloudflare Redirect Rule:

1. Go to Cloudflare Dashboard → **Rules** → **Redirect Rules**
2. Create a new rule:
   - **Name**: Axon Installer Redirect
   - **If**: Hostname equals `axon.mlosfoundation.org`
   - **Then**: Redirect to `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh` (302)
3. Deploy the rule

See [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) for detailed instructions.

## Security

- Uses HTTPS for all downloads
- Verifies binary exists before installation
- Uses temporary directories that are cleaned up
- No sudo/root required (installs to user directory by default)

## Troubleshooting

### Installation fails

1. Check if the release exists on GitHub: https://github.com/mlOS-foundation/axon/releases
2. Verify your OS/architecture is supported
3. Ensure you have internet connectivity
4. Check that `curl` and `tar` are installed

### Binary not found in PATH

Add the install directory to your PATH:

```bash
# For bash
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.bashrc
source ~/.bashrc

# For zsh
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.zshrc
source ~/.zshrc
```

### Version not found

If a specific version doesn't exist, the installer will fall back to the latest version or show an error.

## Development

The installer script is maintained in the [mlOS-foundation/axon](https://github.com/mlOS-foundation/axon) repository.

To test locally:

```bash
# Test from GitHub
curl -sSL https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh | head -20

# Test via redirect (requires Cloudflare setup)
curl -sSL axon.mlosfoundation.org | head -20
```
