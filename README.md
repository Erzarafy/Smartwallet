# SmartWallet

An introduction to **SmartWallet**, a personal cash flow app that helps people track transactions, understand their finances, and plan ahead.

## Website features

- Responsive design for desktop and mobile.
- Visual cash flow, income, and expense summaries.
- Information about transaction tracking, budgets, and financial goals.
- An introduction to the AI chatbot and answers to frequently asked questions.
- Easy-to-use navigation, including a dedicated mobile menu.
- Direct download of the SmartWallet Windows application.

## Preview locally

This website uses plain HTML, CSS, and JavaScript. No packages or build process are required.

1. Download or clone this repository.
2. Open `index.html` in a browser.

The **Download SmartWallet For Windows** buttons open the SmartWallet download page on Google Drive.

To preview the website using Python's local web server, run this command from the repository folder:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000> in your browser.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. The workflow publishes the website whenever you push to the `main` branch, or when you run it manually.

1. Create a GitHub repository and upload the contents of this folder to its `main` branch. Include `index.html`, `logo_smartwallet.png`, and the `.github` folder.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push a change to `main`, or run the workflow manually from the **Actions** tab.
5. After the workflow succeeds, find your website URL in **Settings → Pages**.

## Folder structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── logo_smartwallet.png
├── script.js
└── style.css
```

## Technologies

- HTML5
- CSS3
- JavaScript
- GitHub Actions and GitHub Pages

DM Sans and Plus Jakarta Sans are loaded from Google Fonts. If you are offline, your browser will use a sans-serif fallback.
