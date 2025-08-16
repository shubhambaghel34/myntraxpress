#!/bin/bash

# 🚀 DesiMyntra Vercel Deployment Script

echo "🚀 Starting DesiMyntra deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false --passWithNoTests

# Type checking
echo "🔍 Running TypeScript type check..."
npm run type-check

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo "🎉 Deployment completed successfully!"
    echo "🌐 Your app is now live on Vercel!"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi
