import React, { useState } from 'react';
import EmailTemplate from '../EmailTemplate';
// import sendEmail from '../../../services/EmailServices';

const EmailSection = () => {
    const [recipientEmail, setRecipientEmail] = useState('');

    // const handleSendEmail = async () => {
    //     const subject = 'Welcome to Our Platform';
    //     const emailContent = <EmailTemplate recipientName={recipientEmail} />;

    //     try {
    //     await sendEmail(recipientEmail, subject, emailContent);
    //     console.log('Email sent successfully');
    //     } catch (error) {
    //     console.error('Email sending error:', error);
    //     }
    // };

    return (
        <div>
        <h2>Welcome Email Sender</h2>
        <label>Recipient's Email: </label>
        <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
        />
        {/* <button onClick={handleSendEmail}>Send Welcome Email</button> */}
        </div>
    );
};

export default EmailSection;
