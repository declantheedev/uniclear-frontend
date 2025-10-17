import React from 'react';
// import NavBar from '../components/NavBar';
import InfoCard from '../components/InfoCard';
import FeatureCard from '../components/FeatureCard';
import { FileText, PenTool, Monitor, ShieldCheck, Clock, Download, Plus } from 'lucide-react';
import LandingNav from '../components/LandingNav';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      <LandingNav/>

      {/* Hero Section */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Streamline Your <span className="text-primary-custom">University Clearance</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl text-sm sm:text-base">
              Complete all your university clearance processes digitally. Upload documents, track progress, make payments and download signed certificates — all in one place.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/signup" className="inline-block px-4 py-2 sm:px-5 sm:py-2 rounded-md bg-primary-custom text-white font-medium hover:opacity-90 transition-opacity text-center">
                Start your clearance
              </Link>
              <a href="#learn-more" className="inline-block px-4 py-2 sm:px-5 sm:py-2 rounded-md border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors text-center">
                Learn More
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-end">
            <img src="/hero-girl.png" alt="Student with documents" className="max-w-[100rem] w-full object-contain" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4">Every Thing You Need for Clearance</h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Our Platform provides all the tools and features you need to complete your university clearance efficiently</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <FeatureCard 
            icon={<FileText className="w-6 h-6 text-primary-custom" />}
            title="Document Upload"
          >
            Securely upload all required documents in various formats (pdf, docx, jpg)
          </FeatureCard>

          <FeatureCard 
            icon={<PenTool className="w-6 h-6 text-green-500" />}
            title="Digital Signatures"
          >
            Apply secure digital signatures to your clearance forms and documents
          </FeatureCard>

          <FeatureCard 
            icon={<Monitor className="w-6 h-6 text-indigo-500" />}
            title="AI Verification"
          >
            Automated document review and verification using advanced AI technology
          </FeatureCard>

          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
            title="Secure Payments"
          >
            Pay clearance fees securely using local payment gateways
          </FeatureCard>

          <FeatureCard 
            icon={<Clock className="w-6 h-6 text-purple-500" />}
            title="Real-time Updates"
          >
            Get instant notifications about your clearance status via email and SMS
          </FeatureCard>

          <FeatureCard 
            icon={<Download className="w-6 h-6 text-teal-500" />}
            title="Download Certificates"
          >
            Download your signed certificates in PDF format
          </FeatureCard>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-12 sm:py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4">How it works</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Complete your clearance with just few steps</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-custom text-white flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg sm:text-xl mb-2">Register and Upload</h3>
              <p className="text-gray-600 text-sm sm:text-base">Create your account and upload all required documents for your clearance</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-custom text-white flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg sm:text-xl mb-2">AI Review and payments</h3>
              <p className="text-gray-600 text-sm sm:text-base">Our AI reviews your documents and you complete the required payments securely</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg sm:text-xl mb-2">Receive your digital signed clearance certificate for use</h3>
              <p className="text-gray-600 text-sm sm:text-base">Download your digital signed clearance certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-2 bg-white rounded-lg p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to start your clearance?</h2>
            <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">Our Platform provides all the tools and features you need to complete your university clearance efficiently</p>
            <Link to="/signup" className="inline-block px-5 py-2 sm:px-6 sm:py-3 bg-primary-custom text-white rounded-md hover:opacity-90 transition-opacity">
              Get started Now!
            </Link>
          </div>
          <div>
            <InfoCard 
              icon={<Plus className="w-6 h-6 text-gray-400" />}
              text="Start another clearance"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#07078f] text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <img src="/Uniclearlogo.png" alt="Uniclear logo" className="h-8 w-auto" />
                <span className="font-bold text-lg">UNI CLEAR</span>
              </div>
              <p className="text-gray-400 text-sm">Streamlining universities clearance process for students across nigeria</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white">features</a></li>
                <li><a href="#pricing" className="hover:text-white">pricing</a></li>
                <li><a href="#security" className="hover:text-white">security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#help" className="hover:text-white">help center</a></li>
                <li><a href="#contact" className="hover:text-white">contact us</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#privacy" className="hover:text-white">Privacy Policies</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            ©2025 Uniclear. All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
