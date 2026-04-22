import { transporter } from "../config/nodemailer.js";
import emailTemplates from "./email-template.js";

const getTemplateByLabel = (label) => {
  const templateMap = {
    "7 days before reminder": emailTemplates.sevenDaysReminder,
    "5 days before reminder": emailTemplates.fiveDaysReminder,
    "2 days before reminder": emailTemplates.twoDaysReminder,
    "1 days before reminder": emailTemplates.oneDayReminder,
  };
  return templateMap[label];
};

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type || !subscription) {
    console.error("Missing required parameters for sending email. Required: to, type, subscription");
    return;
  }

  const templateFunction = getTemplateByLabel(type);

  if (!templateFunction) {
    console.error(`No email template found for type: ${type}`);
    console.error(`Available types: 7 days before reminder, 5 days before reminder, 2 days before reminder, 1 days before reminder`);
    return;
  }

  const emailContent = templateFunction(subscription, subscription.user);

  const mailOptions = {
    from: "ifechinwokedi@gmail.com",
    to: to,
    subject: emailContent.subject,
    html: emailContent.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
