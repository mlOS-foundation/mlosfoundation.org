# mlosfoundation.org
Official website for MLOS Foundation

## Setup

### Environment Variables

For secure form submissions, set these environment variables in your hosting platform:

- `FORMSUBMIT_ID`: FormSubmit.co activation ID (get from FormSubmit.co)
- `FORMSUBMIT_EMAIL`: Recipient email address

See [SECURITY.md](SECURITY.md) for detailed setup instructions.

## Deployment

**Important:** You only need ONE hosting platform. Choose based on your preference:

### Option 1: Netlify (Recommended)
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard:
   - `FORMSUBMIT_ID`: Your FormSubmit.co activation ID
   - `FORMSUBMIT_EMAIL`: Recipient email address
3. Deploy automatically on push
4. **Remove** `api/` folder and `vercel.json` (not needed for Netlify)

### Option 2: Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `FORMSUBMIT_ID`: Your FormSubmit.co activation ID
   - `FORMSUBMIT_EMAIL`: Recipient email address
3. Deploy automatically on push
4. **Remove** `netlify/` folder and `netlify.toml` (not needed for Vercel)

### GitHub Pages
GitHub Pages doesn't support serverless functions. You'll need to:
- Switch to Netlify or Vercel, OR
- Use a different form solution (e.g., direct FormSubmit.co with visible ID)

**Note:** The form auto-detects the platform, but you should remove the unused serverless function files to keep the repo clean.
