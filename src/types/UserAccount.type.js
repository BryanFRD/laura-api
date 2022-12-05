const { GraphQLObjectType, GraphQLString } = require('graphql');
const BaseType = require('./Base.type');
const RoleType = require('./Role.type');
const NotFoundError = require('../errors/NotFound.error');
const RoleModel = require('../models/Role.model');

const UserAccountType = new GraphQLObjectType({
  name: 'useraccount',
  fields: () => ({
    ...BaseType,
    firstname: {type: GraphQLString},
    lastname: {type: GraphQLString},
    role: {
      type: RoleType,
      resolve: async (parent, args) => {
        const role = parent.role ?? await RoleModel.findByPk(parent.roleId);
        
        if(!role)
          throw new NotFoundError();
        
        return role;
      }
    }
  })
});

module.exports = UserAccountType;