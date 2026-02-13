# Portfolio Website

A minimalistic, responsive portfolio website inspired by modern design principles. Clean layout with smooth animations and mobile-first approach.

## 📁 File Structure

```
portfolio/
├── index.html          # About/Info page with bio and timeline
├── work.html          # Portfolio grid page with projects
├── css/
│   └── styles.css     # All styling and responsive design
├── js/
│   └── script.js      # Interactions and animations
└── assets/            # Place your images here
    ├── images/        # Project images
    └── profile/       # Profile photo
```

## 🎨 Design Features

- **Minimalistic Design**: Clean, spacious layout with focus on content
- **Responsive Grid**: Adapts beautifully from mobile to desktop
- **Smooth Animations**: Page transitions, scroll effects, and micro-interactions
- **Typography**: Distinctive font pairing (Crimson Pro + Work Sans)
- **Color System**: CSS variables for easy customization
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🚀 Quick Start

1. **Customize Your Information:**
   - Open `index.html` and replace "Your Name" with your actual name
   - Update the bio, location, and timeline content
   - Replace the logo SVG with your initial or logo

2. **Add Your Projects:**
   - Open `work.html`
   - Replace placeholder projects with your actual work
   - Add real images to the `assets/images/` folder
   - Update project titles, descriptions, and years

3. **Update Contact Information:**
   - Find all instances of "hello@yourname.com" and replace with your email
   - Update social links (LinkedIn, Instagram, etc.)
   - Modify the location in the footer

4. **Add Your Profile Photo:**
   - Replace the SVG placeholder in the profile section with:
     ```html
     <img src="assets/profile/your-photo.jpg" alt="Your Name">
     ```

## 🎯 Customization Guide

### Colors
Edit CSS variables in `css/styles.css` (lines 9-14):
```css
:root {
    --color-primary: #1a1a1a;      /* Main text color */
    --color-secondary: #666;        /* Secondary text */
    --color-accent: #0066ff;        /* Accent color */
    --color-background: #ffffff;    /* Background */
    --color-surface: #f8f8f8;       /* Card backgrounds */
    --color-border: #e0e0e0;        /* Borders */
}
```

### Fonts
Current fonts: Crimson Pro (headings) + Work Sans (body)

To change fonts:
1. Visit [Google Fonts](https://fonts.google.com)
2. Select your fonts
3. Replace the `<link>` tag in both HTML files
4. Update CSS variables in `css/styles.css`:
   ```css
   --font-display: 'YourDisplayFont', serif;
   --font-body: 'YourBodyFont', sans-serif;
   ```

### Spacing
Adjust spacing variables in `css/styles.css` (lines 19-23):
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 2rem;
--spacing-lg: 4rem;
--spacing-xl: 6rem;
```

### Layout Width
Change the maximum content width:
```css
--max-width: 1400px;  /* Change to your preference */
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above (full layout)
- **Tablet**: 768px - 1023px (adjusted grid)
- **Mobile**: 767px and below (single column)

## ⚡ Performance Features

- Optimized CSS animations
- Intersection Observer for scroll effects
- Lazy loading support (for images)
- Minimal JavaScript overhead
- Mobile-first CSS approach

## 🛠️ Adding Real Images

1. **Profile Photo:**
   ```html
   <!-- In index.html, replace the SVG with: -->
   <div class="profile-image">
       <img src="assets/profile/your-photo.jpg" alt="Your Name">
   </div>
   ```

2. **Project Images:**
   ```html
   <!-- In work.html, replace placeholder-image divs with: -->
   <div class="project-image">
       <img src="assets/images/project-name.jpg" alt="Project Name">
   </div>
   ```

3. **Lazy Loading (Optional):**
   ```html
   <img data-src="assets/images/project.jpg" alt="Project" class="lazy">
   ```

## 🎭 Interactive Features

- Smooth scroll navigation
- Project card hover effects (3D tilt on desktop)
- Custom cursor effect (desktop only)
- Navigation background change on scroll
- Fade-in animations on scroll
- Page transition effects

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Customization Tips

### Logo
Replace the circle SVG with your own logo:
```html
<div class="logo">
    <a href="index.html">
        <img src="assets/logo.svg" alt="Logo" width="40" height="40">
    </a>
</div>
```

### Navigation Links
Add or remove navigation items in both HTML files:
```html
<ul class="nav-links">
    <li><a href="work.html">Work</a></li>
    <li><a href="index.html">About</a></li>
    <li><a href="blog.html">Blog</a></li>  <!-- Add new pages -->
    <li><a href="#contact">Contact</a></li>
</ul>
```

### Footer
Modify the footer sections in both files to match your needs. You can add/remove social links, change the CTA button, or adjust the layout.

## 🎨 Project Card Sizes

In `work.html`, control project card layout:
- Default: Regular size (1x1 grid cell)
- `.tall`: Double height (2x1 grid cells)
- `.wide`: Double width (1x2 grid cells)

Example:
```html
<article class="project-card tall">
    <!-- Content -->
</article>
```

## 📧 Contact Form (Optional)

To add a contact form:
1. Create a new file `contact.html`
2. Use a service like Formspree, Netlify Forms, or EmailJS
3. Add the form to your page
4. Style it using the existing CSS variables

## 🚀 Deployment

### GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in Settings
4. Your site will be live at `username.github.io/repo-name`

### Netlify
1. Drag and drop the `portfolio` folder to Netlify
2. Your site is live instantly with a custom URL

### Vercel
1. Import your GitHub repository
2. Deploy with one click

## 💡 Additional Features You Can Add

- [ ] Dark mode toggle
- [ ] Blog section
- [ ] Case study pages for each project
- [ ] Contact form
- [ ] Newsletter signup
- [ ] Image gallery/lightbox
- [ ] Resume/CV download
- [ ] Testimonials section
- [ ] Skills progress bars

## 🐛 Troubleshooting

**Fonts not loading?**
- Check your internet connection
- Ensure Google Fonts link is correct
- Try alternative web fonts

**Animations not working?**
- Check browser console for JavaScript errors
- Ensure `script.js` is properly linked
- Test in a different browser

**Layout breaks on mobile?**
- Check CSS media queries
- Test with browser dev tools
- Validate your HTML

## 📄 License

This template is free to use for personal and commercial projects. Attribution appreciated but not required.

## 🙏 Credits

Design inspired by modern minimalist portfolio websites.
Fonts: Google Fonts (Crimson Pro, Work Sans)

---

**Need help?** Feel free to customize this template to match your personal brand and style!
