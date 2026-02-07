/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'lab_store';
const collection = 'lab1';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection("products");
db.createCollection("customers");
db.createCollection("orders");