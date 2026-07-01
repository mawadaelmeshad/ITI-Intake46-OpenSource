
const { buildSchema } = require("graphql");
const products = require("./data");

const schema = buildSchema(`
  type Product {
    id: Int
    name: String
    price: Float
    categoryId: Int
  }

  type Query {
    products: [Product]
    product(id: Int!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, categoryId: Int): Product
    updateProduct(id: Int!, name: String, price: Float, categoryId: Int): Product
  }
`);

const rootValue = {

  products: () => products,

  product: ({ id }) => {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error(`Product with id ${id} not found`);
    return product;
  },

  addProduct: ({ name, price, categoryId }) => {
    const newProduct = { id: products.length + 1, name, price, categoryId: categoryId || null };
    products.push(newProduct);
    return newProduct;
  },

  updateProduct: ({ id, name, price, categoryId }) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Product with id ${id} not found`);
    const updated = { ...products[index], ...(name && { name }), ...(price && { price }), ...(categoryId && { categoryId }) };
    products[index] = updated;
    return updated;
  },

};

module.exports = { schema, rootValue };
