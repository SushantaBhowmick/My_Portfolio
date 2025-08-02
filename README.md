# 🚀 Sushanta Bhowmick | Modern Full-Stack Portfolio

A stunning, modern portfolio website showcasing Sushanta Bhowmick's full-stack development expertise. Built with Next.js 14, featuring cutting-edge technologies, interactive 3D effects, smooth animations, and a functional backend. Demonstrates proficiency in MERN & MEAN stack development.

![Portfolio Preview](https://via.placeholder.com/1200x600/6366f1/ffffff?text=Modern+Portfolio+Preview)

## ✨ Features

### 🎨 Design & UI
- **Modern Design**: Clean, professional design with dark/light mode support
- **Responsive Layout**: Perfectly optimized for all devices and screen sizes
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **3D Effects**: Interactive Three.js elements and particle systems
- **Aceternity-style Components**: Custom components inspired by modern design trends

### 🛠️ Technical Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion, Three.js, React Three Fiber
- **Backend**: Supabase (Database, Authentication)
- **Deployment**: Ready for Vercel deployment

### 📱 Sections
- **Hero Section**: Eye-catching introduction with animated text and 3D background
- **About**: Personal story with timeline and interactive highlights
- **Skills**: Interactive skill showcase with progress bars and categories
- **Projects**: Filterable project gallery with live demos and source code
- **Contact**: Functional contact form with Supabase integration
- **Navigation**: Smooth scroll navigation with active section highlighting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (for contact form functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Follow the guide in `SUPABASE_SETUP.md`
   - Create the contact_submissions table
   - Configure Row Level Security policies

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack Details

### Core Technologies
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React

### UI Components
- **shadcn/ui**: High-quality, accessible component library
- **Lucide React**: Beautiful, customizable icons
- **Sonner**: Toast notifications

### 3D & Animations
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber

### Backend & Database
- **Supabase**: Backend-as-a-Service
- **PostgreSQL**: Relational database (via Supabase)
- **Row Level Security**: Secure data access policies

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── navigation.tsx   # Navigation component
│   │   ├── hero-section.tsx # Hero section
│   │   ├── about-section.tsx# About section
│   │   ├── skills-section.tsx# Skills showcase
│   │   ├── projects-section.tsx# Projects gallery
│   │   ├── contact-section.tsx# Contact form
│   │   ├── footer.tsx       # Footer component
│   │   └── three-scene.tsx  # 3D components
│   └── lib/
│       ├── utils.ts         # Utility functions
│       └── supabase.ts      # Supabase client
├── public/                  # Static assets
├── FEATURES.md             # 📖 Comprehensive features documentation
├── SUPABASE_SETUP.md       # Database setup guide
└── README.md               # Project documentation
```

## 📖 **Detailed Documentation**

For comprehensive information about all features, packages, and technical implementation, see:

- **[FEATURES.md](FEATURES.md)** - Complete features & technical documentation
- **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Backend setup guide

### Quick Links:
- [🌟 All Features Overview](FEATURES.md#-features-overview)
- [📦 Package Dependencies & Uses](FEATURES.md#-package-dependencies)
- [🏗️ Project Architecture](FEATURES.md#️-project-architecture)
- [⚙️ Technical Implementation](FEATURES.md#️-technical-implementation)
- [🚀 Performance Optimizations](FEATURES.md#-performance-optimizations)
- [🎨 Customization Guide](FEATURES.md#-customization-guide)
- [🚀 Deployment Guide](FEATURES.md#-deployment-guide)

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/components/hero-section.tsx` - Name, role, and introduction
- `src/components/about-section.tsx` - Personal story and journey
- `src/components/skills-section.tsx` - Skills and expertise
- `src/components/projects-section.tsx` - Your projects
- `src/components/contact-section.tsx` - Contact information

### Styling
- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Fonts**: Update fonts in `src/app/layout.tsx`
- **Components**: Customize shadcn/ui components in `src/components/ui/`

### Content
- **Projects**: Add your projects in `src/components/projects-section.tsx`
- **Skills**: Update your skills in `src/components/skills-section.tsx`
- **Images**: Replace placeholder images in the `public/` directory

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
This portfolio can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## 📝 Environment Variables

Required environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Optional (for production):
```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🔒 Security

- **Row Level Security**: Enabled on Supabase tables
- **Form Validation**: Client and server-side validation
- **Environment Variables**: Sensitive data stored securely
- **Rate Limiting**: Consider adding for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [shadcn/ui](https://ui.shadcn.com/) - For UI components
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [Three.js](https://threejs.org/) - For 3D graphics
- [Supabase](https://supabase.com/) - For backend services

## 📞 Support

If you have any questions or need help setting up the portfolio, feel free to reach out:

- Create an issue in this repository
- Contact via the contact form on the live site
- Email: sushantabhowmick@gmail.com
- Phone: +91 8017068720
- GitHub: https://github.com/SushantaBhowmick

---

**Built with ❤️ using modern web technologies**