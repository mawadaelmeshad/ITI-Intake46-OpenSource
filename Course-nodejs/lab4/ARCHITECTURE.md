# 🏗️ Lab 4: Architecture & Flow Explanation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Postman/Browser)                  │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
                    Authorization: Bearer <JWT>
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY MIDDLEWARES                         │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐      │
│  │ Rate Limiter │  │    Helmet     │  │ Mongo Sanitize   │      │
│  │  (100 req)   │  │  (headers)    │  │   (injections)   │      │
│  └──────────────┘  └───────────────┘  └──────────────────┘      │
│  ┌──────────────┐  ┌───────────────┐                             │
│  │  XSS Clean   │  │      HPP      │                             │
│  │  (scripts)   │  │  (pollution)  │                             │
│  └──────────────┘  └───────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                         ROUTER LAYER                             │
│  ┌────────────────────┐      ┌────────────────────┐             │
│  │  /api/users/       │      │  /api/posts/       │             │
│  │  - signup          │      │  - GET (all)       │             │
│  │  - login           │      │  - GET :id         │             │
│  │  - GET (admin)     │      │  - POST (create)   │             │
│  └────────────────────┘      │  - PUT :id (edit)  │             │
│                              │  - DELETE :id      │             │
│                              └────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE LAYER                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ auth.js - JWT Verification Middleware                   │   │
│  │ ✓ Extracts token from Authorization header             │   │
│  │ ✓ Verifies token signature and expiration              │   │
│  │ ✓ Confirms user still exists in database               │   │
│  │ ✓ Sets req.user with authenticated user data            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ restrictTo.js - Role-Based Authorization Middleware     │   │
│  │ ✓ Checks if req.user.role matches allowed roles         │   │
│  │ ✓ Returns 403 Forbidden if not authorized               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ validate.js - Request Validation Middleware             │   │
│  │ ✓ Validates request body against schemas                │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                              │
│  ┌────────────────────┐      ┌────────────────────┐             │
│  │  usersController   │      │  postsController   │             │
│  │  - signup()        │      │  - getPosts()      │             │
│  │  - login()         │      │  - getPostById()   │             │
│  │  - getAllUsers()   │      │  - createPost()    │             │
│  └────────────────────┘      │  - updatePostId()  │             │
│                              │  - deletePostId()  │             │
│                              └────────────────────┘             │
│  Business logic: bcrypt, JWT generation, authorization checks  │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MODEL LAYER (Mongoose)                        │
│  ┌────────────────────┐      ┌────────────────────┐             │
│  │  User Model        │      │  Post Model        │             │
│  │  - name            │      │  - title           │             │
│  │  - email           │      │  - content         │             │
│  │  - password        │      │  - userId (ref)    │             │
│  │  - role            │      │  - createdAt       │             │
│  │  - timestamps      │      │  - updatedAt       │             │
│  └────────────────────┘      └────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER (MongoDB)                      │
│  ┌────────────────────┐      ┌────────────────────┐             │
│  │  users collection  │      │  posts collection  │             │
│  │  (10 documents)    │      │  (100 documents)   │             │
│  └────────────────────┘      └────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Examples

### **Example 1: Signup Flow**

```
CLIENT REQUEST:
POST /api/users/signup
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "password": "pass123",
  "passwordConfirm": "pass123"
}
                                 ↓
SECURITY MIDDLEWARES:
✓ Rate limiter - OK (within limit)
✓ Helmet - OK (adds headers)
✓ Mongo sanitize - OK (input cleaned)
✓ XSS clean - OK (no scripts)
✓ HPP - OK (no duplicate params)
                                 ↓
ROUTER:
POST /users/signup → usersController.signup()
                                 ↓
CONTROLLER (signup):
1. Validate passwords match
2. Check if email already exists
3. Hash password with bcrypt (10 rounds)
4. Create user in database
5. Generate JWT token (valid 7 days)
6. Return token + user data
                                 ↓
CLIENT RESPONSE (201 Created):
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiI...",
  "user": { "id": "507f1f77...", "name": "Ahmed", ... }
}
```

---

### **Example 2: Create Post Flow**

```
CLIENT REQUEST:
POST /api/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
{
  "title": "My Post",
  "content": "Great content!"
}
                                 ↓
SECURITY MIDDLEWARES:
✓ All security checks pass
                                 ↓
ROUTER:
POST /posts → auth middleware
                                 ↓
AUTH MIDDLEWARE:
1. Extract token from "Bearer ..." header
2. Verify token signature and expiration
3. Find user in database
4. Set req.user = { _id: "507f...", email: "ahmed@...", role: "user" }
5. Call next() → controller
                                 ↓
CONTROLLER (createPost):
1. Get title, content from req.body
2. Get userId from req.user._id (NEVER from body!)
3. Create post: { title, content, userId }
4. Save to database
5. Populate user data
6. Return post with isOwner: true
                                 ↓
CLIENT RESPONSE (201 Created):
{
  "status": "success",
  "post": {
    "_id": "607f...",
    "title": "My Post",
    "content": "Great content!",
    "userId": { "_id": "507f...", "name": "Ahmed", ... },
    "isOwner": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### **Example 3: Failed Update (Not Owner) Flow**

```
CLIENT REQUEST:
PUT /api/posts/607f1234567890abcdef1234
Authorization: Bearer <AHMED'S_TOKEN>
{
  "title": "I'm hacking this post!"
}
                                 ↓
SECURITY MIDDLEWARES:
✓ Pass
                                 ↓
AUTH MIDDLEWARE:
✓ Token valid
✓ req.user = Ahmed's data
                                 ↓
CONTROLLER (updatePostId):
1. Find post: 607f1234... (belongs to Sara, not Ahmed)
2. Check: post.userId != req.user._id
3. Return error!
                                 ↓
ERROR HANDLER:
Response 403 Forbidden:
{
  "status": "error",
  "message": "You can only update your own posts"
}
```

---

### **Example 4: Get All Users - Unauthorized Flow**

```
CLIENT REQUEST:
GET /api/users
Authorization: Bearer <USER_TOKEN>  (user role, not admin)
                                 ↓
AUTH MIDDLEWARE:
✓ Token valid
✓ req.user = { role: "user", ... }
                                 ↓
ROUTER:
GET /users → auth middleware ✓ → restrictTo('admin') ✓ → controller
                                 
WAIT! restrictTo checks:
- req.user.role = "user"
- Required roles = ["admin"]
- "user" NOT in ["admin"]
- Return 403!
                                 ↓
ERROR HANDLER:
Response 403 Forbidden:
{
  "status": "error",
  "message": "You do not have permission to perform this action. Required role: admin"
}
```

---

## Security Layers Summary

| Layer | What | Why |
|-------|------|-----|
| **Transport** | HTTPS (in production) | Encrypt data in transit |
| **Headers** | Helmet | Prevent header-based attacks |
| **Rate Limit** | 100 req/15min | Prevent brute force & DDoS |
| **Input** | Mongo sanitize, XSS clean | Prevent injections & XSS |
| **Authentication** | JWT tokens | Verify user identity |
| **Authorization** | Roles (admin/user) | Verify user permissions |
| **Database** | Password hashing (bcrypt) | Secure stored passwords |
| **Logic** | Ownership checks | Verify user owns resource |

---

## JWT Token Structure

```
Header.Payload.Signature
↓       ↓         ↓
ey...   ey...     ey...

PAYLOAD (decoded):
{
  "id": "507f1f77bcf86cd799439011",      // User ID
  "email": "ahmed@example.com",          // User email
  "role": "user",                        // User role
  "iat": 1642254600,                     // Issued at (timestamp)
  "exp": 1642859400                      // Expires in 7 days
}

When exp < current time → Token expired!
```

---

## Key Security Concepts

### 1. **Hashing vs Encryption**
```
Password: "password123"

HASHING (one-way):
password123 → bcrypt → $2b$10$N9qo8uLO... (can't reverse!)

ENCRYPTION (reversible with key):
password123 + key → encrypt → aX2dP5w6x (can decrypt with key)

Passwords use HASHING because:
✓ If database hacked, passwords still safe
✓ Even admin can't see original password
```

### 2. **JWT vs Sessions**
```
SESSION (stateful):
1. Store user data on server in memory/redis
2. Send session ID in cookie to client
3. Server looks up session ID for each request
Problem: Doesn't scale across multiple servers

JWT (stateless):
1. Encode user data in token
2. Client sends token in header for each request
3. Server verifies token signature (no database lookup)
Benefit: Scales across multiple servers easily
```

### 3. **Ownership Verification**
```
When deleting post:
❌ WRONG: if (req.params.id === "123") delete()
✓ RIGHT: if (post.userId === req.user._id) delete()

Why? Because:
- req.params can be manipulated by client
- post.userId comes from database (trusted)
- req.user._id verified by JWT (trusted)
```

---

## Error Status Codes Used

- `200` - Success (GET, successful response)
- `201` - Created (POST, resource created)
- `400` - Bad Request (validation failed)
- `401` - Unauthorized (not logged in / invalid token)
- `403` - Forbidden (logged in but no permission)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (email already exists)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error (server error)

