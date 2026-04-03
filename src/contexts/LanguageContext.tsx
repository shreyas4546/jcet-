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
    'exp.slide5.desc': 'Your future in engineering begins here at JCET, Hubballi.',

    'hero.stat.placement': 'Placement Rate',
    'hero.stat.labs': 'Research Labs',
    'hero.stat.rank': 'University Rank',

    'dept.title': 'Academic',
    'dept.highlight': 'Departments',
    'dept.desc': 'Specialized centers of excellence driving research, innovation, and leadership.',
    'dept.explore': 'Explore More',
    'dept.card.subtitle': 'Department',
    'dept.cse.name': 'Computer Science Engineering',
    'dept.cse.desc': 'NBA Accredited program focusing on advanced algorithms and full-stack development.',
    'dept.aiml.name': 'Artificial Intelligence & ML',
    'dept.aiml.desc': 'State-of-the-art Center of Excellence for neural networks and predictive analytics.',
    'dept.mech.name': 'Mechanical Engineering',
    'dept.mech.desc': 'Pioneering robotics and advanced manufacturing guided by industry veterans.',
    'dept.civil.name': 'Civil Engineering',
    'dept.civil.desc': 'Driving sustainable smart-city infrastructure for North Karnataka and beyond.',
    'dept.ece.name': 'Electronics Engineering',
    'dept.ece.desc': 'Hub for VLSI design, IoT innovation, and next-gen embedded technologies.',
    'dept.mba.name': 'MBA',
    'dept.mba.desc': 'VTU-recognized leadership program heavily integrated with local industry partners.',

    'place.title': 'Stellar',
    'place.highlight': 'Placements',
    'place.desc': 'Consistently ranked among the top engineering colleges in North Karnataka for transforming students into highly sought-after industry professionals.',
    'place.highest': 'Highest Package',
    'place.average': 'Average Package',
    'place.rate': 'Placement Rate',
    'place.recruiters': 'Top Recruiters',
    'place.highlights': 'Recent Highlights',
    'place.class': 'Class of ',

    'life.title': 'Vibrant',
    'life.highlight': 'Campus Life',
    'life.desc': 'Experience a dynamic environment that fosters creativity, leadership, and holistic development beyond the classroom.',
    'life.act1.title': 'VTU State-Level Hackathons',
    'life.act1.desc': 'Annual 24-hour coding challenges hosted by our vibrant IEEE Student Branch.',
    'life.act2.title': 'Clubs & Societies',
    'life.act2.desc': 'Active IEEE, ISTE, technical squads, and vibrant Kannada cultural forums.',
    'life.act3.title': 'Zonal Athletics',
    'life.act3.desc': 'VTU Zonal champions equipped with state-of-the-art courts and athletic grounds.',
    'life.act4.title': '"Pratibha" Cultural Fest',
    'life.act4.desc': 'Our flagship annual festival celebrating art, music, and Karnataka heritage.',
    'life.act5.title': 'Industry Workshops',
    'life.act5.desc': 'Regular skill-building seminars hosted by hub technology leaders from Hubballi IT Park.'
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
    'exp.slide5.desc': 'ಹುಬ್ಬಳ್ಳಿಯ ಜೆಸಿಇಟಿಯಲ್ಲಿ ನಿಮ್ಮ ಎಂಜಿನಿಯರಿಂಗ್ ಭವಿಷ್ಯ ಇಲ್ಲಿ ಆರಂಭವಾಗುತ್ತದೆ.',

    'hero.stat.placement': 'ಉದ್ಯೋಗಾವಕಾಶ ದರ',
    'hero.stat.labs': 'ಸಂಶೋಧನಾ ಪ್ರಯೋಗಾಲಯಗಳು',
    'hero.stat.rank': 'ವಿಶ್ವವಿದ್ಯಾಲಯ ರ್‍ಯಾಂಕ್',

    'dept.title': 'ಶೈಕ್ಷಣಿಕ',
    'dept.highlight': 'ವಿಭಾಗಗಳು',
    'dept.desc': 'ಸಂಶೋಧನೆ, ನಾವೀನ್ಯತೆ ಮತ್ತು ನಾಯಕತ್ವವನ್ನು ಮುನ್ನಡೆಸುವ ಅತ್ಯುತ್ತಮ ಕೇಂದ್ರಗಳು.',
    'dept.explore': 'ಹೆಚ್ಚು ಅನ್ವೇಷಿಸಿ',
    'dept.card.subtitle': 'ವಿಭಾಗ',
    'dept.cse.name': 'ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಎಂಜಿನಿಯರಿಂಗ್',
    'dept.cse.desc': 'ಸುಧಾರಿತ ಅಲ್ಗಾರಿದಮ್‌ಗಳು ಮತ್ತು ಫುಲ್-ಸ್ಟಾಕ್ ಅಭಿವೃದ್ಧಿಯ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿದ ಎನ್‌ಬಿಎ (NBA) ಮಾನ್ಯತೆ ಪಡೆದ ಕಾರ್ಯಕ್ರಮ.',
    'dept.aiml.name': 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ಎಂಎಲ್ (AI & ML)',
    'dept.aiml.desc': 'ನ್ಯೂರಲ್ ನೆಟ್‌ವರ್ಕ್‌ಗಳು ಮತ್ತು ಮುನ್ಸೂಚಕ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಅತ್ಯಾಧುನಿಕ ಶ್ರೇಷ್ಠತೆಯ ಕೇಂದ್ರ.',
    'dept.mech.name': 'ಮೆಕ್ಯಾನಿಕಲ್ ಎಂಜಿನಿಯರಿಂಗ್',
    'dept.mech.desc': 'ಉದ್ಯಮದ ಪರಿಣತರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ರೋಬೋಟಿಕ್ಸ್ ಮತ್ತು ಸುಧಾರಿತ ಉತ್ಪಾದನೆ.',
    'dept.civil.name': 'ಸಿವಿಲ್ ಎಂಜಿನಿಯರಿಂಗ್',
    'dept.civil.desc': 'ಉತ್ತರ ಕರ್ನಾಟಕ ಮತ್ತು ಅದರಾಚೆಗಿನ ಸುಸ್ಥಿರ ಸ್ಮಾರ್ಟ್-ಸಿಟಿ ಮೂಲಸೌಕರ್ಯ ನಿರ್ಮಾಣ.',
    'dept.ece.name': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಎಂಜಿನಿಯರಿಂಗ್',
    'dept.ece.desc': 'ವಿಎಲ್‌ಎಸ್‌ಐ (VLSI) ವಿನ್ಯಾಸ, ಐಒಟಿ (IoT) ನಾವೀನ್ಯತೆ ಮತ್ತು ಮುಂದಿನ ಪೀಳಿಗೆಯ ಎಂಬೆಡೆಡ್ ತಂತ್ರಜ್ಞಾನಗಳ ಕೇಂದ್ರ.',
    'dept.mba.name': 'ಎಂ.ಬಿ.ಎ (MBA)',
    'dept.mba.desc': 'ಸ್ಥಳೀಯ ಉದ್ಯಮ ಪಾಲುದಾರರೊಂದಿಗೆ ಹೆಚ್ಚು ಸಂಯೋಜಿತವಾದ ವಿಟಿಯು-ಮಾನ್ಯತೆ ಪಡೆದ ನಾಯಕತ್ವ ಕಾರ್ಯಕ್ರಮ.',

    'place.title': 'ಅತ್ಯುತ್ತಮ',
    'place.highlight': 'ಉದ್ಯೋಗಾವಕಾಶಗಳು',
    'place.desc': 'ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಹೆಚ್ಚು ಬೇಡಿಕೆಯುಳ್ಳ ಉದ್ಯಮ ವೃತ್ತಿಪರರನ್ನಾಗಿ ಪರಿವರ್ತಿಸಲು ಉತ್ತರ ಕರ್ನಾಟಕದ ಅಗ್ರ ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜುಗಳಲ್ಲಿ ಸತತವಾಗಿ ಸ್ಥಾನ ಪಡೆದಿದೆ.',
    'place.highest': 'ಗರಿಷ್ಠ ಪ್ಯಾಕೇಜ್',
    'place.average': 'ಸರಾಸರಿ ಪ್ಯಾಕೇಜ್',
    'place.rate': 'ಉದ್ಯೋಗ ದರ',
    'place.recruiters': 'ಉನ್ನತ ನೇಮಕಾತಿದಾರರು',
    'place.highlights': 'ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು',
    'place.class': 'ವರ್ಗ ',

    'life.title': 'ಕ್ರಿಯಾಶೀಲ',
    'life.highlight': 'ಕ್ಯಾಂಪಸ್ ಜೀವನ',
    'life.desc': 'ತರಗತಿಯ ಆಚೆಗೆ ಸೃಜನಶೀಲತೆ, ನಾಯಕತ್ವ ಮತ್ತು ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿಯನ್ನು ಬೆಳೆಸುವ ಕ್ರಿಯಾತ್ಮಕ ವಾತಾವರಣವನ್ನು ಅನುಭವಿಸಿ.',
    'life.act1.title': 'ವಿಟಿಯು ರಾಜ್ಯಮಟ್ಟದ ಹ್ಯಾಕಥಾನ್‌ಗಳು',
    'life.act1.desc': 'ನಮ್ಮ ಐಇಇಇ (IEEE) ವಿದ್ಯಾರ್ಥಿ ಶಾಖೆಯಿಂದ ಆಯೋಜಿಸಲಾದ ವಾರ್ಷಿಕ 24-ಗಂಟೆಗಳ ಕೋಡಿಂಗ್ ಸವಾಲುಗಳು.',
    'life.act2.title': 'ಕ್ಲಬ್‌ಗಳು ಮತ್ತು ಸಂಸ್ಥೆಗಳು',
    'life.act2.desc': 'ಸಕ್ರಿಯ ಐಇಇಇ (IEEE), ಐಎಸ್‌ಟಿಇ (ISTE), ತಾಂತ್ರಿಕ ತಂಡಗಳು ಮತ್ತು ರೋಮಾಂಚಕ ಕನ್ನಡ ಸಾಂಸ್ಕೃತಿಕ ವೇದಿಕೆಗಳು.',
    'life.act3.title': 'ವಲಯ ಅಥ್ಲೆಟಿಕ್ಸ್',
    'life.act3.desc': 'ಅತ್ಯಾಧುನಿಕ ಕೋರ್ಟ್‌ಗಳು ಮತ್ತು ಮೈದಾನಗಳನ್ನು ಹೊಂದಿರುವ ವಿಟಿಯು (VTU) ವಲಯ ಚಾಂಪಿಯನ್‌ಗಳು.',
    'life.act4.title': '"ಪ್ರತಿಭಾ" ಸಾಂಸ್ಕೃತಿಕ ಉತ್ಸವ',
    'life.act4.desc': 'ಕಲೆ, ಸಂಗೀತ ಮತ್ತು ಕರ್ನಾಟಕದ ಪರಂಪರೆಯನ್ನು ಆಚರಿಸುವ ನಮ್ಮ ಪ್ರಮುಖ ವಾರ್ಷಿಕ ಉತ್ಸವ.',
    'life.act5.title': 'ಕೈಗಾರಿಕಾ ಕಾರ್ಯಾಗಾರಗಳು',
    'life.act5.desc': 'ಹುಬ್ಬಳ್ಳಿ ಐಟಿ ಪಾರ್ಕ್‌ನ ಉನ್ನತ ತಂತ್ರಜ್ಞಾನ ನಾಯಕರಿಂದ ನಿಯಮಿತ ಕೌಶಲ್ಯ-ವರ್ಧನೆ ವಿಚಾರ ಸಂಕಿರಣಗಳು.'
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
