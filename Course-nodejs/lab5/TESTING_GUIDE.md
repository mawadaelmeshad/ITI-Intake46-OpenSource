## 🧪 API Testing Guide

### Test with Postman or curl

---

### **1️⃣ SIGNUP - Create a New User**

```
POST http://localhost:3000/api/users/signup
Content-Type: application/json

{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "role": "user"
  }
}
```

---

### **2️⃣ LOGIN - Login with Credentials**

```
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "role": "user"
  }
}
```

**Copy the token for next requests!**

---

### **3️⃣ CREATE POST - Add a New Post (requires authentication)**

```
POST http://localhost:3000/api/posts
Content-Type: application/json
Authorization: Bearer <YOUR_TOKEN_HERE>

{
  "title": "My First Post",
  "content": "This is my first blog post!"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Post created successfully",
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "My First Post",
    "content": "This is my first blog post!",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmed Ali",
      "email": "ahmed@example.com"
    },
    "isOwner": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### **4️⃣ GET ALL POSTS - View All Posts (requires authentication)**

```
GET http://localhost:3000/api/posts
Authorization: Bearer <YOUR_TOKEN_HERE>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "count": 2,
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "My First Post",
      "content": "This is my first blog post!",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Ahmed Ali",
        "email": "ahmed@example.com"
      },
      "isOwner": true  ← You own this post
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Someone Else's Post",
      "content": "Content from another user",
      "userId": {
        "_id": "507f1f77bcf86cd799439099",
        "name": "Sara Mohamed",
        "email": "sara@example.com"
      },
      "isOwner": false  ← You don't own this post
    }
  ]
}
```

---

### **5️⃣ GET SINGLE POST - View a Post by ID (requires authentication)**

```
GET http://localhost:3000/api/posts/507f1f77bcf86cd799439012
Authorization: Bearer <YOUR_TOKEN_HERE>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "My First Post",
    "content": "This is my first blog post!",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmed Ali",
      "email": "ahmed@example.com"
    },
    "isOwner": true
  }
}
```

---

### **6️⃣ UPDATE OWN POST - Edit Your Post (requires authentication + ownership)**

```
PUT http://localhost:3000/api/posts/507f1f77bcf86cd799439012
Content-Type: application/json
Authorization: Bearer <YOUR_TOKEN_HERE>

{
  "title": "My Updated First Post",
  "content": "Updated content!"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Post updated successfully",
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "My Updated First Post",
    "content": "Updated content!",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmed Ali",
      "email": "ahmed@example.com"
    },
    "isOwner": true
  }
}
```

---

### **7️⃣ DELETE OWN POST - Delete Your Post (requires authentication + ownership)**

```
DELETE http://localhost:3000/api/posts/507f1f77bcf86cd799439012
Authorization: Bearer <YOUR_TOKEN_HERE>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Post deleted successfully"
}
```

---

### **8️⃣ GET ALL USERS - Admin Only (requires authentication + admin role)**

```
GET http://localhost:3000/api/users
Authorization: Bearer <ADMIN_TOKEN_HERE>
```

**Response (200 OK) - if you're admin:**
```json
{
  "status": "success",
  "count": 2,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmed Ali",
      "email": "ahmed@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Response (403 Forbidden) - if you're NOT admin:**
```json
{
  "status": "error",
  "message": "You do not have permission to perform this action. Required role: admin"
}
```

---

## 🔴 Error Test Cases

### Test 1: Missing Authentication Header
```
GET http://localhost:3000/api/posts
(No Authorization header)
```

**Response (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "You are not logged in. Please log in to get access."
}
```

---

### Test 2: Invalid Token
```
GET http://localhost:3000/api/posts
Authorization: Bearer invalid_token_here
```

**Response (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Invalid token. Please log in again."
}
```

---

### Test 3: Try to Edit Someone Else's Post
```
PUT http://localhost:3000/api/posts/<SOMEONE_ELSE'S_POST_ID>
Authorization: Bearer <YOUR_TOKEN>

{ "title": "Hacking attempt!" }
```

**Response (403 Forbidden):**
```json
{
  "status": "error",
  "message": "You can only update your own posts"
}
```

---

### Test 4: Mismatched Passwords on Signup
```
POST http://localhost:3000/api/users/signup

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "passwordConfirm": "password456"
}
```

**Response (400 Bad Request):**
```json
{
  "status": "error",
  "message": "Passwords do not match"
}
```

---

### Test 5: Rate Limiting (100+ requests in 15 min)
After 100 requests from the same IP:

```
Response (429 Too Many Requests):
```json
{
  "status": "error",
  "message": "Too many requests from this IP, please try again after 15 minutes"
}
```

---

## 💡 Tips

1. **Always copy the token** from signup/login response
2. **Add Authorization header** to all protected routes
3. **Test with Postman** - easier than curl
4. **Create different users** to test isOwner flag
5. **Check timestamps** - posts have createdAt and updatedAt fields
