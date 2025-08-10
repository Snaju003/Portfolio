# Contact Form Email Setup

This portfolio site includes a contact form that sends emails using Nodemailer. Follow these steps to set it up:

## Email Configuration

1. Rename `.env.local.example` to `.env.local`
2. Update the email credentials in the `.env.local` file:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

## Using Gmail

If using Gmail, you'll need to create an App Password:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Create an App Password (under "Signing in to Google")
5. Select "Mail" as the app and "Other" as the device
6. Use the generated 16-character password in your `.env.local` file

## Testing

To test the contact form:

1. Make sure your environment variables are set correctly
2. Fill out the contact form with a valid email address
3. Submit the form
4. Check your inbox/spam folder for the email

## Troubleshooting

If emails are not being sent:

-   Check if your email provider blocks automated emails
-   Verify your credentials in the `.env.local` file
-   Check the server logs for error messages
-   Make sure less secure app access is enabled for Gmail (if applicable)

## Security Notes

-   Never commit your `.env.local` file to version control
-   Consider using a dedicated email for sending these messages
-   Regularly rotate your app passwords for security
