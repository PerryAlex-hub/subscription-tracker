// Subscription reminder email templates

const emailTemplates = {
  // 7 days before renewal
  sevenDaysReminder: (subscription, user) => ({
    label: "Reminder 7 days before",
    subject: `Reminder: ${subscription.name} renews in 7 days`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #007bff; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
            .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .info-box { background-color: #e3f2fd; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0; }
            .price { font-size: 24px; font-weight: bold; color: #007bff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Subscription Renewal Reminder</h1>
            </div>
            <div class="content">
              <p>Hi ${user.name},</p>
              <p>Your subscription will renew in <strong>7 days</strong>.</p>
              
              <div class="info-box">
                <p><strong>Subscription Details:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li><strong>Service:</strong> ${subscription.name}</li>
                  <li><strong>Renewal Date:</strong> ${new Date(subscription.renewalDate).toLocaleDateString()}</li>
                  <li><strong>Amount:</strong> <span class="price">${subscription.currency} ${subscription.price}</span></li>
                  <li><strong>Frequency:</strong> ${subscription.frequency}</li>
                  <li><strong>Payment Method:</strong> ${subscription.paymentMethod}</li>
                </ul>
              </div>
              
              <p>Make sure you have sufficient funds to avoid any interruption to your service.</p>
              <p>If you wish to cancel or modify this subscription, please do so before the renewal date.</p>
            </div>
            <div class="footer">
              <p>This is an automated reminder. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // 5 days before renewal
  fiveDaysReminder: (subscription, user) => ({
    label: "Reminder 5 days before",
    subject: `Final reminder: ${subscription.name} renews in 5 days`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #ff9800; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
            .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .warning-box { background-color: #fff3cd; padding: 15px; border-left: 4px solid #ff9800; margin: 15px 0; }
            .price { font-size: 24px; font-weight: bold; color: #ff9800; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ Subscription Renewal - 5 Days</h1>
            </div>
            <div class="content">
              <p>Hi ${user.name},</p>
              <p>Your subscription will renew in just <strong>5 days</strong>. This is your final reminder!</p>
              
              <div class="warning-box">
                <p><strong>Subscription Details:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li><strong>Service:</strong> ${subscription.name}</li>
                  <li><strong>Renewal Date:</strong> ${new Date(subscription.renewalDate).toLocaleDateString()}</li>
                  <li><strong>Amount:</strong> <span class="price">${subscription.currency} ${subscription.price}</span></li>
                  <li><strong>Frequency:</strong> ${subscription.frequency}</li>
                  <li><strong>Payment Method:</strong> ${subscription.paymentMethod}</li>
                </ul>
              </div>
              
              <p><strong>Action Required:</strong></p>
              <ul style="padding-left: 20px;">
                <li>Ensure your payment method is up-to-date and valid</li>
                <li>Check your account balance</li>
                <li>Cancel or modify the subscription if needed</li>
              </ul>
              
              <p>If you have any issues or need assistance, please contact our support team.</p>
            </div>
            <div class="footer">
              <p>This is an automated reminder. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // 2 days before renewal
  twoDaysReminder: (subscription, user) => ({
    label: "Reminder 2 days before",
    subject: `Urgent: ${subscription.name} renews in 2 days`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f44336; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
            .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .urgent-box { background-color: #ffebee; padding: 15px; border-left: 4px solid #f44336; margin: 15px 0; }
            .price { font-size: 24px; font-weight: bold; color: #f44336; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 URGENT: ${subscription.name} Renews in 2 Days</h1>
            </div>
            <div class="content">
              <p>Hi ${user.name},</p>
              <p>Your subscription will renew in just <strong>2 days</strong>! Time to act if needed.</p>
              
              <div class="urgent-box">
                <p><strong>Subscription Details:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li><strong>Service:</strong> ${subscription.name}</li>
                  <li><strong>Renewal Date:</strong> ${new Date(subscription.renewalDate).toLocaleDateString()}</li>
                  <li><strong>Amount:</strong> <span class="price">${subscription.currency} ${subscription.price}</span></li>
                  <li><strong>Frequency:</strong> ${subscription.frequency}</li>
                  <li><strong>Payment Method:</strong> ${subscription.paymentMethod}</li>
                </ul>
              </div>
              
              <p><strong>Quick Checklist:</strong></p>
              <ul style="padding-left: 20px;">
                <li>✓ Verify your payment method is current</li>
                <li>✓ Confirm you want to continue this subscription</li>
                <li>✓ Update card details if needed</li>
                <li>✓ Cancel now if you no longer need this service</li>
              </ul>
              
              <p>For any questions or to manage your subscription, log into your account immediately.</p>
            </div>
            <div class="footer">
              <p>This is an automated reminder. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // 1 day before renewal
  oneDayReminder: (subscription, user) => ({
    label: "Reminder 1 day before",
    subject: `Last chance: ${subscription.name} renews tomorrow`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #d32f2f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
            .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .critical-box { background-color: #ffcdd2; padding: 15px; border-left: 4px solid #d32f2f; margin: 15px 0; }
            .price { font-size: 24px; font-weight: bold; color: #d32f2f; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ FINAL NOTICE: ${subscription.name} Renews Tomorrow</h1>
            </div>
            <div class="content">
              <p>Hi ${user.name},</p>
              <p>Your subscription will renew <strong>tomorrow</strong>. This is your last chance to take action!</p>
              
              <div class="critical-box">
                <p><strong>Subscription Details:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li><strong>Service:</strong> ${subscription.name}</li>
                  <li><strong>Renewal Date:</strong> ${new Date(subscription.renewalDate).toLocaleDateString()}</li>
                  <li><strong>Amount:</strong> <span class="price">${subscription.currency} ${subscription.price}</span></li>
                  <li><strong>Frequency:</strong> ${subscription.frequency}</li>
                  <li><strong>Payment Method:</strong> ${subscription.paymentMethod}</li>
                </ul>
              </div>
              
              <p><strong>⚡ URGENT ACTION NEEDED:</strong></p>
              <ul style="padding-left: 20px;">
                <li><strong>Do NOT want this charge?</strong> Cancel immediately to avoid being charged.</li>
                <li><strong>Want to continue?</strong> Make sure your payment details are up-to-date.</li>
                <li><strong>Having issues?</strong> Contact support now before the renewal.</li>
              </ul>
              
              <p style="color: #d32f2f; font-weight: bold;">The renewal will occur at 00:00 UTC tomorrow. Log in now to manage your subscription!</p>
            </div>
            <div class="footer">
              <p>This is an automated reminder. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};

export default emailTemplates;
