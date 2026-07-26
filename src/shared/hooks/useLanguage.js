import { useContext } from 'react'
import LanguageContext from '@/shared/contexts/LanguageContext/LanguageContext'

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
