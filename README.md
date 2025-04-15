# URL Shortener

A modern, feature-rich URL shortening service built with React.

![URL Shortener Banner](https://res.cloudinary.com/dtogfz0uu/image/upload/v1744751059/Screenshot_2025-04-16_023327_v7jfqv.png)

## Features

- **URL Shortening**: Transform long URLs into concise, shareable links
- **Custom URLs**: Create memorable, branded short links
- **QR Code Generation**: Automatically generate QR codes for each shortened URL
- **Click Analytics**: Track clicks, locations, and device information
- **User Dashboard**: Manage all your links in one place
- **Responsive Design**: Works seamlessly on all devices

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
src/
├── components/
│   ├── ui/              # UI components (buttons, inputs, etc.)
│   ├── pages/           # Page components
│   │   ├── Auth.jsx     # Authentication page
│   │   ├── Dashboard.jsx # User dashboard
│   │   ├── LandingPage.jsx # Home page
│   │   ├── Link.jsx     # Individual link stats page
│   │   └── RedirectLink.jsx # URL redirection handler
│   ├── Login.jsx        # Login component
│   ├── Signup.jsx       # Signup component
│   ├── CreateLink.jsx   # Link creation component
│   ├── LinkCard.jsx     # Link display component
│   ├── Location.jsx     # Location stats component
│   └── DeviceStats.jsx  # Device stats component
├── Context/             # Application state management
├── db/                  # API and database interactions
│   ├── apiUrls.js       # URL-related API functions
│   └── apiClicks.js     # Click tracking API functions
├── hooks/               # Custom React hooks
│   └── use-fetch.js     # Data fetching hook
└── ...
```

## Usage

### Creating a Short URL

1. Enter the long URL in the input field on the home page
2. Click "Shorten Link!"
3. If not logged in, you'll be redirected to login/signup
4. Your shortened URL will be created and added to your dashboard

### Tracking Link Performance

1. Login to your account
2. Navigate to the dashboard to see all your links
3. Click on any link to view detailed analytics:
   - Total clicks
   - Geographic location of visitors
   - Device types
   - Browser information

### Managing Links

From your dashboard, you can:
- Create new shortened URLs
- Copy links to clipboard
- Download QR codes
- Delete links you no longer need
- Filter links by title

## Technologies Used

- **React**: Frontend library
- **React Router**: For navigation
- **Tailwind CSS**: For styling
- **ShadCN UI**: UI component library
- **Lucide React**: For icons
- **React Spinners**: Loading indicators

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon set
