# Cloudflare DNS Setup for Axon Installer

This guide explains how to configure Cloudflare DNS to enable `axon.mlosfoundation.org` to redirect to the install script.

## Quick Setup (CNAME Method - Recommended)

### Step 1: Add CNAME Record in Cloudflare

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select the `mlosfoundation.org` domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - **Type**: `CNAME`
   - **Name**: `axon`
   - **Target**: `mlosfoundation.org` (or your Netlify domain like `mlosfoundation.org.netlify.app`)
   - **Proxy status**: 
     - **Proxied** (orange cloud) - Recommended for SSL/CDN benefits
     - **DNS only** (gray cloud) - If you need direct DNS resolution
   - **TTL**: Auto
6. Click **Save**

### Step 2: Verify Netlify Configuration

Ensure `netlify.toml` has the redirect rule (already configured):

```toml
[[redirects]]
  from = "https://axon.mlosfoundation.org/*"
  to = "/install.sh"
  status = 200
  force = true
```

### Step 3: Test

Wait a few minutes for DNS propagation, then test:

```bash
curl -sSL axon.mlosfoundation.org | sh
```

## Alternative: Cloudflare Redirect Rules

If CNAME doesn't work or you prefer Cloudflare-level redirects:

### Step 1: Create Redirect Rule

1. Go to Cloudflare Dashboard → **Rules** → **Redirect Rules**
2. Click **Create rule**
3. Configure:
   - **Rule name**: `Axon Installer Redirect`
   - **If**: 
     - Field: `Hostname`
     - Operator: `equals`
     - Value: `axon.mlosfoundation.org`
   - **Then**:
     - Action: `Redirect`
     - Status code: `301` (Permanent) or `302` (Temporary)
     - Destination URL: `https://mlosfoundation.org/install.sh`
     - Preserve query string: `No`
4. Click **Deploy**

### Step 2: Test

```bash
curl -sSL axon.mlosfoundation.org | sh
```

## DNS Propagation

- **CNAME records**: Usually propagate within 1-5 minutes
- **Cloudflare proxy**: Instant (if using proxied CNAME)
- **DNS only**: May take up to 24 hours globally

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

1. **Check Netlify logs**: View deployment logs in Netlify dashboard
2. **Verify netlify.toml**: Ensure redirect rule is correct
3. **Test main domain**: `curl -I https://mlosfoundation.org/install.sh` should work
4. **Check SSL**: Ensure SSL certificate is issued for subdomain

### SSL Certificate Issues

If using proxied CNAME:
- Cloudflare automatically provides SSL
- May take a few minutes to provision

If using DNS-only CNAME:
- Netlify needs to issue SSL certificate
- Add subdomain in Netlify → Domain settings → Custom domains
- Wait for SSL certificate provisioning

## Alternative Subdomain

You can also use `install.axon.mlosfoundation.org`:

1. Add CNAME: `install.axon` → `mlosfoundation.org`
2. Netlify redirect is already configured in `netlify.toml`

## Testing Commands

```bash
# Test main domain
curl -sSL https://mlosfoundation.org/install.sh | head -20

# Test subdomain (after DNS setup)
curl -sSL axon.mlosfoundation.org | head -20

# Test with version
AXON_VERSION=1.0.0 curl -sSL axon.mlosfoundation.org | sh
```

## Security Considerations

- ✅ HTTPS is enforced via Cloudflare/Netlify
- ✅ Script is served with proper content-type headers
- ✅ No sensitive data in the script
- ✅ Downloads are from GitHub (HTTPS)

## Support

If you encounter issues:
1. Check Cloudflare DNS records
2. Check Netlify deployment logs
3. Verify `netlify.toml` configuration
4. Test with main domain first: `https://mlosfoundation.org/install.sh`

