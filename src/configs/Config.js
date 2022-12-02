const { login } = require("../resolvers/query/Auth.query");

const isAdmin = (user) => user.role.weight >= 32;

const RESTRICTED_ROUTES = {
  createArticle: ({user}) => isAdmin(user),
  login: () => true
}

module.exports = { RESTRICTED_ROUTES };