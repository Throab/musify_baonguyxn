# Musify Frontend

Frontend for **Musify**, a music streaming web application where users can discover, search, and manage their favorite music.

## 🌐 Live Demo

https://musifybaonguyxn.vercel.app/

The Musify application is deployed using **Vercel** for the frontend and **Render** for the backend.

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary

---

## 🚀 Features

- 🎵 Browse popular songs
- 🔎 Search for songs
- ❤️ Like / unlike songs
- ⏰ Add songs to Listen Later
- 📂 Create and manage playlists
- 🎧 Play music directly from the application
- 👤 View user profiles
- 🎤 View artist profiles
- 📤 Upload songs
- 🔗 Share songs and playlists
- 🔐 User login and registration
- 📱 Responsive design for desktop and mobile
- 📄 Paginated song listing
- 🔔 Toast notifications
- 🖼️ Song thumbnails and user avatars

---

## 🛠️ Technologies

- React
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Toastify
- Vite
- JavaScript

---

## 📁 Project Structure

```text
Sbortify-frontend/
│
├── public/
│
├── src/
│   ├── API/
│   │   ├── axiosInstance.js
│   │   ├── favoriteAPI.js
│   │   ├── listenLaterAPI.js
│   │   ├── songAPI.js
│   │   └── userAPI.js
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── constant/
│   │
│   ├── components/
│   │   ├── Layout/
│   │   ├── songs/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── Search.jsx
│   │   ├── Favorite.jsx
│   │   ├── Playlist.jsx
│   │   ├── ListenLater.jsx
│   │   ├── UserPage.jsx
│   │   ├── ArtistProfile.jsx
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
└── README.md
```
