use("lab_books")

// db.books.insertMany(
// [
//     {
//         title: "Learning MongoDB",
//         author: "John Developer",
//         publishedYear: 2024,
//         tags: ["mongodb", "database", "nosql"],
//         metadata: { likes: 120, reviews: 30 },
//         price: 25.5
//     },
//     {
//         title: "Mastering NoSQL",
//         author: "Sarah Query",
//         publishedYear: 2024,
//         tags: ["nosql", "database"],
//         metadata: { likes: 90, reviews: 12 },
//         price: 30
//     },
//     {
//         title: "Python Programming",
//         author: "Alice Code",
//         publishedYear: 2023,
//         tags: ["python", "programming"],
//         metadata: { likes: 50, reviews: 5 },
//         price: 40
//     },
//     {
//         title: "Advanced JavaScript",
//         author: "Bob Script",
//         publishedYear: 2022,
//         tags: ["javascript", "programming", "web"],
//         metadata: { likes: 70, reviews: 15 },
//         price: 35,
//         discount: 5
//     },
//     {
//         title: "Data Structures & Algorithms",
//         author: "Charlie Algo",
//         publishedYear: 2021,
//         tags: ["algorithms", "data structures"],
//         metadata: { likes: 110, reviews: 20 },
//         price: 45
//     },
//     {
//         title: "Database Design",
//         author: "Diana Schema",
//         publishedYear: 2023,
//         tags: ["database", "sql"],
//         metadata: { likes: 65, reviews: 8 },
//         price: 28
//     },
//     {
//         title: "NoSQL in Action",
//         author: "Eve Node",
//         publishedYear: 2020,
//         tags: ["nosql", "mongodb"],
//         metadata: { likes: 80, reviews: 10 },
//         price: 33
//     },
//     {
//         title: "Learning React",
//         author: "Frank UI",
//         publishedYear: 2022,
//         tags: ["javascript", "react", "frontend"],
//         metadata: { likes: 95, reviews: 22 },
//         price: 38
//     },
//     {
//         title: "DevOps Fundamentals",
//         author: "Grace Ops",
//         publishedYear: 2023,
//         tags: ["devops", "ci/cd", "cloud"],
//         metadata: { likes: 40, reviews: 7 },
//         price: 27
//     },
//     {
//         title: "System Design Patterns",
//         author: "Henry Architect",
//         publishedYear: 2021,
//         tags: ["system design", "backend"],
//         metadata: { likes: 75, reviews: 14 },
//         price: 50
//     },
//     {
//         title: "Microservices Architecture",
//         author: "Ivy Backend",
//         publishedYear: 2025,
//         tags: ["microservices", "system design", "backend"],
//         metadata: { likes: 0, reviews: 0 },
//         price: 45
//     },
//     {
//         title: "Cloud Computing Essentials",
//         author: "Jack Cloud",
//         publishedYear: 2025,
//         tags: ["cloud", "devops", "infrastructure"],
//         metadata: { likes: 20, reviews: 5 },
//         price: 55
//     }
// ]

// );

// db.books.find()


// db.books.find({ title: "Microservices Architecture" });

// db.books.findOne({ publishedYear: 2023 });

// db.books.find({ price: { $lt: 35 } })

// db.books.countDocuments();
// db.books.drop()

// db.books.find({ "metadata.likes": { $type: "number" } });

// db.books.find({ tags: { $type: "array" } });

// db.books.find({ discount: { $exists: false } })
// db.books.updateOne(
// { title: "Microservices Architecture" },
// { $set: { price: 50 } }
// );


// db.books.updateOne(
//     { title: "Python Programming" },
//     { $set: { author: "Alice Code Jr." } }
// );

// db.books.deleteOne({ title: "DevOps Fundamentals" });
// db.books.deleteMany({ publishedYear: { $lt: 2021 } });

// db.books.find()
// .sort({ publishedYear: -1 })
// .limit(3)


// db.books.find({ "metadata.likes": { $gt: 100 } });
// db.books.find({
//     "metadata.reviews": { $gte: 10 },
//     "metadata.likes": { $lt: 100 }
// });

// db.books.updateOne(
//     { title: "Learning MongoDB" },
//     { $inc: { "metadata.likes": 10 } }
// );

// db.books.updateMany(
//     {},
//     { $set: { "metadata.shares": 0 } }
// )

// db.books.updateOne(
//     { title: "Advanced JavaScript" },
//     { $rename: { "metadata.reviews": "metadata.reviewCount" } }
// );

// db.books.updateOne(
//     { title: "Database Design" },
//     { $unset: { "metadata.likes": "" } }
// )

// db.books.find({ tags: "javascript" });

// db.books.find({ tags: { $all: ["mongodb", "database"] } });

// db.books.find({ "tags.0": "nosql" });

// db.books.updateOne(
//     { title: "Learning MongoDB" },
//     { $addToSet: { tags: "programming" } }
// );

// db.books.updateOne(
//     { title: "Mastering NoSQL" },
//     { $pull: { tags: "nosql" } }
// );

// db.books.updateOne(
//     { title: "Python Programming", tags: "python" },
//     { $set: { "tags.$": "Python 3" } }
// );

// db.books.updateMany(
//     { publishedYear: { $gt: 2023 } },
//     { $push: { tags: "bestseller" } }
// );

// db.books.updateMany(
//     {},
//     { $pull: { tags: "frontend" } }
// );
// db.books.updateOne(
//     { title: "DevOps Fundamentals" },
//     { $addToSet: { tags: { $each: ["cloud", "devops"] } } }
// );

// db.books.find({
//     "metadata.likes": { $gt: 50 },
//     tags: "database"
// });

// db.books.updateMany(
//     { tags: "nosql" },
//     { $inc: { "metadata.likes": 5 } }
// );

// db.books.find({
//     tags: { $type: "array" },
//     "metadata.reviews": { $exists: true }
// });

// db.books.insert({
//     title: "Learning MongoDB",
//     tags: [
//         { name: "mongodb", level: "advanced" },
//         { name: "database", level: "beginner" }
//     ]
// }
// );

// db.books.find({
//     simpleTags: { $all: ["mongodb", "database"] }
// });


db.books.find({
    tags: {
        $elemMatch: {
        name: "mongodb",
        level: "advanced"
        }
    }
});










