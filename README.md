# 🧾 Budget Generator - React App

This is a web application built with **React**, **TypeScript**, **TailwindCSS**, and **Framer Motion** that allows users to create customized budgets based on selected services. It includes features like dynamic page and language selection, discount application, budget saving, filtering, and sorting.

---

## 🚀 Demo

Coming soon...

---

## 🛠️ Technologies Used


- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat-square)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)
- ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-EF008F?logo=framer&logoColor=white&style=flat-square)
- ![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white&style=flat-square) + ![Testing Library](https://img.shields.io/badge/-Testing%20Library-E33332?logo=testing-library&logoColor=white&style=flat-square)
- ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router&logoColor=white&style=flat-square)
---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BauveR/Sprint-6-React.git

cd Sprint-6-React
npm install
npm run dev

```

## 🧪 Run Tests
To execute all tests:
npm run test

Or in watch mode:
npx vitest --watch

If you need to manually install testing dependencies:

npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom


## 📁 Project Structure

src/
├── components/         # Reusable UI components
├── context/            # Global state and context providers
├── hooks/              # Custom React hooks (e.g., useBudgetManager)
├── pages/              # Page views (e.g., Budget, Welcome)
├── types/              # Shared TypeScript types
├── App.tsx             # App router setup
├── main.tsx            # App entry point
└── index.css           # Tailwind and base styles


## ✅ Features

Select and customize services (web, SEO, Ads, etc.)
Adjust page and language counts dynamically
Apply discounts and calculate totals
Save and list budgets
Filter and sort by name or date
Generate shareable budget URLs
Fully unit-tested with Vitest and React Testing Library