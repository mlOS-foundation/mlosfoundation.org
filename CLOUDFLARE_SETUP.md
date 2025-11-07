# Cloudflare DNS Setup for Axon Installer

This guide explains how to configure Cloudflare to redirect `axon.mlosfoundation.org` to the install script hosted in the axon repository.

## Quick Setup (Cloudflare Redirect Rule - Recommended)

**Note**: The install script should be hosted in the `mlOS-foundation/axon` repository, not in the mlosfoundation.org static site.

### Step 1: Host Install Script in Axon Repo

1. Add `install.sh` to the `mlOS-foundation/axon` repository
2. Place it in the root directory or in a `scripts/` directory
3. Ensure it's accessible via GitHub raw content URL:
   - `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh`
   - Or from releases: `https://github.com/mlOS-foundation/axon/releases/latest/download/install.sh`

### Step 2: Create Cloudflare Redirect Rule

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select the `mlosfoundation.org` domain
3. Go to **Rules** → **Redirect Rules**
4. Click **Create rule**
5. Configure:
   - **Rule name**: `Axon Installer Redirect`
   - **If**: 
     - Field: `Hostname`
     - Operator: `equals`
     - Value: `axon.mlosfoundation.org`
   - **Then**:
     - Action: `Redirect`
     - Status code: `302` (Temporary) - Recommended for flexibility
     - Destination URL: `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh`
     - Preserve query string: `No`
6. Click **Deploy**

### Step 3: Test

Wait a few minutes for the rule to propagate, then test:

```bash
curl -sSL axon.mlosfoundation.org | sh
```

## Alternative: Using GitHub Releases

If you prefer to serve from releases (better for versioning):

Redirect to the latest release download URL:

**Destination URL**: `https://github.com/mlOS-foundation/axon/releases/latest/download/install.sh`

This ensures users always get the latest version from releases.

## Why Host in Axon Repo?

- ✅ **Better organization**: Install script belongs with the project it installs
- ✅ **Version control**: Script can be versioned with Axon releases
- ✅ **Simpler**: No need for Netlify redirects or static site hosting
- ✅ **Faster**: Direct redirect from Cloudflare to GitHub
- ✅ **Maintainable**: Script updates don't require website deployment

## Propagation

- **Cloudflare Redirect Rules**: Usually active within 1-2 minutes
- **Global propagation**: Complete within 5-10 minutes

## Verification

Check DNS resolution:

```bash
# Check CNAME record
dig axon.mlosfoundation.org CNAME

# Check if it resolves
nslookup axon.mlosfoundation.org

# Test HTTPS
curl -I https://axon.mlosfoundation.org
```

## Troubleshooting

### Subdomain not resolving

1. **Check DNS record**: Verify CNAME is correct in Cloudflare
2. **Check proxy status**: If using proxied, ensure SSL is enabled
3. **Wait for propagation**: DNS changes can take time
4. **Check Netlify**: Ensure domain is added to Netlify site settings

### Redirect not working

1. **Check Cloudflare rule**: Verify redirect rule is deployed and active
2. **Test destination URL**: `curl -I https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh` should work
3. **Check GitHub**: Ensure install.sh exists in the axon repository
4. **Verify rule order**: Ensure no other rules are conflicting

### GitHub Access Issues

- Ensure the repository is public (or user has access)
- Check that `install.sh` file exists and is accessible
- Verify the raw GitHub URL works in browser

## Testing Commands

```bash
# Test GitHub raw URL (should work immediately)
curl -sSL https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh | head -20

# Test subdomain redirect (after Cloudflare setup)
curl -sSL axon.mlosfoundation.org | head -20

# Test with version
AXON_VERSION=1.0.0 curl -sSL axon.mlosfoundation.org | sh

# Verify redirect is working
curl -I axon.mlosfoundation.org
```

## Security Considerations

- ✅ HTTPS is enforced via Cloudflare/Netlify
- ✅ Script is served with proper content-type headers
- ✅ No sensitive data in the script
- ✅ Downloads are from GitHub (HTTPS)

## Support

If you encounter issues:
1. Check Cloudflare redirect rules
2. Verify install.sh exists in axon repository
3. Test GitHub raw URL directly
4. Check Cloudflare rule deployment status

