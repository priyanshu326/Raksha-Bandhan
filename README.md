
# 🪷 Happy Raksha Bandhan — Interactive Web Experience

An elegant and interactive **Raksha Bandhan greeting website** built using **HTML, CSS, and JavaScript**.

The project combines traditional Indian aesthetics with modern web animations, including animated mandalas, diyas, flower petals, smooth character entrances, decorative typography, and a soft musical experience.

---

## ✨ Features

* 🪷 Beautiful Raksha Bandhan themed interface
* 🌸 Animated falling flower petals
* 🕉️ Rotating mandala animation
* 🪔 Animated diya decorations
* 👧 Sister and 👦 Brother illustrations
* ✨ Smooth entrance animations
* 🇮🇳 Hindi Raksha Bandhan greeting
* 💛 Golden decorative typography
* 🎵 Interactive background sound
* 🔊 Sound On / Off control
* 🔄 Replay animation button
* 📱 Responsive design for mobile and desktop
* 🌑 Dark traditional Indian color theme
* 🎨 Custom Google Fonts
* 🖼️ Automatic black-background removal from character/diya images using JavaScript Canvas

---

## 🛠️ Technologies Used

| Technology    | Purpose                             |
| ------------- | ----------------------------------- |
| HTML5         | Website structure                   |
| CSS3          | Styling and animations              |
| JavaScript    | Interactive effects and audio       |
| Canvas API    | Falling petals and image processing |
| Web Audio API | Background bells and ambient sound  |
| Google Fonts  | Decorative typography               |

### Fonts Used

* Cinzel Decorative
* Cormorant Garamond
* Great Vibes
* Tiro Devanagari Hindi

---

## 📁 Project Structure

```text
raksha-bandhan/
│
├── index.html
├── style.css
├── script.js
│
└── assets/
    ├── background.png
    ├── mandala-cut.png
    ├── sister-cut.png
    ├── brother-flat.jpg
    └── diyas-cut.png
```

---

## 🚀 How to Run

### 1. Download or Clone the Project

Download the project files or clone the repository.

```bash
git clone <your-repository-url>
```

### 2. Open the Project Folder

Navigate into the project directory:

```bash
cd raksha-bandhan
```

### 3. Check the Assets

Make sure the `assets` folder exists and contains all required images:

```text
assets/
├── background.png
├── mandala-cut.png
├── sister-cut.png
├── brother-flat.jpg
└── diyas-cut.png
```

### 4. Run the Website

You can simply open:

```text
index.html
```

in your browser.

For the best development experience, use **VS Code + Live Server**.

---

## 🎬 How It Works

When the website opens, an introductory screen appears with a rotating mandala and a **"Begin the Ritual"** button.

After clicking the button:

1. The intro screen fades away.
2. The background gradually appears.
3. The mandala starts its animation.
4. The sister illustration enters from the left.
5. The brother illustration enters from the right.
6. Diyas appear at the bottom corners.
7. The Hindi greeting appears.
8. The main Raksha Bandhan title appears.
9. Flower petals continuously fall across the screen.
10. A soft musical/bell effect plays in the background.
11. The final message appears at the bottom.

---

## 🎵 Sound System

The project uses the browser's **Web Audio API**, so no external audio file is required.

The JavaScript generates:

* Ambient drone
* Bell sounds
* Multiple musical tones

The user can control the sound using the:

```text
Sound on / Sound off
```

button.

> Note: Modern browsers generally require user interaction before playing audio. That's why the sound starts after clicking **"Begin the Ritual"**.

---

## 🌸 Falling Petals

The falling petals are generated completely using JavaScript and the HTML5 Canvas API.

Each petal has randomly generated:

* Position
* Size
* Speed
* Rotation
* Direction
* Color
* Transparency
* Sway movement

This creates a continuously changing natural falling-petal effect without requiring additional image files.

---

## 🖼️ Image Processing

The JavaScript includes a `knockBlack()` function that detects dark/black background areas around the edges of selected images.

It uses:

```javascript
Canvas API
```

to make those background pixels transparent.

This is useful for images such as:

* Sister illustration
* Brother illustration
* Diyas

It allows the images to blend more naturally with the dark background.

---

## 📱 Responsive Design

The website includes responsive CSS for smaller screens.

The layout automatically adjusts:

* Character size
* Diya size
* Bottom message position
* Overall composition

The main breakpoint is:

```css
@media (max-width: 820px)
```

---

## 🌐 Browser Compatibility

The project is designed for modern browsers such as:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

For the best experience, use the latest version of Chrome or Edge.

---
## 💡 Future Improvements

Some possible improvements for future versions:

* 🎆 Add fireworks effects
* 🪔 Add animated diya flames
* ❤️ Add personalized sister/brother names
* 📸 Add a photo upload feature
* 🎁 Add an animated Rakhi
* 🎵 Add traditional background music
* 🌙 Add multiple visual themes
* 📱 Create a shareable greeting link
* 💌 Add personalized Raksha Bandhan messages
* 🎨 Add more Indian festival themes
* 🌐 Deploy the project online using GitHub Pages

---

## 👨‍💻 Author

**Priyanshu Prajapati**

B.Tech CSE (Artificial Intelligence) Student

Interested in:

* Web Development
* Artificial Intelligence
* Machine Learning
* Software Engineering
* Creative Web Experiences

---

## 📄 License

This project is created for **educational, creative, and personal use**.

You are free to modify the source code and customize the design for your own projects.

---

## ❤️ Made With

**HTML + CSS + JavaScript + Creativity**

> "A thread of love, a promise of protection — may this sacred bond last forever." 🪷


