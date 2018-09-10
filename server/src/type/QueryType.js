// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from "graphql";
import { connectionArgs, fromGlobalId } from "graphql-relay";

import UserType from "../modules/user/UserType";
import ProductType from "../modules/product/ProductType";
import { nodeField } from "../interface/NodeInterface";
import { UserLoader, CustomerLoader } from "../loader";
import UserConnection from "../modules/user/UserConnection";
import ProductConnection from "../modules/user/ProductConnection";

export default new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    node: nodeField,
    me: {
      type: UserType,
      resolve: (root, args, context) =>
        context.user ? UserLoader.load(context, context.user._id) : null
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (obj, args, context) => {
        const { id } = fromGlobalId(args.id);
        return UserLoader.load(context, id);
      }
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString
        }
      },
      resolve: (obj, args, context) => UserLoader.loadUsers(context, args)
    },
    product: {
      type: ProductType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (obj, args, context) => {
        const { id } = fromGlobalId(args.id);
        return ProductLoader.load(context, id);
      }
    },
    products: {
      type: ProductConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString
        }
      },
      resolve: (obj, args, context) => ProductLoader.loadUsers(context, args)
    }
  })
});
