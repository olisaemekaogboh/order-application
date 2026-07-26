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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold">
              Logistics<span className="text-blue-400">Pro</span>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Fast, secure and reliable logistics solutions for individuals and businesses. We move
              your goods safely across cities and nationwide.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Express Delivery</li>
              <li>Freight Transport</li>
              <li>Package Tracking</li>
              <li>Warehousing</li>
              <li>Corporate Logistics</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-400">
                <FaMapPin size={18} />
                <span>Awka, Anambra State, Nigeria</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FaPhone size={18} />
                <span>+234 800 000 0000</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope size={18} />
                <span>support@logisticspro.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {year} LogisticsPro. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
