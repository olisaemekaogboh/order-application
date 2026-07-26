import React, { useState, useEffect } from 'react'
import LanguageContext from './LanguageContext'
import i18n from '../../config/i18n'

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }, [language])

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
