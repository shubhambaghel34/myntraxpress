# DesiMyntra - E-commerce React Application

A modern, responsive e-commerce website built with React.js, TypeScript, and Tailwind CSS. This application provides a complete shopping experience similar to Amazon with features like product browsing, cart management, wishlists, and more.

## 🎨 **DesiMyntra Color Palette**

Our brand uses a vibrant and modern color scheme:
- **Rostbite (#F13AB1)** - Primary brand color for main actions and highlights
- **Imperial Red (#E72744)** - Secondary color for important elements and alerts
- **Royal Orange (#FD913C)** - Accent color for call-to-action buttons
- **Halloween Orange (#F05524)** - Warning color for deals and promotions
- **Gunmetal (#29303E)** - Dark color for text and backgrounds

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add/remove items, quantity management, price calculations
- **Wishlist**: Save products for later purchase
- **Product Details**: Comprehensive product pages with image galleries
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety and better development experience

### User Experience
- **Landing Page**: Hero section, featured products, categories showcase
- **Product Listing**: Grid/list views, filters, sorting options
- **Product Details**: Image gallery, specifications, reviews, related products
- **Search & Filtering**: Category, brand, price, rating filters
- **Navigation**: Intuitive header with categories dropdown
- **Mobile Optimized**: Responsive design for all screen sizes

### Technical Features
- **State Management**: React Context for global state (cart, wishlist, user)
- **Routing**: React Router for navigation
- **Optimization**: Memoized components, efficient filtering
- **Reusable Components**: Modular architecture for maintainability

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom DesiMyntra color palette
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context + useReducer
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with DesiMyntra branding
│   └── ProductCard.tsx # Product display component
├── context/            # Global state management
│   └── AppContext.tsx  # Main app context
├── data/               # Dummy data (replace with APIs)
│   ├── products.json   # Product data
│   └── categories.json # Category data
├── pages/              # Page components
│   ├── LandingPage.tsx # Home page with DesiMyntra theme
│   ├── ProductListing.tsx # Product catalog
│   ├── ProductDetails.tsx # Detailed product view
│   ├── Cart.tsx        # Shopping cart
│   └── Wishlist.tsx    # User wishlist
├── types/              # TypeScript interfaces
│   └── index.ts        # Type definitions
├── App.tsx             # Main app component
└── index.css           # Global styles with DesiMyntra colors
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecomm_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 Available Routes

- `/` - Landing page with DesiMyntra branding
- `/products` - Product catalog with filters
- `/product/:id` - Detailed product view with image gallery
- `/cart` - Shopping cart
- `/wishlist` - User wishlist
- `/category/:slug` - Category-specific products
- `/search` - Search results page

## 🎨 Customization

### Styling
The application uses Tailwind CSS with the DesiMyntra color scheme. You can modify:
- `tailwind.config.js` - Color palette and theme
- `src/index.css` - Global styles and component classes

### Data
Currently using dummy JSON data. To integrate with a backend:
1. Replace imports in `App.tsx`
2. Update API calls in components
3. Modify data structures as needed

### Components
All components are modular and reusable. You can:
- Modify existing components
- Create new components following the same pattern
- Extend functionality as needed

## 🔧 Development

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `App.tsx`
4. Add types in `src/types/index.ts`

### State Management
The app uses React Context for global state:
- Cart items and quantities
- Wishlist products
- User preferences
- Search filters

### Performance Optimization
- Components are memoized where appropriate
- Efficient filtering and sorting algorithms
- Lazy loading for images
- Responsive design patterns

## 📊 Data Structure

### Product Interface
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  features: string[];
  colors: string[];
  sizes: string[];
  tags: string[];
}
```

### Category Interface
```typescript
interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}
```

## 🚀 Deployment

### Build the Application
```bash
npm run build
```

### Deploy to Static Hosting
The build folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

### Environment Variables
Create a `.env` file for configuration:
```env
REACT_APP_API_URL=your-api-endpoint
REACT_APP_STRIPE_KEY=your-stripe-key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- User authentication and profiles
- Payment integration (Stripe/Razorpay)
- Order management
- Product reviews and ratings
- Advanced search with Elasticsearch
- Admin dashboard
- Multi-language support (Hindi/English)
- PWA capabilities
- Indian payment methods integration

## 🆘 Support

For questions or issues:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details

## 📚 Resources

- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

**Happy Shopping with DesiMyntra! 🛍️🇮🇳**
