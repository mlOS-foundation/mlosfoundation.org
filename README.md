# mlosfoundation.org
Official website for MLOS Foundation

## Setup

### Environment Variables

For secure form submissions, set these environment variables in your hosting platform:

- `FORMSUBMIT_ID`: FormSubmit.co activation ID (get from FormSubmit.co)
- `FORMSUBMIT_EMAIL`: Recipient email address

See [SECURITY.md](SECURITY.md) for detailed setup instructions.

## Deployment

### Netlify
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push

### Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### GitHub Pages
GitHub Pages doesn't support serverless functions. Consider using Netlify or Vercel instead.
