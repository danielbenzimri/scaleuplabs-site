
# Google Forms Email Integration Setup Guide

## Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with these fields:
   - First Name (Short answer)
   - Last Name (Short answer)
   - Email (Short answer)
   - Company (Short answer)
   - Service Interest (Multiple choice with options: Data Science, Generative AI, Data Pipelines, Full-Stack Development, Tech Outsourcing, Tech Recruitment, General Consultation)
   - Message (Paragraph)

## Step 2: Get Form Entry IDs

1. Open your Google Form
2. Click "Preview" (eye icon)
3. Right-click on the form and select "Inspect Element"
4. Look for input fields with names like `entry.123456789`
5. Note down each entry ID for each field

## Step 3: Configure Email Notifications

1. In your Google Form, click on "Responses" tab
2. Click the three dots menu and select "Get email notifications for new responses"
3. This will send you an email every time someone submits the form

## Step 4: Update the Contact Form

Replace the placeholder entry IDs in `ContactSection.tsx`:

```typescript
// Replace these with your actual Google Form entry IDs
params.append('entry.YOUR_FIRSTNAME_ENTRY_ID', formData.get('firstName') as string);
params.append('entry.YOUR_LASTNAME_ENTRY_ID', formData.get('lastName') as string);
params.append('entry.YOUR_EMAIL_ENTRY_ID', formData.get('email') as string);
params.append('entry.YOUR_COMPANY_ENTRY_ID', formData.get('company') as string);
params.append('entry.YOUR_SERVICE_ENTRY_ID', formData.get('service') as string);
params.append('entry.YOUR_MESSAGE_ENTRY_ID', formData.get('message') as string);
```

Also update the `GOOGLE_FORM_URL` with your form's actual URL:
```typescript
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse";
```

## Step 5: Test the Integration

1. Fill out and submit the contact form on your website
2. Check your Google Form responses to see if the submission appears
3. Check your email for the notification

## Benefits of This Approach

- ✅ No backend required
- ✅ Free to use
- ✅ Automatic email notifications
- ✅ Data stored in Google Sheets
- ✅ No server maintenance
- ✅ Reliable delivery
- ✅ Easy to set up and modify
