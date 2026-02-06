#!/bin/bash
# EventFlow Backend Setup Script for macOS/Linux

echo "===================================="
echo "EventFlow - Backend Complete Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
echo "Checking for Node.js..."
if ! command -v node &> /dev/null; then
    echo ""
    echo "ERROR: Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Or use: brew install node (macOS)"
    echo ""
    exit 1
fi

echo "Node.js found:"
node --version
echo ""

# Check if npm is available
echo "Checking for npm..."
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not available!"
    exit 1
fi

echo "npm found:"
npm --version
echo ""

# Install dependencies
echo "Installing npm dependencies..."
echo "This may take a few minutes..."
echo ""
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Set up MySQL database (see BACKEND_SETUP.md)"
echo "2. Create .env file with your database credentials"
echo "3. Run: npm start"
echo ""
