const verifyEmailTemplate = (otp, role) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; color: #4a90e2;">Verify Your E-Mail Address</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">Please use the following One Time Password (OTP) to verify your email address:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; padding: 10px 20px; border: 2px solid #4a90e2; border-radius: 4px; font-size: 24px; font-weight: bold; color: #4a90e2;">${otp}</span>
      </div>
      <p style="font-size: 16px; color: #333;">This passcode will only be valid for the next 2 minutes.</p>
      <p style="font-size: 16px; color: #333;">Role: ${role}</p>
      <p style="font-size: 16px; color: #333;">Regards,<br/>Your Company</p>
    </div>
  </div>
`;

const passwordResetTemplate = (resetURL) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2 style="text-align: center; color: #4a90e2;">Password Reset Request Welcome</h2>
      <p style="font-size: 16px; color: #333;">You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
      <p style="font-size: 16px; color: #333;">Please click on the button below to verify and reset your password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; background-color: #4a90e2; color: white; text-decoration: none; border-radius: 4px; font-size: 16px;">Verify Email</a>
      </div>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <p style="font-size: 16px; color: #333;">Regards,<br/>Your Company</p>
    </div>
  </div>
`;

module.exports = { verifyEmailTemplate, passwordResetTemplate };
