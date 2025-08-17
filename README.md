# DesiMyntra - E-commerce Platform

A modern, responsive e-commerce website built with React.js, TypeScript, and Tailwind CSS, featuring product listings, shopping cart, wishlist, and user authentication.

## 🚀 Live Demo

**🌐 Live Site**: [https://myntraxpressappweb-dev.vercel.app/](https://myntraxpressappweb-dev.vercel.app/)

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shubhambaghel34/myntraxpressappweb.git)

## 🏷️ Tags

![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Create React App](https://img.shields.io/badge/Create_React_App-5.0.1-09D3AC?style=for-the-badge&logo=create-react-app&logoColor=white)
![E-commerce](https://img.shields.io/badge/E--commerce-Platform-green?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Design-orange?style=for-the-badge)
![Mobile First](https://img.shields.io/badge/Mobile_First-Approach-blue?style=for-the-badge)

## ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Management**: Categories, subcategories, and product listings
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products for later
- **User Authentication**: Login/registration system
- **Search & Filters**: Advanced product filtering and search
- **Image Slider**: Auto-rotating hero section
- **Category Navigation**: MEN, WOMEN, KIDS, HOME, BEAUTY, GENZ

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: Vercel

## 🎨 Color Palette

- **Primary**: Rostbite (#F13AB1)
- **Secondary**: #ff3e6c (Main Button Color)
- **Accent**: Royal Orange (#FD913C)
- **Warning**: Halloween Orange (#F05524)
- **Dark**: Gunmetal (#29303E)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── ProductCard.tsx # Product display component
│   └── ImageSlider.tsx # Hero section slider
├── pages/              # Page components
│   ├── LandingPage.tsx # Home page
│   ├── ProductListing.tsx # Product catalog
│   ├── ProductDetails.tsx # Product detail page
│   ├── Cart.tsx        # Shopping cart
│   ├── Wishlist.tsx    # User wishlist
│   ├── Profile.tsx     # User authentication
│   ├── Deals.tsx       # Special offers
│   ├── NewArrivals.tsx # Latest products
│   └── Trending.tsx    # Popular products
├── context/            # Global state management
│   └── AppContext.tsx  # React Context setup
├── types/              # TypeScript type definitions
│   └── index.ts        # Product, Category interfaces
├── data/               # Static data (replace with API)
│   ├── products.json   # Product catalog (80+ products)
│   └── categories.json # Category structure
└── App.tsx             # Main application component
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhambaghel34/myntraxpressappweb.git
   cd myntraxpressappweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Test

### Development
```bash
npm start          # Start development server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

### Production Build
```bash
npm run build     # Create production build
npm run build:analyze # Analyze bundle size
```

### Testing
```bash
npm test          # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🚀 Deployment to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   ```bash
   npm run deploy
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready for Vercel"
   git push origin master
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository: `shubhambaghel34/myntraxpressappweb`
   - Vercel will auto-detect Create React App

3. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Environment Variables** (if needed)
   ```
   NODE_ENV=production
   GENERATE_SOURCEMAP=false
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shubhambaghel34/myntraxpressappweb.git)

## ⚡ Performance Optimizations

### Build Optimizations
- **Source Maps Disabled**: `GENERATE_SOURCEMAP=false` for production
- **Bundle Analysis**: `npm run build:analyze` to analyze bundle size
- **Tree Shaking**: Unused code automatically removed

### Runtime Optimizations
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Image Optimization**: Responsive images with proper sizing

### Vercel Optimizations
- **Edge Network**: Global CDN for fast loading
- **Automatic HTTPS**: SSL certificates included
- **Compression**: Gzip/Brotli compression
- **Caching**: Static assets cached for 1 year

## 🔧 Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### tailwind.config.js
- Custom color palette
- Responsive breakpoints
- Font family configuration

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Fast loading on all devices

## 🔒 Security Features

- **Content Security Policy**: XSS protection
- **Frame Options**: Clickjacking prevention
- **Type Safety**: TypeScript for runtime safety
- **Input Validation**: Form validation and sanitization

## 📊 Analytics & Monitoring

### Vercel Analytics
- Automatic performance monitoring
- Real user metrics
- Core Web Vitals tracking

### Error Tracking
- Build-time error detection
- Runtime error boundaries
- Console error logging

## 🚀 Future Enhancements

- **Backend Integration**: Replace JSON data with real APIs
- **Payment Gateway**: Stripe/PayPal integration
- **User Management**: Advanced user profiles and preferences
- **Search**: Elasticsearch or Algolia integration
- **PWA**: Progressive Web App features
- **Internationalization**: Multi-language support
- **Dark Mode**: Theme switching capability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/shubhambaghel34/myntraxpressappweb/issues)
- **Documentation**: [Project Wiki](https://github.com/shubhambaghel34/myntraxpressappweb/wiki)
- **Email**: support@desimyntra.com

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Vercel**: For seamless deployment platform
- **Unsplash**: For beautiful product images

---

**🌐 Live Demo**: [https://myntraxpressappweb-dev.vercel.app/](https://myntraxpressappweb-dev.vercel.app/)

**Made with ❤️ for the DesiMyntra community**
