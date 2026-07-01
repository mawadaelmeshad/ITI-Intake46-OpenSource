const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
} = require("graphql");

const { queryResolvers, mutationResolvers } = require("./resolvers");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id:         { type: GraphQLInt    },
    name:       { type: GraphQLString },
    price:      { type: GraphQLFloat  },
    categoryId: { type: GraphQLInt    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve: queryResolvers.products,
    },
    product: {
      type: ProductType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: queryResolvers.product,
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name:       { type: new GraphQLNonNull(GraphQLString) },
        price:      { type: new GraphQLNonNull(GraphQLFloat)  },
        categoryId: { type: GraphQLInt                        },
      },
      resolve: mutationResolvers.addProduct,
    },
    updateProduct: {
      type: ProductType,
      args: {
        id:         { type: new GraphQLNonNull(GraphQLInt) },
        name:       { type: GraphQLString                  },
        price:      { type: GraphQLFloat                   },
        categoryId: { type: GraphQLInt                     },
      },
      resolve: mutationResolvers.updateProduct,
    },
  },
});

const schema = new GraphQLSchema({
  query:    RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
