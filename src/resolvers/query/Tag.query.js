const { GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const NotFoundError = require('../../errors/NotFound.error');
const TagModel = require('../../models/Category.model');

const getTag = {
  type: require('../../types/Tag.type'),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_, {id}) => {
    const tag = await TagModel.findByPk(id);
    
    if(!tag)
      throw new NotFoundError();
    
    return tag;
  }
}

const getTags = {
  type: new GraphQLList(require('../../types/Tag.type')),
  resolve: async () => {
    const tags = await TagModel.findAll();
    return tags;
  }
}

module.exports = { getTag, getTags }