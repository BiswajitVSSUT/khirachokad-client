# KHIRA CHOKADA - Cattle Feed Landing Page

A responsive, modern landing page for KHIRA CHOKADA cattle feed products built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎨 Design & Theme
- **Light Theme**: Clean, modern design with green and orange color scheme
- **Responsive**: Fully responsive from 350px to large devices
- **Zoom Friendly**: Maintains responsiveness at 80% to 200% zoom levels
- **Inspired Design**: Based on the provided KHIRA CHOKADA product imagery

### 📱 Sections

1. **Navbar**
   - Logo (KC Logo.svg) and brand name on the left
   - Navigation menu: "Our Products" and "Verify Products"
   - Mobile-responsive hamburger menu
   - Sticky navigation

2. **Hero Section**
   - Eye-catching headline and description
   - Product image display
   - Call-to-action buttons
   - Decorative elements and gradients

3. **What We Offer**
   - 3-card product layout
   - Product details with features
   - Modular component accepting props
   - Hover effects and animations

4. **Why Choose Us**
   - 4 key USPs with icons
   - Quality Guaranteed, Natural Ingredients, Expert Formulation, Reliable Delivery
   - Statistics section
   - Clean, professional layout

5. **Verify Product**
   - QR code scanner interface
   - Manual product code entry
   - Verification results page
   - Security notices and help text

6. **Customer Reviews**
   - Marquee effect for reviews
   - Customer profiles with ratings
   - Statistics section
   - Smooth animations

7. **Footer**
   - Company information
   - Complete shop address details
   - Google Maps integration
   - Contact information and links

### 🛠 Technical Features

- **Modular Architecture**: Each section is a separate, reusable component
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Next.js 15**: Latest Next.js features with App Router
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Performance**: Optimized images and lazy loading

### 📁 Project Structure

```
components/
├── sections/
│   ├── Navbar.tsx           # Navigation component
│   ├── HeroSection.tsx      # Hero section with product showcase
│   ├── WhatWeOffer.tsx      # Product cards section
│   ├── WhyChooseUs.tsx      # USP section with statistics
│   ├── VerifyProduct.tsx    # QR scanner and verification
│   ├── CustomerReviews.tsx  # Reviews with marquee effect
│   └── Footer.tsx           # Footer with shop info and map
app/
├── page.tsx                 # Main landing page
├── verify-product/
│   └── page.tsx            # Product verification page
├── layout.tsx              # Root layout
└── globals.css             # Global styles and animations
```

### 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

### 📱 Responsive Breakpoints

- **Mobile**: 350px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

### 🎯 Key Responsive Features

- **Mobile Navigation**: Hamburger menu for small screens
- **Flexible Grid**: Cards adapt from 1 to 3 columns
- **Scalable Text**: Font sizes adjust across devices
- **Touch-Friendly**: 44px minimum touch targets
- **Zoom Compatibility**: Maintains layout at various zoom levels

### 🔧 Customization

#### Adding New Products
Update the `defaultProducts` array in `WhatWeOffer.tsx`:

```typescript
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Product Name',
    description: 'Product description',
    image: '/product-image.png',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  }
];
```

#### Modifying Colors
Update the color scheme in `globals.css` or component files:
- Primary Green: `green-600`
- Secondary Orange: `orange-500`
- Background: `gray-50`, `white`

#### Adding Reviews
Update the `reviews` array in `CustomerReviews.tsx`:

```typescript
const reviews: Review[] = [
  {
    id: '1',
    name: 'Customer Name',
    location: 'Location',
    rating: 5,
    review: 'Review text',
    avatar: '/avatar.png'
  }
];
```

### 📄 Pages

- **Home Page** (`/`): Complete landing page with all sections
- **Verify Product** (`/verify-product?verify=CODE`): Product verification page

### 🎨 Design System

- **Colors**: Green (#16a34a), Orange (#f97316), Gray variations
- **Typography**: Geist Sans font family
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle shadows for depth
- **Animations**: Smooth transitions and hover effects

### 🔒 Security Features

- **Product Verification**: QR code and manual verification
- **Input Validation**: Proper form validation
- **Safe Navigation**: Protected routes and error handling

### 📊 Performance

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Lazy Loading**: Components load as needed
- **SEO Optimized**: Proper meta tags and structure

### 🧪 Testing

The application is designed to be:
- **Cross-browser compatible**
- **Mobile device tested**
- **Zoom level tested** (80% - 200%)
- **Screen size tested** (350px - 2560px)

### 📞 Support

For technical support or customization requests, please contact the development team.

---

**Built with ❤️ for KHIRA CHOKADA**
