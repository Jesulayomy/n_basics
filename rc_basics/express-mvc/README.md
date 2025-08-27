# Express MVC Application

A modern Express.js application built with MVC architecture, featuring user authentication, image uploads, and social media functionality.

## Features

- **User Authentication**: Login/signup with password hashing
- **Image Upload**: Cloudinary integration for image storage
- **Features**: Posts, comments, and likes
- **Modern Architecture**: MVC pattern with clean separation of concerns
- **Node.js 24 Compatible**: Uses modern async/await patterns and promises

## Tech Stack

- **Node.js**: 24.x or higher
- **Express.js**: 5.x - Web framework
- **MongoDB**: Database with Mongoose ODM
- **Passport.js**: Authentication middleware
- **Cloudinary**: Image upload and storage
- **EJS**: Template engine
- **Multer**: File upload handling
- **bcrypt**: Password hashing

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `template.env`
4. Set up your MongoDB database and Cloudinary account
5. Run the development server:

   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

- `PORT`: Server port (default: 3000)
- `DB_STRING`: MongoDB connection string
- `SECRET`: Session secret
- `CLOUD_NAME`: Cloudinary cloud name
- `API_KEY`: Cloudinary API key
- `API_SECRET`: Cloudinary API secret

## Project Structure

```markdown
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── public/          # Static assets
├── routes/          # Route definitions
├── views/           # EJS templates
└── server.js        # Application entry point
```

## Modern Patterns Used

- **Promises & Async/Await**: No callback patterns
- **ES6+ Features**: Modern JavaScript syntax
- **Error Handling**: Proper try-catch blocks
- **Security**: Input validation and sanitization
- **Performance**: Optimized database queries

## License

MIT License
