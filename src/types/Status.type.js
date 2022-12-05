const { GraphQLObjectType, GraphQLEnumType } = require('graphql');

const StatusField = {
  status: {type: new GraphQLEnumType({
    name: 'statusField',
    values: {
      SUCCESS: {value: 'SUCCESS'},
      NOT_FOUND: {value: 'NOT_FOUND'},
      UNAUTHORIZED: {value: 'UNAUTHORIZED'},
      VALIDATION: {value: 'VALIDATION'},
      ERROR: {value: 'ERROR'}
    }})
  }
}

const StatusType = new GraphQLObjectType({
  name: 'status',
  fields: () => ({
    ...StatusField
  })
});

module.exports = StatusType;
module.exports.StatusField = StatusField;