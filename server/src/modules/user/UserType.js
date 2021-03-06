// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import { globalIdField } from "graphql-relay";
import { registerType, nodeInterface } from "../../interface/NodeInterface";

export default registerType(
  new GraphQLObjectType({
    name: "User",
    description: "User data",
    fields: () => ({
      id: globalIdField("User"),
      _id: {
        type: GraphQLString,
        resolve: user => user._id
      },
      name: {
        type: GraphQLString,
        resolve: user => user.name
      },
      email: {
        type: GraphQLString,
        resolve: user => user.email
      },
      active: {
        type: GraphQLBoolean,
        resolve: user => user.active
      }
    }),
    interfaces: () => [nodeInterface]
  })
);
