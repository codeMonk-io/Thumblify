# Thumblify 🚀

Thumblify is a powerful, AI-driven thumbnail generation platform designed to help content creators, marketers, and developers generate eye-catching visuals in seconds. By leveraging advanced image generation models and a sleek, modern interface, Thumblify simplifies the process of creating professional thumbnails for YouTube, social media, and more.

![Thumblify Banner](https://via.placeholder.com/1200x400?text=Thumblify+-+AI+Thumbnail+Generator)

## ✨ Key Features

- **AI-Powered Generation**: Uses Pollinations.ai API to generate high-quality images from text prompts.
- **Style Presets**: Choose from predefined styles like *Bold & Graphic*, *Tech/Futuristic*, *Minimalist*, *Photorealistic*, and *Illustrated*.
- **Color Schemes**: Customize your thumbnails with themes like *Vibrant*, *Sunset*, *Neon*, *Ocean*, *Pastel*, and more.
- **Aspect Ratio Support**: Generate thumbnails in various sizes, including 16:9 (YouTube), 1:1 (Social Posts), and 9:16 (Shorts/Reels).
- **User Authentication**: Secure login and signup system using Express sessions and MongoDB.
- **Personal Dashboard**: Save and manage all your generated thumbnails in one place.
- **Cloud Storage**: Seamlessly integrated with Cloudinary for fast and reliable image hosting.
- **Premium UI**: Built with React 19, Framer Motion for smooth animations, and Tailwind CSS 4 for a modern look.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: JWT
- **Image Generation**: [Pollinations.ai](https://pollinations.ai/)
- **Storage**: [Cloudinary](https://cloudinary.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/thumblify.git
cd thumblify
```

### 2. Setup Server
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Setup Client
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application
In separate terminals:

**Start Server:**
```bash
cd server
npm run server
```

**Start Client:**
```bash
cd client
npm run dev
```

## 📂 Project Structure

```text
Thumblify/
├── client/              # React frontend
│   ├── src/             # Application source code
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views
│   │   └── context/     # State management
│   └── public/          # Static assets
├── server/              # Node.js backend
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── configs/         # Database and service configs
└── README.md            # You are here!
```

## 📜 License
This project is licensed under a custom PrebuiltUI Template License. Please refer to [LICENSE.txt](LICENSE.txt) for the full terms and conditions.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
Built with ❤️ by [Your Name/Team]
