/**
 * Netlify Serverless Function for Secure Form Submission
 * 
 * This function handles demo form submissions securely by keeping
 * the FormSubmit.co activation ID server-side.
 * 
 * Environment Variables Required:
 * - FORMSUBMIT_ID: The FormSubmit.co activation ID
 * - FORMSUBMIT_EMAIL: The recipient email address
 */

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get environment variables
  const formsubmitId = process.env.FORMSUBMIT_ID;
  const formsubmitEmail = process.env.FORMSUBMIT_EMAIL || 'ishaileshpant@gmail.com';

  if (!formsubmitId) {
    console.error('FORMSUBMIT_ID environment variable is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and email are required' })
      };
    }

    // Prepare data for FormSubmit.co
    const submitData = new URLSearchParams();
    submitData.append('_to', formsubmitEmail);
    submitData.append('_subject', 'MLOS Foundation Demo Request');
    submitData.append('_replyto', formData.email);
    submitData.append('_captcha', 'false');
    submitData.append('_template', 'table');
    
    // Add form fields
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    if (formData.company) submitData.append('company', formData.company);
    if (formData.phone) submitData.append('phone', formData.phone);
    if (formData.preferredDate) submitData.append('preferredDate', formData.preferredDate);
    if (formData.useCase) submitData.append('useCase', formData.useCase);
    if (formData.message) submitData.append('message', formData.message);

    // Submit to FormSubmit.co
    const response = await fetch(`https://formsubmit.co/${formsubmitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: submitData.toString()
    });

    // Check if submission was successful
    if (response.ok) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Demo request submitted successfully'
        })
      };
    } else {
      const errorText = await response.text();
      console.error('FormSubmit.co error:', errorText);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to submit form',
          message: 'Please try again or email us directly'
        })
      };
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Please try again or email us directly'
      })
    };
  }
};

