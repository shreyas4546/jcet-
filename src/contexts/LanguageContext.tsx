import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'kn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.academics': 'Academics',
    'nav.departments': 'Departments',
    'nav.admissions': 'Admissions',
    'nav.placements': 'Placements',
    'nav.campusLife': 'Campus Life',
    'nav.contact': 'Contact',
    'nav.applyNow': 'Apply Now',
    
    'hero.badge': 'Official Website of JCET',
    'hero.title1': 'Engineering',
    'hero.title2': 'the Future',
    'hero.title3': 'at JCET.',
    'hero.desc': 'A modern engineering college experience built on innovation, strong placements, and campus life.',
    'hero.btnApply': 'Apply Now',
    'hero.btnDownload': 'Download Brochure',
    
    'stat.placement': 'Placement Rate',
    'stat.labs': 'Lab Facilities',
    'stat.rank': 'University Rank',
    'stat.vtu': 'VTU Affiliated',
    'stat.naac': 'NAAC Accredited',
    'stat.estd': 'Estd. 2010',
    'pill.labs': '40+ Labs',
    'pill.superlabs': 'World-class',
    'pill.recruiters': '120+ Recruiters',
    'pill.mncs': 'Top MNCs',

    'exp.slide1.title': 'Welcome to JCET',
    'exp.slide1.desc': 'Where innovation meets excellence in engineering education.',
    'exp.slide2.title': 'Advanced Engineering Labs',
    'exp.slide2.desc': 'State-of-the-art facilities for hands-on learning and research.',
    'exp.slide3.title': 'Industry-Ready Placements',
    'exp.slide3.desc': 'Launch your career with top global tech leaders and MNCs.',
    'exp.slide4.title': 'Vibrant Campus Life',
    'exp.slide4.desc': 'A community built on passion, creativity, and excellence.',
    'exp.slide5.title': 'Start Your Journey',
    'exp.slide5.desc': 'Your future in engineering begins here at JCET, Hubballi.'
  },
  kn: {
    'nav.home': 'ಮುಖಪುಟ',
    'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'nav.academics': 'ಶೈಕ್ಷಣಿಕ',
    'nav.departments': 'ವಿಭಾಗಗಳು',
    'nav.admissions': 'ಪ್ರವೇಶಗಳು',
    'nav.placements': 'ಉದ್ಯೋಗಾವಕಾಶಗಳು',
    'nav.campusLife': 'ಕ್ಯಾಂಪಸ್ ಜೀವನ',
    'nav.contact': 'ಸಂಪರ್ಕಿಸಿ',
    'nav.applyNow': 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    
    'hero.badge': 'ಜೆಸಿಇಟಿ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್',
    'hero.title1': 'ಭವಿಷ್ಯದ',
    'hero.title2': 'ಎಂಜಿನಿಯರಿಂಗ್‌',
    'hero.title3': 'ಜೆಸಿಇಟಿಯಲ್ಲಿ.',
    'hero.desc': 'ನಾವೀನ್ಯತೆ, ಉತ್ತಮ ಉದ್ಯೋಗಾವಕಾಶಗಳು ಮತ್ತು ಅತ್ಯುತ್ತಮ ಕ್ಯಾಂಪಸ್ ಜೀವನದ ಮೇಲೆ ನಿರ್ಮಿಸಲಾದ ಆಧುನಿಕ ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜು.',
    'hero.btnApply': 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'hero.btnDownload': 'ಮಾಹಿತಿ ಪುಸ್ತಕ ಡೌನ್‌ಲೋಡ್',
    
    'stat.placement': 'ಉದ್ಯೋಗಾವಕಾಶ ದರ',
    'stat.labs': 'ಪ್ರಯೋಗಾಲಯಗಳು',
    'stat.rank': 'ವಿಶ್ವವಿದ್ಯಾಲಯ ರ್‍ಯಾಂಕ್',
    'stat.vtu': 'VTU ಸಂಯೋಜಿತ',
    'stat.naac': 'NAAC ಮಾನ್ಯತೆ',
    'stat.estd': 'ಸ್ಥಾಪನೆ 2010',
    'pill.labs': '40+ ಪ್ರಯೋಗಾಲಯಗಳು',
    'pill.superlabs': 'ಉತ್ತಮ ಗುಣಮಟ್ಟ',
    'pill.recruiters': '120+ ನೇಮಕಾತಿದಾರರು',
    'pill.mncs': 'ಟಾಪ್ MNC ಗಳು',

    'exp.slide1.title': 'ಜೆಸಿಇಟಿಗೆ ಸ್ವಾಗತ',
    'exp.slide1.desc': 'ಎಂಜಿನಿಯರಿಂಗ್ ಶಿಕ್ಷಣದಲ್ಲಿ ನಾವೀನ್ಯತೆ ಮತ್ತು ಶ್ರೇಷ್ಠತೆ.',
    'exp.slide2.title': 'ಅತ್ಯಾಧುನಿಕ ಪ್ರಯೋಗಾಲಯಗಳು',
    'exp.slide2.desc': 'ಪ್ರಾಯೋಗಿಕ ಕಲಿಕೆ ಮತ್ತು ಸಂಶೋಧನೆಗಾಗಿ ಅತ್ಯುತ್ತಮ ಸೌಲಭ್ಯಗಳು.',
    'exp.slide3.title': 'ಉದ್ಯಮಕ್ಕೆ ಸಿದ್ಧ ಉದ್ಯೋಗಾವಕಾಶ',
    'exp.slide3.desc': 'ಜಾಗತಿಕ ತಂತ್ರಜ್ಞಾನ ನಾಯಕರೊಂದಿಗೆ ನಿಮ್ಮ ವೃತ್ತಿಜೀವನ ಆರಂಭಿಸಿ.',
    'exp.slide4.title': 'ಕ್ರಿಯಾಶೀಲ ಕ್ಯಾಂಪಸ್ ಜೀವನ',
    'exp.slide4.desc': 'ಉತ್ಸಾಹ, ಸೃಜನಶೀಲತೆ ಮತ್ತು ಶ್ರೇಷ್ಠತೆಯ ಮೇಲೆ ನಿರ್ಮಿತ ಸಮುದಾಯ.',
    'exp.slide5.title': 'ನಿಮ್ಮ ಪ್ರಯಾಣ ಆರಂಭಿಸಿ',
    'exp.slide5.desc': 'ಹುಬ್ಬಳ್ಳಿಯ ಜೆಸಿಇಟಿಯಲ್ಲಿ ನಿಮ್ಮ ಎಂಜಿನಿಯರಿಂಗ್ ಭವಿಷ್ಯ ಇಲ್ಲಿ ಆರಂಭವಾಗುತ್ತದೆ.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => setLanguage(lang => lang === 'en' ? 'kn' : 'en');
  
  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
