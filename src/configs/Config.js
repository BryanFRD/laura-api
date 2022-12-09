const isAdmin = (user) => user.role?.weight >= 32;

const Config = {
  RESTRICTED_ROUTES: {
    createArticle: ({user}) => isAdmin(user)
  },
  mail: {
    accountCreation: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      mailOptions: ({token}) => {
        const confirmationLink = `${process.env.APP_URL}/confirmation`;
        const confirmationLinkWithToken = `${confirmationLink}/${token}`;
        
        return {
          from: `"L'aura" <${process.env.EMAIL_USER}>`,
          subject: `L\'aura, Confirmez votre compte !`,
          text: `L'aura\nCliquez sur le lien afin de valider la création de votre compte !\n${confirmationLinkWithToken}`,
          html: `
            <div style="text-align: center; color: inherit">
              <h1>L'Aura</h1>
              <div style="text-align: center">
                <div>Cliquez sur le lien afin de valider la création de votre compte !</div>
                <a href="${confirmationLinkWithToken}">${confirmationLink}</a>
              </div>
            </div>
          `
        }
      }
    }
  }
}

module.exports = Config;