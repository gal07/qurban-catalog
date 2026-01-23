# Qurban Catalog

A modern web application for managing and displaying Qurban (sacrificial animal) catalog with an admin dashboard for content management.

## About

Qurban Catalog is a full-featured web application built to help manage and showcase Qurban animals for sale. The application includes a public-facing catalog with dynamic content and a comprehensive admin dashboard for managing animals, content, and settings.

## Tech Stack

### Frontend
- **Astro.js** - Modern static site generator
- **TypeScript** - Type-safe JavaScript
- **Vanilla CSS** - Custom styling with CSS variables

### Backend & Services
- **Firebase Authentication** - User authentication for admin access
- **Firebase Firestore** - NoSQL database for storing:
  - Animal catalog data
  - Dynamic content (hero, footer, social links, etc.)
  - Admin settings
- **AWS S3** - Object storage for animal images
- **WhatsApp Integration** - Direct messaging for customer inquiries

## Features

### Public Website
- **Hero Section** - Dynamic hero with customizable badge, title, description, and features
- **Animal Catalog** - Paginated catalog with filtering and search
- **How to Buy** - Step-by-step ordering process
- **Dynamic Footer** - Contact information, social media links, and copyright
- **Responsive Design** - Mobile-friendly interface

### Admin Dashboard
- **Animal Management** - Add, edit, delete animals with image upload to S3
- **Content Management** - Manage all website content:
  - Hero section (badge, title, description, features, catalog subtitle)
  - How to Buy steps
  - Footer content (contact info, description, copyright)
  - Social media links
- **Settings** - Configure WhatsApp number and message templates
- **SEO Management** - Edit meta tags and SEO settings
- **Authentication** - Secure login with Firebase Auth

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- AWS account (for S3 bucket)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_bucket_name
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gal07/qurban-catalog.git
cd qurban-catalog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (if available)
   - Fill in your Firebase and AWS credentials

4. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Add your Firebase config to `.env`

5. Set up AWS S3:
   - Create an S3 bucket in AWS Console
   - Configure bucket permissions for public read access
   - Create IAM user with S3 access
   - Add credentials to `.env`

## Running Locally

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:4321`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
qurban-catalog/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Catalog.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── HowToBuy.astro
│   │   └── Navbar.astro
│   ├── layouts/          # Layout components
│   │   ├── AdminLayout.astro
│   │   └── Layout.astro
│   ├── pages/            # Route pages
│   │   ├── admin/        # Admin dashboard pages
│   │   │   ├── content/  # Content management
│   │   │   ├── animals/  # Animal management
│   │   │   └── settings/ # Settings
│   │   ├── api/          # API endpoints
│   │   └── index.astro   # Homepage
│   ├── lib/              # Utilities and configs
│   │   └── firebase.ts   # Firebase configuration
│   └── styles/           # Global styles
├── public/               # Static assets
└── .env                  # Environment variables
```

## Admin Access

1. Create an admin user in Firebase Console:
   - Go to Authentication
   - Add a new user with email/password

2. Access the admin dashboard:
   - Navigate to `/admin/login`
   - Enter your credentials

## Firestore Collections

The application uses the following Firestore collections:

- `animals` - Animal catalog data
- `content/hero` - Hero section content
- `content/how_to` - How to buy steps
- `content/hubungi_kami` - Contact information
- `content/footer` - Footer description and copyright
- `content/social` - Social media links
- `seo/landing` - SEO metadata
- `setting_wa` - WhatsApp settings

## License

MIT

## Author

Created by [gal07](https://github.com/gal07)
