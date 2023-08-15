import React from 'react';

const EmailTemplate = ({ recipientName }) => {
    return (
        <div>
            <h1>Welcome to Our Platform, {recipientName}!</h1>
            <p>Thank you for joining our platform. We're excited to have you on board.</p>
            <p>Best regards,</p>
            <p>The Platform Team</p>
        </div>
    );
};

export default EmailTemplate;
