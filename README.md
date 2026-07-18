<div align="center">
  <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  <h1 align="center">Enterprise HRM Frontend</h1>

  <p align="center">
    A beautiful, modern, glassmorphism-inspired UI for the Enterprise Human Resource Management system.
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>
</div>

---

## 🌟 About The Project

This is the official frontend application for the **Enterprise HRM System**. It is built from the ground up to provide a stunning, highly-responsive user experience with a custom dark-mode glassmorphism design system. 

The frontend seamlessly connects to our secure Spring Boot backend to manage employee data, roles, departments, and leave requests.

### 🎨 Design Philosophy
* **Glassmorphism**: Transparent, blurred panels overlaying dynamic backgrounds.
* **Modern Typography**: High contrast, highly legible fonts.
* **Premium Aesthetics**: Eschewing default component libraries for a completely custom, sleek CSS Module approach.

### 🛠️ Built With

* [![React][React.js]][React-url]
* [![Vite][Vite.js]][Vite-url]
* [![React Router][React-Router]][React-Router-url]
* [![CSS3][CSS3]][CSS3-url]

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Make sure you have Node.js installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/utkarsh-raj32/Enterprise-frontend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## 🔌 Backend Integration

This frontend is configured to communicate automatically with the Enterprise HRM Backend API hosted on Render.

If you are running the backend locally, update the `fetch` URLs in the context and API services from `https://enterprise-7txq.onrender.com` to `http://localhost:8080`.

---

## ☁️ Deployment

This project is fully optimized for **Vercel**. 

* Includes a `vercel.json` file for proper React Router SPA routing (preventing 404s on page refresh).
* The Vite build process (`npm run build`) is automatically detected by Vercel.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.js]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[React-Router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
