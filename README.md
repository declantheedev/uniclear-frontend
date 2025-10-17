# UniClear v2 - University Clearance System

UniClear is a digital platform designed to streamline the university clearance process for students in Nigerian universities. This application eliminates the traditional paper-based clearance system by providing a seamless digital experience where students can upload documents, track progress, make payments, and download signed certificates - all in one place.

## 🎯 Purpose

University clearance processes in Nigerian institutions are often time-consuming, involving multiple departments and physical document submissions. UniClear addresses these challenges by:

- Digitizing the entire clearance workflow
- Reducing processing time from weeks to days
- Providing real-time status updates
- Enabling secure document handling and digital signatures
- Facilitating online payments through local payment gateways

## 🚀 Features

### For Students
- **Digital Document Submission**: Upload all required clearance documents in various formats (PDF, DOCX, JPG)
- **Progress Tracking**: Real-time updates on clearance status with detailed progress indicators
- **Secure Payments**: Pay clearance fees securely using Nigerian payment gateways
- **Digital Signatures**: Apply and receive secure digital signatures on clearance forms
- **AI Document Verification**: Automated review and verification of submitted documents
- **Certificate Download**: Download digitally signed clearance certificates in PDF format
- **Multi-device Support**: Fully responsive design that works on desktop, tablet, and mobile devices

### For Administrators
- **Document Review Dashboard**: Efficient review and approval of student submissions
- **Automated Verification**: AI-powered initial document validation
- **Payment Management**: Track and manage clearance payments
- **Digital Signature Workflow**: Apply institutional digital signatures to approved clearances

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite (ESM)
- **Styling**: Tailwind CSS with PostCSS
- **Routing**: React Router v7
- **State Management**: React Context API
- **UI Components**: Lucide React Icons
- **Build Tool**: Vite
- **Code Quality**: ESLint with React plugins

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/             # React context providers (Auth, User)
├── pages/               # Page components and routes
├── styles/              # Global styles and color definitions
├── utils/               # Utility functions
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uniclear-v2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the required environment variables:
```env
VITE_BASE_URL=env file
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

6. Preview the production build:
```bash
npm run preview
```

## 📱 User Workflow

1. **Registration**: Students sign up with their university details (school, faculty, department, level)
2. **Login**: Secure authentication with registration number and password
3. **Dashboard**: Overview of profile information and clearance status
4. **Document Upload**: Submit required clearance documents through the digital interface
5. **AI Review**: Automated document verification and validation
6. **Payment**: Secure payment processing for clearance fees
7. **Approval**: Administrative review and digital signature application
8. **Certificate Download**: Receive and download the digitally signed clearance certificate

## 🔐 Authentication

UniClear implements a secure JWT-based authentication system:
- Session management with access and refresh tokens
- Automatic token refresh to maintain user sessions
- Protected routes that require authentication
- Secure storage of authentication tokens in sessionStorage

## 🎨 Responsive Design

The application features a fully responsive design that adapts to all device sizes:
- **Desktop (1024px+)**: Full sidebar navigation with expanded content area
- **Tablet (768px-1023px)**: Adjusted layouts with optimized spacing
- **Mobile (<768px)**: Collapsible sidebar with hamburger menu toggle and slide-out drawer

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is proprietary and intended for use by Nigerian universities and educational institutions.

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

*UniClear - Streamlining university clearance processes for students across Nigeria*