const products = require("./data");

const queryResolvers = {

  // Get all products
  products: () => products,

  // Get product by id
  product: (parent, args) => {
    const product = products.find((p) => p.id === args.id);
    if (!product) throw new Error(`Product with id ${args.id} not found`);
    return product;
  },

};

const mutationResolvers = {

  // Add new product
  addProduct: (parent, args) => {
    const newProduct = {
      id:         products.length + 1,
      name:       args.name,
      price:      args.price,
      categoryId: args.categoryId || null,
    };
    products.push(newProduct);
    return newProduct;
  },

  // Update product by id
  updateProduct: (parent, args) => {
    const index = products.findIndex((p) => p.id === args.id);
    if (index === -1) throw new Error(`Product with id ${args.id} not found`);
    const updated = { ...products[index], ...args };
    products[index] = updated;
    return updated;
  },

};

module.exports = { queryResolvers, mutationResolvers };
