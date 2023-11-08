# Sports-Center React Application

Welcome to the Sports-Center React Application repository! This application is part of my capstone project of WD301. It is built using React and TypeScript.
## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)

## Features

1. **News Articles**
   Stay updated with the latest news articles for various sports. Filter the news based on selected sports to keep yourself informed.

2. **Filter News**
   Customizing news feed and matches by selecting specific sports and teams.

3. **Match Scores**
   Real-time scores for a wide range of sports are available. Refresh live scores to stay up-to-date with ongoing matches.

4. **Favorites**
   Once a user logs in, they have the option to save specific news articles and match updates. These saved items are conveniently organized in a favorites tab, 
   making it easy for users to navigate back to their preferred news articles and match details whenever they want.

5. **Change Password**
   Users can change their account password .

6. **Dark Mode**
   Toggle between light and dark modes for user comfort while using the application.

## Getting Started

### Installation

1. **Clone the Repository:**
    ```
    git clone https://github.com/Mahendar0701/SportsCenter
    ```

2. **Navigate to the Project Directory:**
    ```
    cd SportsCenter
    ```

3. **Install Dependencies:**
    ```
    npm install
    ```

4. **Run the App:**
    ```
    npm run dev
    ```

Access the app at [http://localhost:5173](http://localhost:5173) on your web browser.

## Usage

Upon launching the app, access live scores and news articles on the landing screen. Create an account or log in to filter content based on your preferences. Save favorite sports and articles for easy access.

## Customization

### Account Creation

- Click "Sign Up" in the Profile Icon to create a new account with a username and password.
- If you already have an account, click "Sign In."

### Customize Preferences

- After logging in, visit your profile settings to customize favorite sports and teams.

### Save Favorites

- While viewing live scores or news articles, use the "Save" or "Remove" button to manage items in your favorites.

### Dark Mode

- Toggle between dark and light modes for user comfort in the App Bar.

### Change Password

- In the profile settings, change your account password for improved security.

Check out the deployed website for Sports-Center [Sports-Center](https://sports-center-mahendar07.netlify.app/)

Screenshots of the Sports-Center React Application.

![image](https://github.com/Mahendar0701/SportCenter/assets/119734520/f95a2b42-f57f-4dc3-938a-1c4d5ddfed55)

![image](https://github.com/Mahendar0701/SportCenter/assets/119734520/aa905515-18aa-4842-a074-5831828483ad)

![image](https://github.com/Mahendar0701/SportCenter/assets/119734520/c55ef369-56ff-47ac-b894-26c0c41fdba1)

![image](https://github.com/Mahendar0701/SportCenter/assets/119734520/9dc40235-8c4d-4dff-b830-cbb799a8b1e2)

![image](https://github.com/Mahendar0701/SportCenter/assets/119734520/23885cba-9cbf-473e-b9e7-7cddb3c32d43)

![image](https://github.com/Mahendar0701/SportCenter/assets/119734520/12ec98d5-058c-4759-b3b0-2dbeaf2da0a7)

![image](https://github.com/Mahendar0701/SportCenter/assets/119734520/b373fed4-0b60-4740-9612-e4fdc0e110a6)






# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
