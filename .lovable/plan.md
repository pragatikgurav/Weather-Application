

# WeatherNow App — Implementation Plan

## 1. Authentication System (LocalStorage-based)
- **AuthContext** using React Context API + localStorage for persistence
- **Signup page**: Name, Email, Password fields with Zod validation (required fields, email format, password min 6 chars). Stores user in localStorage, redirects to Login on success.
- **Login page**: Email + Password validated against stored user. On success, sets auth state and redirects to Dashboard. Shows error on invalid credentials.
- **ProtectedRoute** component wraps the Dashboard — redirects unauthenticated users to Login.
- **Logout** button clears auth state and redirects to Login.

## 2. Pages & Layout

### Login & Signup Pages
- Centered card layout with a blue gradient sky background
- Dark modern card styling with weather-themed blue primary buttons
- Smooth hover effects, accessible labels, clear validation error messages
- Consistent design between both pages

### Weather Dashboard
- **Navbar**: "WeatherNow" logo/title on the left, Logout button on the right
- **Search bar**: Text input + search button to enter a city name
- **WeatherCard**: Displays city name, country, temperature, weather description, icon, humidity, wind speed, and "feels like" temperature
- **Loader**: Spinner shown while fetching data
- **ErrorMessage**: Displayed when city is not found or API fails

## 3. Weather Data Integration
- Service module calling Weatherstack API (`http://api.weatherstack.com/current?access_key=...&query=CITY`)
- Uses Axios for HTTP requests
- Proper loading and error states during fetch

## 4. Reusable Components
- `Navbar` — app header with logo and logout
- `ProtectedRoute` — auth gate wrapper
- `WeatherCard` — weather data display card
- `Loader` — loading spinner
- `ErrorMessage` — error display component

## 5. UI/UX
- Blue sky gradient background throughout
- Card-based layouts with rounded corners and shadows
- Fully responsive / mobile-friendly
- Smooth button hover transitions
- Clean, modern weather aesthetic

## 6. Routing
- `/login` — Login page
- `/signup` — Signup page
- `/dashboard` — Protected Weather Dashboard
- `/` redirects to Dashboard (or Login if not authenticated)

