# CryptoTasks Platform

A web3-style platform that allows users to earn USDT by completing social media tasks.

## Features

- Landing page with information about the platform
- Interactive 3-step process explanation
- Dashboard for tracking task completion
- Social media task completion system
- Wallet connection simulation
- USDT reward tracking

## Setup Instructions

1. Clone the repository
2. Import the database schema from `database-setup.sql`
3. Configure your database connection in `api/save-credentials.php`
4. Host the files on a PHP-enabled web server

## File Structure

- `index.html` - Main HTML file
- `css/style.css` - Styling for the application
- `js/app.js` - JavaScript functionality
- `api/save-credentials.php` - Backend API to save user credentials
- `database-setup.sql` - SQL schema for database setup

## Development Notes

This platform uses:
- HTML, CSS, and vanilla JavaScript for the frontend
- PHP for backend API endpoints
- MySQL database for data storage

## Database Schema

The database includes tables for:
- Instagram logins
- Gmail logins 
- Twitter logins
- Users (wallet tracking)
- Completed tasks