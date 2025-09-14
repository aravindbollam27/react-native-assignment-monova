# React Native Assignment – Monova

This project replicates the reference UI and interaction flow using **Expo (React Native Web)** with mocked JSON data and state management.

---

##  Live Demo
- **Expo Snack Link**: https://snack.expo.dev/@aravindbollam27/manova-react-native-assignment-  
- **GitHub Repo**: https://github.com/aravindbollam27/react-native-assignment-monova

---

## Features
- **Three main tabs**:  
  - **Collections** → Shows Work / Leisure / Date Night combos (Top + Bottom + Accessory), with tag filters.  
  - **Outfits** → Clean card view of styled outfits (no filters).  
  - **Items** → Grid of all clothing items with interactive filters (Type, Style, Mood, Color).  

- **Interactive filters**:  
  - Filter items by category, style, mood, or color.  
  - Active filters displayed as chips.  

- **Outfit/Collection combos**:  
  - Always include **Top + Bottom + Accessory**.  
  - No repeated items within the same tag preview.  

- **Add New Combo**:  
  - Interactive `+ Add new` chip opens a modal to create your own combos.  

- **Polished UI**:  
  - Pixel-perfect cards with images, titles, and category badges.  
  - Smooth scroll views and responsive layout.  

---

## Tech Stack
- **React Native** with **Expo** (Snack environment)  
- **TypeScript** for type safety  
- **React Native Picker** for dropdowns  
- **React Native Animated API** (for smooth interactions, optional)  

---
##  Project Structure
react-native-assignment/
│
├── App.tsx # Main app file (tabs, navigation, state, UI)
├── index.ts # Entry point
├── package.json # Dependencies
├── tsconfig.json # TypeScript config
├── README.md # Documentation (this file)
│
├── assets/ # Images used in the app
│ ├── beige-trouser.jpg
│ ├── black-crop-top.jpg
│ ├── black-jeans.jpg
│ ├── brown-bag.jpg
│ ├── brown-sandals.jpg
│ ├── brown-trousers.jpg
│ ├── casual-brown-tshirt.jpg
│ ├── denim-crop-top.jpg
│ ├── denim-shorts.jpg
│ ├── earrings.jpg
│ ├── gold-earrings.jpg
│ ├── green-dress.jpg
│ ├── grey-tshirt.jpg
│ ├── knit-top.jpg
│ ├── lemon-dress.jpg
│ ├── light-brown-flats.jpg
│ ├── navy-blue-jeans.jpg
│ ├── printed-blouse.jpg
│ ├── red-earrings.jpg
│ ├── round-bag.jpg
│ ├── sky-tee.jpg
│ ├── small-bag.jpg
│ ├── striped-shirt.jpg
│ ├── sunglasses.jpg
│ ├── tote-bag.jpg
│ └── wide-leg-trousers.jpg
│
└──app.json
├── Index.ts
└── AssetExample.js

---

## ⚡ Setup & Run

### Install dependencies
1. Clone the repo:
   ```bash
   git clone https://github.com/aravindbollam27/react-native-assignment-monova.git
   cd react-native-assignment-monova
   
### Install dependencies
npm install

### Start Expo 
npx expo start

### Run the project 
Press w → Run in your browser with Expo Web.
Scan QR code with Expo Go app on iOS/Android.

