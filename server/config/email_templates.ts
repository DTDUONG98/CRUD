export default {
  money: {
    subject: "Mail sent out of money warning",
    content: "Mail sent out of money warning"
  },
  loginBot: {
    subject: "You need to login again for the bot {{name}}",
    content: `<html>
      <a href=${process.env.DOMAIN}/staff/login?id={{id}}&hash={{hash}}>Click here!</a>
      The system will proceed to automatically log in to DNC with the corpPass account. It needs to be verified on the owner's SingPass Mobile. So contact the account owner and make sure they're ready to confirm.
    </html>`
  },
  forgotPassword: {
    subject: "Reset of account password",
    content: `<p>You have requested a new password for your account. Please reset your password by clicking on the link below:</p><p><a href="{{resetPasswordLink}}" target="_blank">Click here</a></p>`
  },
  login: {
    subject: "{{name}} Do Not Call (DNC) system account",
    content: `<html>
      Your {{name}} Do Not Call (DNC) system login account has been created. To access your account, please click the following link and login using the below credentials: <br/> <br/>
      <a href=${process.env.DOMAIN}/admin/>${process.env.DOMAIN}/admin</a><br/><br/>
      Username: {{username}}<br/>
      Password: {{password}}<br/>
      <br/>
      Please follow the 2FA instructions after you have login. If clicking the link above does not work, please copy and paste the URL in a new browser window instead.
      <br/><br/>
      If you encounter any issues, please contact StarHub.
      <br/>
      <br/>
      Note: This email address cannot accept replies.
    </html>`
  }
}
