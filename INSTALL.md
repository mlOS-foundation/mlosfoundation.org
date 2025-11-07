# Axon Installer

This directory contains the Axon CLI installer script.

## Installation

### Quick Install

```bash
curl -sSL https://mlosfoundation.org/install.sh | sh
```

Or using the subdomain:

```bash
curl -sSL install.axon.mlos.org | sh
```

### Manual Installation

1. Download the script:
   ```bash
   curl -O https://mlosfoundation.org/install.sh
   ```

2. Make it executable:
   ```bash
   chmod +x install.sh
   ```

3. Run it:
   ```bash
   ./install.sh
   ```

## How It Works

The installer script:

1. **Detects your system**: Automatically detects OS (Linux/macOS) and architecture (amd64/arm64)
2. **Fetches latest version**: Gets the latest release from GitHub (or uses a specific version)
3. **Downloads binary**: Downloads the appropriate binary for your system
4. **Installs to `~/.local/bin`**: Installs Axon to `$HOME/.local/bin` by default
5. **Updates PATH**: Provides instructions to add the install directory to your PATH

## Requirements

- **OS**: Linux or macOS
- **Architecture**: amd64 (x86_64) or arm64 (aarch64)
- **Dependencies**: `curl`, `tar`, `gzip`
- **GitHub Release**: Requires at least v1.0.0 release on [mlOS-foundation/axon](https://github.com/mlOS-foundation/axon)

## Customization

You can customize the installation:

```bash
# Install specific version
AXON_VERSION=1.0.0 curl -sSL https://mlosfoundation.org/install.sh | sh

# Install to custom directory
AXON_INSTALL_DIR=/usr/local/bin curl -sSL https://mlosfoundation.org/install.sh | sh
```

## Testing

Run the test script to verify the installer logic:

```bash
./install-test.sh
```

## GitHub Release Format

The installer expects GitHub releases in this format:

```
axon_<VERSION>_<OS>_<ARCH>.tar.gz
```

Example:
- `axon_1.0.0_darwin_amd64.tar.gz`
- `axon_1.0.0_linux_arm64.tar.gz`

The archive should contain the `axon` binary at the root or in a subdirectory.

## DNS Configuration

To use `install.axon.mlos.org`, configure DNS:

1. Add a CNAME record: `install.axon.mlos.org` → `mlosfoundation.org` (or your Netlify domain)
2. Or add an A record pointing to Netlify's IP addresses
3. Netlify will automatically handle the redirect via `netlify.toml`

## Security

- The script uses HTTPS to download from GitHub
- Verifies the binary exists before installation
- Uses temporary directories that are cleaned up
- Does not require sudo/root access (installs to user directory by default)

## Troubleshooting

### Installation fails

1. Check if the release exists on GitHub
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

To test locally:

```bash
# Test the script logic
bash install-test.sh

# Test actual installation (requires GitHub release)
curl -sSL file://$(pwd)/install.sh | sh
```

