const isAdmin = (user) => user.role.weight >= 32;

const RESTRICTED_ROUTES = {
  createArticle: ({user}) => isAdmin(user)
}

module.exports = { RESTRICTED_ROUTES };