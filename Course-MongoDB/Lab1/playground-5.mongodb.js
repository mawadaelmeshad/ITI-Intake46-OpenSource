/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'lab_store';
const collection = 'lab1';

// Create a new database.
use(database);

// Create a new collection.
// db.createCollection("products");
// db.createCollection("orders");


// db.orders.drop();

// db.products.insertOne({
//     name: "USB-C Cable",
//     category: "Accessories",
//     price: 149,
//     inStock: true,
//     tags: ["cable", "usb-c"],
//     createdAt: new Date()
// });
// db.products.find();
// db.products.findOne({ name: "USB-C Cable" });

// db.customers.insertOne({
//     email: "mawadah@example.com",
//     isMember: false,
//     createdAt: new Date()
// });
// db.customers.find();

// db.createCollection("orders");

// var product = db.products.findOne({ name: "USB-C Cable" })
// var customer = db.customers.findOne({ email: "mawadah@example.com" });
// db.orders.insertOne({
//     customerId: customer._id,
//     items: [
//         {
//         productId: product._id,
//         quantity: 2,
//         priceAtPurchase: product.price
//         }
//     ],
//     orderDate: new Date(),
//     totalAmount: product.price * 2
// })
// db.orders.find();

// db.products.insertMany([
//     {
//         name: "Wireless Mouse",
//         category: "Accessories",
//         price: 299,
//         inStock: true,
//         tags: ["mouse", "wireless", "bluetooth"],
//         createdAt: new Date()
//     },
//     {
//         name: "Laptop Stand",
//         category: "Accessories",
//         price: 450,
//         inStock: false,
//         tags: ["stand", "ergonomic"],
//         createdAt: new Date()
//     },
//     {
//         name: "ThinkPad X1 Carbon",
//         category: "Laptops",
//         price: 15999,
//         inStock: false,
//         tags: ["lenovo", "laptop", "business"],
//         createdAt: new Date()
//     },
//     {
//         name: "iPhone 15 Pro",
//         category: "Phones",
//         price: 9999,
//         inStock: true,
//         tags: ["apple", "smartphone", "5g"],
//         createdAt: new Date()
//     },
//     {
//         name: "Samsung Galaxy S24",
//         category: "Phones",
//         price: 8499,
//         inStock: true,
//         tags: ["samsung", "smartphone", "android"],
//         createdAt: new Date()
//     },
//     {
//         name: "Google Pixel 8",
//         category: "Phones",
//         price: 6999,
//         inStock: false,
//         tags: ["google", "smartphone", "android"],
//         createdAt: new Date()
//     }
// ])

// db.products.countDocuments();

// db.products.findOne(
//     { category: "Accessories" },
//     { name: 1, price: 1, _id: 0 }
// )

// db.products.find(
//     { inStock: true },
//     { name: 1, price: 1, inStock: 1, _id: 0 }
// )

db.products.find(
    { 
        price: { 
        $gte: 100, 
        $lte: 1000 
        } 
    }
)