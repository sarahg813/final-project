const mongojs = require("mongojs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server-express");
const Post = require("./models/post");
const User = require("./models/user");
const { getUserId } = require("./utils");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    async posts(root, args, context) {
      const userId = getUserId(context);
      const user = await User.user(context.db, {
        _id: mongojs.ObjectId(userId)
      });
      const posts = await Post.read(context.db, {
        user_id: userId
      });
      const result = posts.map(post => {
        return {
          _id: post._id,
          caption: post.caption,
          imgUrl: post.imgUrl,
          author: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        };
      });
      return result;
    }
  },
  Mutation: {
    async signup(root, args, context) {
      const password = await bcrypt.hash(args.password, 10);
      const user = await User.create(context.db, {
        ...args,
        password: password
      });
      const token = jwt.sign({ userId: user._id }, "secret");
      return {
        token,
        user
      };
    },
    async login(root, args, context) {
      const user = await User.user(context.db, { email: args.email });
      if (!user) {
        throw new Error("No such user found");
      }

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user._id }, "secret");
      return {
        token,
        user
      };
    },
    async createPost(root, args, context) {
      const userId = getUserId(context); //to get id from token, function getUserId from utils.js

      console.log(root);
      console.log(userId);
      const user = await User.user(context.db, {
        _id: mongojs.ObjectId(userId)
      });
      console.log(user);
      const newPost = await Post.create(context.db, {
        ...args,
        user_id: userId
      });
      return {
        _id: newPost._id,
        caption: newPost.caption,
        imgUrl: newPost.imgUrl,
        author: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      };
    }
  },
  AuthPayload: {
    async user(root, args, context) {
      return await User.user(context.db, { _id: root.user._id });
    }
  }
};

module.exports = {
  resolvers: resolvers,
  pubsub: pubsub
};
