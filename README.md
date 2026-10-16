# Scroll Car Animation — Itzfizz Digital Internship Assignment

A React.js web animation project developed as part of my Web Development Internship assignment for Itzfizz Digital. The project recreates a scroll-driven hero section inspired by the [reference animation](https://paraschaturvedi.github.io/car-scroll-animation), focusing on smooth motion, interactive scrolling, and a clean user interface.

## Project Overview

The website features a car that moves horizontally as the user scrolls through the hero section. The animation is synchronized with the scroll position, creating an interactive visual experience.

### Features

- **Scroll-driven car animation:** The car moves horizontally in response to the user's scroll position.
- **Animated green trail:** A green line extends behind the car as it moves.
- **Letter-by-letter headline reveal:** Letters in "WELCOME ITZFIZZ" appear as the car passes their positions.
- **Animated statistics:** Four statistic cards appear progressively during scrolling.
- **Smooth entrance animations:** Headline and statistics use fade and movement effects.
- **Responsive styling:** Layout and typography adapt to different screen sizes.
- **Reduced-motion support:** Provides an alternative experience for users who prefer reduced animation.
- **Clean React structure:** Reusable components and separate animation logic make the code easier to maintain.

## Technologies Used

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- GSAP
- GSAP ScrollTrigger
- Vite
- Git and GitHub

## Project Structure

```text
car-scroll/
├── public/
│   └── mclaren-top-view.png
├── src/
│   ├── animations/
│   │   └── scrollCarAnimation.js
│   ├── components/
│   │   ├── ScrollCarSection.jsx
│   │   ├── ScrollCarSection.css
│   │   └── StatCard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## How It Works

### Scroll-Based Animation

GSAP ScrollTrigger connects the car's horizontal movement to the user's scroll progress. The animation uses transforms to move the car smoothly while the green trail follows its position.

### Headline Animation

The headline is divided into individual letters. Their visibility changes as the car moves across the screen, creating a progressive reveal effect.

### Statistics Animation

The statistic cards appear at different points during the scroll interaction. Their opacity transitions are synchronized with the animation timeline.

### Animation Lifecycle

The animation logic is organized separately from the React components. GSAP context cleanup helps prevent duplicate animations and ScrollTrigger instances when components are re-rendered or unmounted.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Anyaporwal/itfizz.git
cd itfizz
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173/`.

### Create a Production Build

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

Open the URL displayed by Vite to inspect the production build locally.

## Deployment on GitHub Pages

I use GitHub Pages to host the project as a public website.

### Step 1: Configure Vite

Open `vite.config.js` and set the repository base path to `/itfizz/`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/itfizz/',
})
```

The base path must match the repository name. If the repository has a different name, update it accordingly.

### Step 2: Install the Deployment Package

Run:

```bash
npm install -D gh-pages
```

### Step 3: Update `package.json`

Add the deployment scripts to the existing `scripts` object, preserving the other scripts and dependencies:

```json
{
  "homepage": "https://anyaporwal.github.io/itfizz/",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Keep the existing project dependencies and any other required configuration in `package.json`. Do not replace the entire file if it contains additional required settings.

### Step 4: Push the Project to GitHub

If the repository has not been connected to GitHub yet, run:

```bash
git init
git add .
git commit -m "Build scroll-driven car animation"
git branch -M main
git remote add origin https://github.com/Anyaporwal/itfizz.git
git push -u origin main
```

If the Git repository and remote already exist, simply commit and push your changes:

```bash
git add .
git commit -m "Prepare project for GitHub Pages"
git push
```

Do not add the same remote again if it is already configured.

### Step 5: Deploy

Run:

```bash
npm run deploy
```

This builds the application and publishes the contents of the `dist` directory to the `gh-pages` branch.

### Step 6: Enable GitHub Pages

1. Open the repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under the build and deployment settings, select **Deploy from a branch**.
4. Select the `gh-pages` branch and the `/(root)` folder.
5. Save the settings.
6. Wait for the deployment to complete.

### Step 7: Verify the Live Website

Once deployment is complete, open:

**https://anyaporwal.github.io/itfizz/**

Verify that the page loads correctly, the car image is visible, the animations respond to scrolling, and there are no broken assets.

If you update the project later, push the changes and run `npm run deploy` again.

## Future Improvements

- Further refine animation timing and responsive positioning.
- Improve performance on smaller devices.
- Test the production deployment across additional browsers and screen sizes.
- Fine-tune the visual details against the original reference.

## Author

**Anya Porwal**

GitHub: [Anyaporwal](https://github.com/Anyaporwal)

Project repository: [itfizz](https://github.com/Anyaporwal/itfizz)

This project demonstrates my practical work with React components, CSS styling, JavaScript animation logic, GSAP ScrollTrigger, responsive design, and frontend deployment.