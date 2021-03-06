const Graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLSchema } = Graphql;
const DevModel = require('../model/Dev.model');
const axios = require('axios');

const devType = new GraphQLObjectType({
  name: 'dev',
  fields: () => {
    return {
      _id: { type: GraphQLString },
      user: { type: GraphQLString },
      name: { type: GraphQLString },
      bio: { type: GraphQLString },
      avatar: { type: GraphQLString },
      likes: { type: new GraphQLList(GraphQLString) },
      dislikes: { type: new GraphQLList(GraphQLString) }
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      devs: {
        type: new GraphQLList(devType),
        resolve: () => {
          const devs = DevModel.find().exec();
          if (!devs)
            throw new Error('Error Fetching Devs!');

          return devs;
        }
      },
      dev: {
        type: devType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: (root, params) => {
          const dev = DevModel.findById(params.id).exec();
          if (!dev)
            throw new Error('Error fetching dev by id!');
          return dev;
        }
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      addDev: {
        type: devType,
        args: {
          user: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (root, params, req) => {
          const dev = await DevModel.find({ user: { $eq: params.user } }).exec();
          console.log(dev)
          if (!dev || dev.length === 0) {
            const { data } = await axios.get(`https://api.github.com/users/${params.user}`);
            const devModel = new DevModel({
              avatar: data.avatar_url,
              user: params.user,
              bio: data.bio,
              name: data.name
            });
            const newDev = devModel.save();
            if (!newDev)
              throw new Error('Error saving Dev!');
            return newDev;
          }

          return dev[0];
        }
      },
      like: {
        type: devType,
        args: {
          userId: { type: GraphQLString },
          devId: { type: GraphQLString },
        },
        resolve: async (root, params, req) => {
          let dev = await DevModel.findById({ _id: params.userId }).exec();
          if (dev.likes && dev.likes.filter(like => like === params.devId).length === 0) {
            let likes;
            if (dev.likes && dev.likes.length > 0) {
              likes = [...dev.likes, devId]
            } else {
              likes = [params.devId]
            }
            await DevModel.findByIdAndUpdate(params.userId, { likes: likes }).exec();
            //Verify if matched
            const likedUser = await DevModel.findById({_id: params.devId}).exec();
            if (likedUser.likes.filter(like => like === params.userId)){
              req.io.to(req.connectedUsers[params.userId]).emit('match',likedUser);
              req.io.to(req.connectedUsers[params.devId]).emit('match', dev);
            }
            

            return { ...dev, likes };
          } else {
            return dev;
          }
        }
      }
    }

  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });