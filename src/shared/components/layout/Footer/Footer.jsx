// Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapPin,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Logistics<span className="text-blue-600 dark:text-blue-400">Pro</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Fast, secure and reliable logistics solutions for individuals and businesses. We move
              your goods safely across cities and nationwide.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Express Delivery</li>
              <li>Freight Transport</li>
              <li>Package Tracking</li>
              <li>Warehousing</li>
              <li>Corporate Logistics</li>
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              For Clients
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/client/dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Client Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/client/create-order"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Create Order
                </Link>
              </li>
              <li>
                <Link
                  to="/client/order-history"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  to="/client/order-tracking"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/client/payments"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Payments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <FaMapPin size={18} className="text-gray-500 dark:text-gray-500" />
                <span>Awka, Anambra State, Nigeria</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <FaPhone size={18} className="text-gray-500 dark:text-gray-500" />
                <span>+234 800 000 0000</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <FaEnvelope size={18} className="text-gray-500 dark:text-gray-500" />
                <span>support@logisticspro.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {year} LogisticsPro. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2 md:mt-0">
              <Link
                to="/about"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                About
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Contact
              </Link>
              <Link
                to="/client/dashboard"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Client Portal
              </Link>
              <Link
                to="/admin/dashboard"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Admin Portal
              </Link>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
