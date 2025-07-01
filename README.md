# 🧠 DeepSeek Clone

A full-stack AI chatbot application inspired by **DeepSeek**, powered by Google’s **Gemini Pro API**. Built using **Next.js (App Router)**, **Clerk for authentication**, and **MongoDB**, this project recreates the real-time chat experience of modern AI tools, with elegant UI, chat history persistence, and smooth transitions.

This project not only simulates a real AI chat interface, but also served as a great hands-on learning experience in full-stack development, API integration, and scalable architecture.

---

## 🌟 Features

- **Gemini API Integration:** Leverages Google’s Gemini Pro API to generate intelligent responses.
- **Clerk Authentication:** Secure login/logout, with user-specific chat access.
- **Real-time Typing Animation:** Assistant responses are revealed token-by-token.
- **Persistent Chat History:** User messages stored and retrieved from MongoDB.
- **Chat Management:** Rename, delete, and create chats with a clean sidebar UI.
- **Toast Feedback:** Get instant feedback on errors and actions.
- **Fully Responsive:** Optimized for mobile, tablet, and desktop.
- **Dark Themed UI:** Clean and modern user experience.

---

## 🖥️ Tech Stack

- **Frontend:** React (via Next.js 14 App Router)
- **Authentication:** Clerk
- **Database:** MongoDB + Mongoose
- **AI:** Gemini Pro via `@google/genai`
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **Notifications:** react-hot-toast

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas or local MongoDB
- Google Gemini API key
- Clerk account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/deepseek-gemini-clone.git
   cd deepseek-gemini-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root:
   ```env
   CLERK_SECRET_KEY=your_clerk_secret
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`

---

## ✍️ What I Learned

While building this project, I gained valuable experience in:

- Integrating and managing external APIs (Gemini by Google)
- Working with protected routes and secure user data (Clerk)
- Structuring scalable React apps using Context and modular components
- Managing asynchronous state updates for live UI updates
- Creating responsive and interactive UIs with Tailwind CSS
- Debugging tricky API and UI edge cases

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/c0d834a7-aada-4e7b-b913-a449ac2f94d2)
![image](https://github.com/user-attachments/assets/ff1a2fee-aab6-424e-bd5d-a693d8f78786)



---

## 🤝 Contributions

Have ideas to improve this clone or want to extend its capabilities? Feel free to fork, raise issues, or submit pull requests!
