# Socorro Community Help App

A React Native mobile application designed to help the Socorro community connect with emergency services and stay informed about important announcements from various departments.

## 📱 Overview

The Socorro Community Help App serves as a centralized platform for community members to:
- View announcements from emergency service departments
- Submit incident reports to appropriate departments
- Access contact information for various emergency services

## 🏛️ Supported Departments

The app integrates with five key emergency service departments:

- **🏥 Hospital** - Medical emergency services
- **🚒 Fire Department** - Fire and rescue services  
- **👮 Police** - Law enforcement services
- **🏛️ MDRRMO** - Municipal Disaster Risk Reduction and Management Office
- **⚓ PCG** - Philippine Coast Guard

## ✨ Features

### 📢 Department Announcements
- Browse latest announcements from each department
- Navigate through multiple announcements with Previous/Next buttons
- View announcement details including subject, date, and description
- Department-specific imagery for easy identification

### 📝 Incident Reporting
- Submit detailed incident reports through an intuitive form
- Report includes:
  - Personal information (name, contact number)
  - Incident details (what, when, where)
  - Department selection for appropriate routing
- Real-time form validation
- Success/error feedback

### 🎨 User Interface
- Clean, modern design with dark/light theme support
- Responsive layout optimized for mobile devices
- Intuitive navigation with tab-based department selection
- Modal-based report submission for focused user experience

## 🛠️ Technology Stack

- **Framework**: React Native 0.73.5
- **Language**: TypeScript 5.0.4
- **HTTP Client**: Axios 1.6.7
- **UI Components**: 
  - React Native Elements Dropdown
  - Native React Native components
- **Backend Integration**: RESTful API integration
- **Development Tools**:
  - ESLint for code linting
  - Prettier for code formatting
  - Jest for testing
  - Metro bundler

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** >= 18 (as specified in package.json)
- **React Native development environment** set up
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Metro bundler** (included with React Native)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd help-app-react-native
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Metro Bundler
```bash
npm start
# or
yarn start
```

### 4. Run the Application

#### For Android
```bash
npm run android
# or
yarn android
```

#### For iOS
```bash
npm run ios
# or
yarn ios
```

## 📱 Usage

### Viewing Department Announcements
1. Launch the app
2. Select a department tab (Hospital, Fire, Police, MDRRMO, or PCG)
3. View the current announcement with department-specific imagery
4. Use Previous/Next buttons to navigate through multiple announcements

### Submitting Incident Reports
1. Tap the "Submit Report" button
2. Fill out the report form with:
   - Your name and contact number
   - Detailed description of the incident (what, when, where)
   - Select the appropriate department
3. Tap "Submit" to send the report
4. Receive confirmation of successful submission

## 🔧 Development

### Project Structure
```
help-app-react-native/
├── components/
│   ├── Department.tsx      # Department announcement display
│   └── Modal.tsx          # Report submission modal
├── public/                # Department images
├── App.tsx               # Main application component
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

### Available Scripts
- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

### Backend Integration
The app connects to a backend API hosted at `https://help-app-backend.onrender.com`:
- **GET** `/announcements/{department}` - Fetch department announcements
- **POST** `/reports` - Submit incident reports

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
npx react-native start --reset-cache
```

**Android build issues:**
- Ensure Android SDK is properly configured
- Check that emulator is running or device is connected

**iOS build issues:**
- Ensure Xcode is installed and updated
- Run `cd ios && pod install` if using CocoaPods

### Getting Help
- Check the [React Native documentation](https://reactnative.dev/docs/getting-started)
- Review the [troubleshooting guide](https://reactnative.dev/docs/troubleshooting)

## 📄 License

This project is private and proprietary to the Socorro Community Help App initiative.

## 🤝 Support

For support and questions regarding this application, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for the Socorro Community**