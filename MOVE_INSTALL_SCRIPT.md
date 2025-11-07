# Moving Install Script to Axon Repository

The install script should be moved from `mlosfoundation.org` to the `mlOS-foundation/axon` repository.

## Steps

### 1. Copy install.sh to Axon Repo

```bash
# From mlosfoundation.org repo
cp install.sh /path/to/axon-repo/install.sh
```

### 2. Add to Axon Repository

1. Add `install.sh` to the root of the `mlOS-foundation/axon` repository
2. Commit and push:
   ```bash
   cd /path/to/axon-repo
   git add install.sh
   git commit -m "feat: Add installer script for one-line installation"
   git push
   ```

### 3. Verify GitHub URL

The script should be accessible at:
- `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh`

Or if using releases:
- `https://github.com/mlOS-foundation/axon/releases/latest/download/install.sh`

### 4. Configure Cloudflare Redirect

1. Go to Cloudflare Dashboard → Rules → Redirect Rules
2. Create rule:
   - **If**: Hostname equals `axon.mlosfoundation.org`
   - **Then**: Redirect to `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh`
   - **Status**: 302 (Temporary)

### 5. Test

```bash
# Test GitHub URL
curl -sSL https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh | head -20

# Test subdomain (after Cloudflare setup)
curl -sSL axon.mlosfoundation.org | head -20
```

## Benefits

- ✅ Script lives with the project it installs
- ✅ Version control with Axon releases
- ✅ No website deployment needed for script updates
- ✅ Simpler infrastructure (just Cloudflare redirect)

## Remove from mlosfoundation.org

After moving to axon repo, you can remove:
- `install.sh` (move to axon repo)
- `install-test.sh` (move to axon repo or keep for testing)
- `INSTALL.md` (update to point to axon repo)
- `CLOUDFLARE_SETUP.md` (keep, but update references)

