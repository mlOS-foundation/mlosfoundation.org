# Security Configuration for Form Submissions

## Overview

The demo form uses a secure serverless function architecture to keep sensitive credentials (FormSubmit.co activation ID) server-side and out of client-side code.

## Architecture

```
User Browser → Serverless Function → FormSubmit.co → Email
```

The FormSubmit.co activation ID is stored as an environment variable in your hosting platform, never exposed in client-side code.

## Platform Setup

### Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:
   - `FORMSUBMIT_ID`: `446f95bbbfd02acf0ce30f77077f439c`
   - `FORMSUBMIT_EMAIL`: `ishaileshpant@gmail.com`
4. Redeploy your site

The function will be available at: `/.netlify/functions/submit-demo`

### Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `FORMSUBMIT_ID`: `446f95bbbfd02acf0ce30f77077f439c`
   - `FORMSUBMIT_EMAIL`: `ishaileshpant@gmail.com`
4. Redeploy your site

The function will be available at: `/api/submit-demo`

### GitHub Pages (Alternative)

GitHub Pages doesn't support serverless functions directly. Options:

1. **Use Netlify/Vercel**: Deploy your site to Netlify or Vercel instead
2. **External API**: Use a separate API service (AWS Lambda, Google Cloud Functions, etc.)
3. **Keep current approach**: Accept that the ID is visible (FormSubmit.co has rate limiting)

## Security Benefits

✅ **Activation ID Hidden**: Never exposed in client-side code or repository  
✅ **Environment Variables**: Stored securely in hosting platform  
✅ **Server-Side Validation**: Additional validation layer  
✅ **Error Handling**: Better error messages without exposing internals  
✅ **CORS Protection**: Proper CORS headers configured  

## Testing

After setting up environment variables:

1. Fill out the demo form
2. Submit the form
3. Check that you receive the email
4. Verify success message appears

## Troubleshooting

### Form not submitting

1. Check that environment variables are set correctly
2. Verify the serverless function is deployed
3. Check browser console for errors
4. Check serverless function logs in your hosting platform

### Still seeing old form behavior

1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Verify the latest code is deployed

