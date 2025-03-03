# MovieVault 🎬

A modern movie discovery platform built with Next.js 14, featuring real-time search, bookmarking, and detailed movie information.

🌐 **[Live Demo](https://movie-vault-jerkeyray.vercel.app)**

## Features

- 🔍 Real-time movie search with OMDB API integration
- 🎯 Advanced filtering and sorting options
- 📚 Personal bookmark system
- 🔐 GitHub authentication
- 🎨 Modern UI with Tailwind CSS
- 🖼️ Optimized image loading with next/image
- 🚀 Server-side rendering and API routes
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** NextAuth.js
- **Database:** Prisma with PostgreSQL
- **API Integration:** OMDB API
- **Icons:** Lucide Icons
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MovieVault.git
cd MovieVault
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create a .env.local file with:
OMDB_API_KEY=your_omdb_api_key
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_SECRET=your_auth_secret
DATABASE_URL=your_database_url
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

## Project Structure

```
movie_vault/
├── app/              # Next.js app router pages
├── components/       # Reusable components
├── lib/             # Utility functions and API clients
├── prisma/          # Database schema and migrations
├── public/          # Static assets
├── types/           # TypeScript type definitions
└── styles/          # Global styles
```

## Key Features Explained

- **Movie Search:** Real-time search with debouncing and pagination
- **Filtering System:** Sort by title, year, and more
- **Bookmarking:** Save favorite movies with user authentication
- **Responsive Design:** Optimal viewing on all device sizes
- **Performance:** Optimized image loading and API caching

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
