# Country Info App

A simple Node/Express + EJS app that lets users search for countries and view key information (flag, capital, population, region, currencies, languages, etc.) using the **REST Countries API**. UI is built with **Tailwind CSS**, supports **dark mode**, and includes a reusable EJS `countryCard` component.

---

## 🚀 What this project includes

- **Express server** (index.js)
- **EJS views + partials** (`views/`, `views/partials/`)
- **Reusable country card component**
- **Tailwind CSS build pipeline** (`public/css/input.css` → `public/css/output.css`)
- **Client-side JS** for card expand/collapse (`public/js/main.js`)
- **Dark mode support** (prefers-color-scheme)
- **Responsive, accessible and semantic markup**

---

## ✅ Features

- Search countries by name (full-text match)
- Displays:
  - Flag + alt text fallback
  - Capital, region, subregion
  - Population, dial code, landlocked status, driving side
  - Languages, currencies, time zones, demonyms
- Responsive design 
- Semantic markup + ARIA attributes
- Smooth card toggle behavior 
- Tailwind-based styling (with dark mode)

---

## 📁 Project structure

```
5.7 CP Use a Public API/
├── .gitignore
├── index.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── public/
│   ├── css/
│   │   ├── input.css
│   │   └── output.css
│   └── js/
│       └── main.js
└── views/
    ├── index.ejs
    └── partials/
        ├── countryCard.ejs
        ├── footer.ejs
        └── header.ejs
```

---

## 🏁 Local development

### 1) Install dependencies

```bash
npm install
```

### 2) Build Tailwind CSS

```bash
npm run build-css
```

### 3) Start the server

```bash
npm run dev
```

Open: `http://localhost:3000`

---

## 📌 Notes for fellow devs

### Tailwind setup
- Source: `public/css/input.css` (contains `@tailwind` directives)
- Output: `public/css/output.css` (linked in `views/index.ejs`)
- Don’t commit `output.css` if you want build-on-deploy; adjust `.gitignore` accordingly.

### Reusable component (country card)
- Located at `views/partials/countryCard.ejs`
- Rendered via:
  ```ejs
  <%- include('partials/countryCard', { country }) %>
  ```

### Data assumptions
- The API response is expected to be an array with at least one object.
- The server currently uses `/name/{country}` with `fullText=true` for exact match.
- Add guard clauses for missing data fields (optional future hardening).

---

## ✅ incoming improvements in V2.0 and 2.1

- Add options for search by capital / currency / language / region et al
- Support multiple results (render multiple cards)
- Add full support for secondary API that renders World news for "What's happening..." button
- Add manual dark-mode toggle (override `prefers-color-scheme`)
- Add rate limiting / request throttling

---