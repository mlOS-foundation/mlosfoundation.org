# Cloudflare DNS Setup for Axon Installer

This guide explains how to configure Cloudflare to redirect `axon.mlosfoundation.org` to the install script hosted in the [mlOS-foundation/axon](https://github.com/mlOS-foundation/axon) repository.

## Current Setup

The install script is hosted in the `mlOS-foundation/axon` repository and accessible at:
- `https://raw.githubusercontent.com/mlOS-foundation/axon/main/install.sh`

## Quick Setup (Cloudflare Redirect Rule)

### Step 1: Create DNS Record (Required First!)

**Important**: You must create a DNS record for the subdomain before the redirect rule will work.

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select the `mlosfoundation.org` domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - **Type**: `CNAME`
   - **Name**: `axon`
   - **Target**: `mlosfoundation.org` (or your main domain's A record target)
   - **Proxy status**: ✅ Proxied (orange cloud) - Recommended for SSL
   - **TTL**: Auto
6. Click **Save**

**Wait 1-2 minutes** for DNS to propagate before proceeding to Step 2.

### Step 2: Create Cloudflare Redirect Rule

1. Still in Cloudflare Dashboard for `mlosfoundation.org`
2. Go to **Rules** → **Redirect Rules**
3. Click **Create rule**
4. Configure:
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
5. Click **Deploy**

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

### Step 1: Verify DNS Record in Cloudflare

1. Go to Cloudflare Dashboard → DNS → Records
2. Confirm the `axon` CNAME record exists
3. Verify it shows:
   - Type: CNAME
   - Name: axon
   - Content: mlosfoundation.org
   - Proxy status: ✅ Proxied (orange cloud)
   - Status: Active

### Step 2: Check DNS Propagation

DNS propagation can take 5-60 minutes (sometimes up to 24 hours globally).

```bash
# Check with Cloudflare's DNS (1.1.1.1) - should work fastest
dig @1.1.1.1 axon.mlosfoundation.org +short

# Check with Google's DNS (8.8.8.8)
dig @8.8.8.8 axon.mlosfoundation.org +short

# Check with your local DNS
nslookup axon.mlosfoundation.org

# If using Cloudflare proxy, you should see Cloudflare IPs (e.g., 104.x.x.x or 172.x.x.x)
```

**Note**: If DNS doesn't resolve yet, wait a few more minutes and try again.

### Step 3: Test HTTPS Redirect

Once DNS resolves:

```bash
# Test redirect (should show 302 status)
curl -I https://axon.mlosfoundation.org

# Test actual content (should show install.sh script)
curl -sSL https://axon.mlosfoundation.org | head -20
```

### Step 4: Test Installation

```bash
# Full installation test
curl -sSL axon.mlosfoundation.org | sh
```

**Note**: `ping` will often fail for Cloudflare-proxied domains because Cloudflare blocks ICMP. This is normal and doesn't indicate a problem. Use `curl` or `dig` instead.

## Troubleshooting

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

- ✅ HTTPS is enforced via Cloudflare
- ✅ Script is served with proper content-type headers
- ✅ No sensitive data in the script
- ✅ Downloads are from GitHub (HTTPS)

## Support

If you encounter issues:
1. Check Cloudflare redirect rules
2. Verify install.sh exists in axon repository: https://github.com/mlOS-foundation/axon
3. Test GitHub raw URL directly
4. Check Cloudflare rule deployment status
