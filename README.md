# ⚜️ The Alchemist

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Playfair+Display&weight=700&size=35&duration=3000&pause=1000&color=C5A059&center=true&vCenter=true&width=600&lines=The+Alchemist;Vibe+Coder+%26+AI+Architect;I+Don't+Just+Code%2C+I+Orchestrate" alt="Typing SVG" />
</p>

> **"I don't just type code; I orchestrate it."**

Welcome to the digital realm of **The Alchemist** — a next-generation developer portfolio and Resume platform built for the **Vibe Coder** era.

<p align="center">
  <img src="./public/logo.png" alt="Alchemist Logo" width="200" />
</p>

## 🔮 Overview

This is not a template. It is a statement. 
Built with **React**, **Three.js**, and **Taiwind CSS**, this project transforms a simple resume into an interactive storytelling experience.

### ✨ Features

- **🦾 The Vibe Coder Persona**: Radical honesty. Orchestration over syntax. Impact over output.
- **📜 Digital Alchemy Resume**: A fully editable, printable resume generator that adapts to your vibe.
  - **👁️ Live Preview**: See changes in real-time.
  - **🥡 PDF Export**: Generate high-quality A4 PDFs automatically.
  - **⚡ Dynamic Sections**: Skills, Hobbies (like Prompt Engineering!), and Experience.
- **🪐 3D Hero Scene**: A floating, interactive 3D ring (Ionic Ring) that captivates visitors instantly.
- **🕶️ Minimalist Aesthetic**: Gold accents on absolute black. Pure elegance.

## 🧩 Under the Hood

We use cutting-edge tech to deliver this experience:

### 🖥️ Cinematic Project Previews (iFrame Power)
Instead of static screenshots, the **Projects** section uses dynamic `<iframe>` integration to render **live websites** as cinematic backgrounds.
- When you hover over a project, the site loads in the background with a darkened filters (`grayscale` + `contrast`).
- This gives visitors a real "feel" of the project without leaving the portfolio.

### 🌌 The Ionic Ring (Three.js)
The floating ring isn't a video. It's a real-time **3D Scene** rendered with **React Three Fiber**.
- It reacts to your mouse movement.
- It provides deep spatial immersion using physically based rendering (PBR).

### 📄 PDF Generation Engine
We bypass standard browser printing. Using `html2pdf.js`, we take the DOM element of your resume and rasterize/vectorize it into a perfect A4 PDF, ensuring that what you see is *exactly* what recruiters get.

## 🛠️ The Stack

- **⚛️ Framework**: React + Vite
- **🎨 Styling**: Vanilla CSS (CSS Modules approach) + Tailwind concepts
- **🧊 3D Engine**: React Three Fiber / Drei
- **🎬 Animations**: Framer Motion
- **📑 PDF Engine**: html2pdf.js

## ⚡ Quick Start

1.  **📦 Install the magic**:
    ```bash
    pnpm install
    ```

2.  **🚀 Ignite the server**:
    ```bash
    pnpm dev
    ```

3.  **🌀 Transmute**:
    Open [http://localhost:5173](http://localhost:5173) and witness the alchemy.

## 📝 Usage

1.  **✏️ Edit Resume**: Go to `/the-alchemist` (or click "My Resume" on home).
2.  **🎛️ Customize**: Click the **"Open Editor"** button at the bottom.
3.  **📥 Export**: Click "Download PDF" to materialize your resume into a file.

---

<p align="center">
  <i>Crafted with 🖤 and ✨ by <a href="https://github.com/TDOMxHUNTER">Fazalurrehman</a></i>
</p>
