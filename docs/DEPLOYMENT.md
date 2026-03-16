# Python Examples - Deployment Guide

This guide covers how to deploy the Python Examples React application and run Python examples locally.

## Table of Contents

1. [Local Development](#local-development)
2. [Vercel Deployment](#vercel-deployment)
3. [Netlify Deployment](#netlify-deployment)
4. [Docker Deployment](#docker-deployment)
5. [GitHub Pages Deployment](#github-pages-deployment)
6. [Production Considerations](#production-considerations)

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Python 3.11 or higher (for examples)
- git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mk-knight23/25-python-mixed-examples.git
   cd 25-python-mixed-examples
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser.

4. **Run Python examples locally**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt

   # Run any example
   cd skills/basics
   python hello_world.py
   ```

### Development Workflow

```bash
# Start development server (frontend)
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Vercel Deployment

### Prerequisites

- Vercel account
- Vercel CLI installed

### Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```
   Follow the prompts to link your repository and deploy.

3. **Environment Variables**
   - Add `NODE_ENV` with value `production`

### Automatic Deployment

Vercel will automatically deploy on:
- Push to main branch
- Pull request merges
- Tag releases

## Netlify Deployment

### Prerequisites

- Netlify account
- Git repository connected

### Steps

1. **Connect GitHub repository**
   - Go to Netlify dashboard
   - "New site from Git"
   - Select your repository

2. **Build Settings**
   ```yaml
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables**
   ```
   NODE_ENV: production
   ```

4. **Deploy**
   - Click "Deploy site"

### Manual Deployment

Deploy directly via Git:
```bash
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

## Docker Deployment

### Build and Run with Docker

1. **Build the Docker image**
   ```bash
   docker build -t python-examples .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 python-examples
   ```

### Docker Compose

1. **Development**
   ```bash
   docker-compose up
   ```

2. **Production**
   ```bash
   docker-compose --profile production up
   ```

### Docker Commands

```bash
# View running containers
docker ps

# View logs
docker logs python-examples

# Stop container
docker stop python-examples

# Remove container
docker rm python-examples
```

## GitHub Pages Deployment

### Prerequisites

- GitHub account
- Repository configured for GitHub Pages

### Steps

1. **Install GitHub Pages dependency**
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Add scripts to package.json**
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist",
     "predeploy": "npm run build"
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/25-python-mixed-examples/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings
   - Pages section
   - Source: GitHub Actions
   - Branch: gh-pages

## Production Considerations

### Performance Optimization

1. **Build Optimization**
   ```bash
   # Build optimized
   npm run build

   # Analyze bundle
   npm run analyze
   ```

2. **Caching**
   - Enable static asset caching
   - Use CDN for distribution
   - Implement proper cache headers

3. **Code Splitting**
   - Lazy load components
   - Route-based splitting
   - Dynamic imports

### Security

1. **Environment Variables**
   ```bash
   # Create .env.production
   NODE_ENV=production
   API_URL=https://api.example.com
   ```

2. **Security Headers**
   - Content Security Policy
   - XSS Protection
   - Frame Options

3. **Dependencies**
   ```bash
   # Audit dependencies
   npm audit
   npm audit fix
   ```

### Monitoring

1. **Error Tracking**
   - Sentry integration
   - Error reporting
   - Performance monitoring

2. **Analytics**
   - Google Analytics
   - Custom events
   - User behavior tracking

### Deployment Scripts

Create `scripts/deploy.sh`:
```bash
#!/bin/bash

# Build and deploy script
echo "Building project..."
npm run build

echo "Deploying to production..."
npm run deploy

echo "Deployment complete!"
```

### Environment Management

Create `.env.example`:
```env
NODE_ENV=development
API_URL=http://localhost:3000
DEBUG=true
```

## Testing

### Run Tests

```bash
# Frontend tests
npm test

# Python tests
python -m pytest tests/

# Integration tests
npm run test:integration
```

### Test Coverage

```bash
# Generate coverage report
npm run test:coverage

# Upload to codecov
npm run test:codecov
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Verify dependencies installed
   - Check TypeScript errors

2. **Deployment Errors**
   - Verify environment variables
   - Check build logs
   - Ensure correct build command

3. **Runtime Errors**
   - Check console errors
   - Verify API endpoints
   - Check network requests

### Logs and Debugging

```bash
# Development server logs
npm run dev

# Production server logs
# Vercel: vercel logs
# Netlify: netlify logs --prod

# Docker logs
docker logs python-examples
```

## Contributing

### Before Deploying

1. Run tests: `npm test`
2. Build project: `npm run build`
3. Check types: `npm run type-check`
4. Lint code: `npm run lint`

### Deployment Checklist

- [ ] Tests passing
- [ ] Build successful
- [ ] Type check clean
- [ ] Linting clean
- [ ] Environment variables set
- [ ] Dependencies updated
- [ ] Documentation updated

## Support

If you encounter issues during deployment:

1. Check the troubleshooting section
2. Review GitHub issues
3. Create a new issue with:
   - Deployment platform
   - Error messages
   - Steps to reproduce
   - Environment details

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)