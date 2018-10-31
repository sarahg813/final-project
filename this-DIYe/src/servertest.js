import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { makeExecutableSchema } from "graphql-tools";

require("dotenv").config();

const typeDefs = `
  type User {
    _id: String
    email: String
    jwt: String
  }
  type Query {
    currentUser: User
  }
  type Mutation {
    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    currentUser: () => {
      // TODO: Make this real
      return TEMP_USER;
    }
  },
  Mutation: {
    login: async (root, { email, password }, { mongo }) => {
      const Users = mongo.collection("users");

      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("Email not found");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Password is incorrect");
      }

      // Generate the jwt and add it to the user document being returned.
      user.jwt = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      return user;
    },
    signup: async (root, { email, password }, { mongo }) => {
      const Users = mongo.collection("users");
      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        throw new Error("Email already used");
      }
      const hash = await bcrypt.hash(password, 10);
      await Users.insert({
        email,
        password: hash
      });
      const user = await Users.findOne({ email });

      user.jwt = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      return user;
    }
  }
};

const getUser = async (authorization, secrets, mongo) => {
  const bearerLength = "Bearer ".length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise(resolve =>
      jwt.verify(token, secrets.process.env.JWT_SECRET, (err, result) => {
        if (err) {
          resolve({
            ok: false,
            result: err
          });
        } else {
          resolve({
            ok: true,
            result
          });
        }
      })
    );

    if (ok) {
      const user = await mongo
        .collection("users")
        .findOne({ _id: ObjectId(result._id) });
      return user;
    } else {
      console.error(result);
      return null;
    }
  }

  return null;
};

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

let mongo;
let client;

export async function context(headers, secrets) {
  if (!mongo) {
    client = await MongoClient.connect(secrets.process.env.MONGO_URL);
    mongo = client.db("diye");
  }
  const user = await getUser(headers["authorization"], secrets, mongo);

  return {
    headers,
    secrets,
    mongo,
    user
  };
}
