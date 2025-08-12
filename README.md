# FakeStore — Next.js Product Store

A simple responsive Next.js app that fetches products from a public API and displays them in a card grid with search and add-to-cart functionality.

## Features

- Fetches product data from a public API (`fakestoreapi.com`)  
- Responsive card grid layout with product images, titles, and prices  
- Client-side search filtering by product title  
- Add to Cart button with toast notifications and cart item count  
- Uses Next.js Image optimization with external domain config  
- Styled with Tailwind CSS  
- Toast notifications via React Toastify

## Tech Stack

- Next.js 13 (App Router, React 18)  
- TypeScript  
- Tailwind CSS  
- React Toastify  
- React Icons  

## Getting Started

### Prerequisites

- Node.js >= 16  
- npm or yarn  

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/fakestore.git
   cd fakestore
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Create a .env.local file in the project root with:

env
Copy
Run the development server:

bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.

Build for Production
bash
Copy
Edit
npm run build
npm run start
