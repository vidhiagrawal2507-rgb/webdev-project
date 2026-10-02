LIVE DEPLOYED LINK : https://webdev-project-project-showcase.vercel.app/

# DevShow - Project Showcase & Feedback Board

A beginner-friendly, minimal, and premium Project Showcase and Feedback Board built purely with standard web technologies. This application allows users to submit their projects, browse a feed of community projects, like them, and leave comments—all without needing a backend or database.

## 🚀 Features

- **Project Submission:** Easily submit projects with a title, description, category tag, and demo link.
- **Dynamic Project Feed:** View all submitted projects as beautifully styled, modern cards.
- **Tag Filtering & Search:** Instantly filter projects by tags (Web, AI, Mobile) or search by title and description.
- **Liking System (Spam Protected):** Users can like projects. The system remembers the user and prevents them from liking the same project multiple times.
- **Commenting System:** Users can add short feedback comments to any project.
- **Data Persistence:** All data (projects, likes, comments, and the active user session) is saved directly in your browser using the `localStorage` API. It remains completely intact even if you refresh or close the page.
- **Responsive & Clean UI:** A fully responsive, soft, and minimal design inspired by nature, prioritizing a calm user experience.

## 🛠️ Tech Stack

This project was intentionally built without external libraries, databases, or frameworks to serve as a clean, understandable example of frontend fundamentals.

- **HTML5:** Semantic and accessible page structure.
- **CSS3:** Custom styling using CSS variables, Flexbox, CSS Grid, and responsive media queries (No Tailwind, Bootstrap, etc.).
- **Vanilla JavaScript (ES6+):** Core application logic, DOM manipulation, and event handling (No React, Vue, jQuery).
- **LocalStorage API:** Used as a client-side database to persist state across sessions.

## 💻 Setup Instructions

Because this project relies entirely on client-side technologies, there is no build step, node server, or database to configure. 

1. **Clone or Download the Repository:**
   Download the project folder containing `index.html`, `style.css`, and `script.js` to your local machine.

2. **Open the Application:**
   Simply double-click the `index.html` file to open it in your default web browser.
   
   *Alternatively, if you are using a code editor like VS Code, you can use the "Live Server" extension to serve the files.*

## 📖 Usage Guide

1. **First Visit:** Upon opening the site for the first time, you will be prompted to enter a simple username. This acts as your identity for liking and commenting.
2. **Browsing:** Scroll through the feed to see sample projects. Use the search bar or the category buttons (All, Web, AI, Mobile) to find specific projects.
3. **Submitting a Project:** Scroll to the bottom to find the "Submit a Project" form. Fill in the details and click submit. It will immediately appear at the top of the feed.
4. **Liking & Commenting:** Click the "Like" button on any card to upvote it (clicking again removes your like). Type in the comment box and hit "Post" to leave feedback on a project.

---
*Built with simplicity and elegance in mind.*
