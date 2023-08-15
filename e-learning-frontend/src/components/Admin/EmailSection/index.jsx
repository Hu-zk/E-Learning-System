import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "./style.css"


function EmailSection() {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [name, setName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const handleTemplateChange = (event) => {
        setSelectedTemplate(event.target.value);
    };

    const handleSendEmail = () => {
        if (!selectedTemplate || !name || !recipientEmail) {
            console.warn('Please fill in all required fields.');
            return;
        }

        const serviceId = 'service_xef9p7m';
        const teacherTemplateId = 'template_pzo3xt7';
        const studentTemplateId = 'template_34neugu';
        const userId = 'XLEQQW6p_BtWbZ7ZS';
        let templateId = ''; 

        if (selectedTemplate === 'welcomeTeacher') {
            templateId = teacherTemplateId; 
        } else if (selectedTemplate === 'welcomeStudent') {
            templateId = studentTemplateId; 
        }

        const templateParams = {
            to_name: name,
            to_email: recipientEmail,
        };
        console.log(recipientEmail)

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then(() => {
                setEmailSent(true);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div className="email-section">

            <div className='email-header'>
            <h3>Email Templates :</h3>

            <div>
            {/* <p>Select an email template:</p> */}
            <select value={selectedTemplate} onChange={handleTemplateChange}>
                <option value="">Select a template</option>
                <option value="welcomeTeacher">Welcome Email to Teacher</option>
                <option value="welcomeStudent">Welcome Email to Student</option>
            </select>
            </div>
            </div>

            {selectedTemplate === "welcomeTeacher" && (
                <div className="email-template">
                    <h4>Welcome to Our Learning System, {name}!</h4>
                    <p>Dear <b>{name}</b>,</p> <br />
                    <p>We are excited to have you as a teacher in our learning system.</p>
                    <p>Please use the following information to access your account:</p> <br />
                    <ul>
                        <li className='teacher-template-label'>Email: {name}@elearning.com</li>
                        <li className='teacher-template-label'>Password: {name}teacher2023</li> <br />
                    </ul>
                    <p>Please log in and explore the features available to you. If you have any questions or need assistance, feel free to contact our support team.</p> <br />
                    <p>Thank you for joining us!</p>
                    <p>Sincerely,</p>
                    <p><b>The Your Learning System Team</b></p>
                </div>
            )}

            {selectedTemplate === "welcomeStudent" && (
                <div className="email-template">
                    <h3>Welcome to Our Learning System, {name}!</h3>
                    <p>Dear <b>{name}</b>,</p> <br />
                    <p>We are thrilled to have you as a student in our learning system. Get ready for an exciting learning journey!</p>
                    <p>Your login details:</p>
                    <ul> <br />
                        <li className='student-template-label'>Email: {name}@elearning.com</li>
                        <li className='student-template-label'>Password: {name}student2023</li> <br />
                    </ul>
                    <p>Log in to access your courses, assignments, and resources. If you have any questions or need assistance, our support team is here to help.</p> <br />
                    <p>Wishing you a successful and rewarding learning experience!</p>
                    <p>Best regards,</p>
                    <p><b>The Your Learning System Team</b></p>
                </div>
            )}

                {selectedTemplate && (
                <div className="email-footer">
                    <h3>Modify Template</h3>

                    <div className='footer-inputs'>
                        <div className='label-input'>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        <div className='label-input'>
                            <label htmlFor="recipientEmail">Recipient's Email:</label>
                            <input
                                type="email"
                                id="recipientEmail"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                />
                        </div>
                        <button className='email-button' onClick={handleSendEmail}>Send Email</button>
                    </div>
                    {emailSent && <p>Email sent successfully!</p>}
                </div>
            )}
        </div>
    );
}

export default EmailSection;
