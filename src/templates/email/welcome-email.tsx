export const welcomeEmail = (name: string) => ({
  subject: "Welcome to Agencioo",
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px;">
      
      <h2 style="margin: 0 0 16px 0; color: #111827;">
        Welcome, ${name}
      </h2>

      <p style="margin: 0 0 16px 0; color: #4b5563; font-size: 14px; line-height: 1.6;">
        Your Agencioo account has been successfully created. 
        You can now start managing your workspace, team, and projects in one centralized platform.
      </p>

      <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 14px; line-height: 1.6;">
        Set up your workspace and invite your team to begin.
      </p>

      <div style="text-align: left;">
        <a href="https://localhost:3000/dashboard"
           style="display: inline-block; padding: 10px 18px; font-size: 14px;
                  color: #ffffff; background-color: #111827; border-radius: 8px;
                  text-decoration: none;">
          Go to Dashboard
        </a>
      </div>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
        If you did not create this account, please ignore this email.
      </p>

      <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
        © ${new Date().getFullYear()} Agencioo. All rights reserved.
      </p>

    </div>
  </div>
  `,
});