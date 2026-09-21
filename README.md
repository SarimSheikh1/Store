# Four Partners Mart - E-Commerce Website

A complete, modern, responsive Next.js 14 e-commerce website for Four Partners Mart.

## Project Structure
- `app/` — Next.js App Router pages (Home, Products, Cart, Checkout, Admin, etc.)
- `components/` — Reusable React components (UI primitives, Layout, Home sections)
- `context/` — Global React state (CartContext, ToastContext)
- `data/` — Local data files (Products, Categories, Packages, Partners)
- `lib/` — Shared utilities (Config, WhatsApp generator, Local order storage)

## How to Run Locally

### Step 1: Install Node.js
If you haven't already, download and install [Node.js (LTS version)](https://nodejs.org/).

### Step 2: Open Project in VS Code
Open this folder (`store`) in Visual Studio Code.

### Step 3: Install Dependencies
Open the integrated terminal in VS Code (Terminal -> New Terminal) and run:
\`\`\`bash
npm install
\`\`\`

### Step 4: Run the Development Server
Run this command in the terminal:
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Step 5: Change Business Information
Open `lib/config.js`. You can change the business name, tagline, address, delivery fees, and social media links here.

### Step 6: Add or Edit Products
Open `data/products.js`. You can add new products, update prices, or change stock levels. The frontend will automatically reflect these changes.

### Step 7: Change Prices
To run a sale, add a `salePrice` property to a product in `data/products.js` that is lower than the `price`. The website will automatically calculate and display the discount percentage.

### Step 8: Add Real WhatsApp Number
Open `.env.local` (create it if it doesn't exist) or simply go to `lib/config.js` and replace `'YOUR_WHATSAPP_NUMBER'` with your actual WhatsApp Business number (e.g., `923001234567`). 

### Step 9: Connect a Real Database Later
Currently, orders are saved to `localStorage` in the browser for demo purposes.
To add a real database (like MongoDB or Postgres):
1. Create API routes in `app/api/orders/route.js`.
2. Update the functions in `lib/orders.js` to use `fetch()` calls to your API instead of `localStorage`.
3. Set up NextAuth.js to protect the `/admin` route.

### Step 10: Deploy to a Live Server
The easiest way to deploy a Next.js app is using [Vercel](https://vercel.com).
1. Create a GitHub repository and push this code.
2. Log into Vercel and import the repository.
3. Add any environment variables (like `NEXT_PUBLIC_WHATSAPP_NUMBER`).
4. Click Deploy.
