# 🧠 ConnectHub - Backend

The **backend API** for ConnectHub, a mini social networking platform where users can sign up, log in, create posts (text or images), and view a public feed.  
Built with **Node.js, Express, and MongoDB**, it provides secure authentication, structured REST APIs, and clean modular architecture.

---

## 🚀 Features

✅ **User Authentication**
- Register new users
- Secure login using JWT
- Protected routes with middleware

✅ **Post Management**
- Create, read, update, and delete posts
- Supports both text and image uploads
- Posts linked to the authenticated user

✅ **Public Feed**
- Fetch all posts (sorted by latest first)
- View posts by specific users

✅ **Secure APIs**
- JWT-based authentication for private routes
- Input validation and clean error handling

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) |
| Hosting | Render |
| Upload Handling | (Optional) Multer / Cloudinary (if enabled) |

---

## 📂 Folder Structure

connecthub-backend/
│
├── models/
│ ├── User.js
│ └── Post.js
│
├── routes/
│ ├── auth.js
│ └── posts.js
│
├── middleware/
│ └── auth.js
│
├── server.js
│
└── package.json


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/connecthub-backend.git
   cd connecthub-backend
2 Install dependencies

npm install


3. Set up environment variables
Create a .env file and add your MONGO_URI and JWT_SECRET.

4.Run the server

npm start


The server will start at http://localhost:5000

🧪 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description	Access
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	Log in user & get JWT token	Public
GET	/api/auth/me	Get logged-in user details	Private
📝 Post Routes
Method	Endpoint	Description	Access
GET	/api/posts	Fetch all posts	Public
GET	/api/posts/user/:userId	Get posts by user	Private
POST	/api/posts	Create new post (text/image)	Private
PUT	/api/posts/:id	Update post	Private
DELETE
/api/posts/:id
Delete post
Private

🌐 Deployment

Backend Deployed On: Render

Example Endpoint:
https://connecthub-backend-ark6.onrender.com/api/posts

🧰 Future Improvements

Add comments and likes on posts

Implement pagination in feeds

Integrate file uploads with Cloudinary

Enhance validation using JOI or Zod

👩‍💻 Author

Astha
Full Stack Developer Intern | ConnectHub
📧 Email: asthagod37@gmail.com

🌐 GitHub: asthaaaaa07
