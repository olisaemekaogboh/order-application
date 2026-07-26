import React from 'react'
import { useLanguage } from '../../../hooks/useLanguage'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ha', label: 'Hausa' },
  { code: 'ig', label: 'Igbo' },
  { code: 'fr', label: 'Français' },
]

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage() // change to changeLanguage

  const handleChange = (e) => {
    changeLanguage(e.target.value)
  }

  return (
    <select
      value={language}
      onChange={handleChange}
      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
