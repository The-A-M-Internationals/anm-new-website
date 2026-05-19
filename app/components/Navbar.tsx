'use client'
import { useState, useRef } from 'react'
import NavbarModal from './NavbarModal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useIntlayer, useLocale } from "next-intlayer";
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

type IntlayerKey = keyof ReturnType<typeof useIntlayer>;

type NavKey =
  | 'Resources'
  | 'Media'
  | 'Company'
  | 'Career'
  | 'Services'
  | 'About Us'
  | 'How we work'
  | 'Make an Impact';

interface NavItem {
  labelKey: IntlayerKey
  rightSideButtons: Array<{
    icon: string
    textKey: IntlayerKey
    type: 'primary' | 'secondary' | 'outline'
    link: string
  }>
}

const Navbar = () => {
  const router = useRouter()
  const { locale } = useLocale();
  const content = useIntlayer("navbar");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeNavKey, setActiveNavKey] = useState<NavKey | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getLocalizedLink = (path: string) => `/${locale}${path === '/' ? '' : path}`;

  // 1. REF FOR TIMEOUT
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems: Record<NavKey, NavItem> = {
    Resources: {
      labelKey: 'resources',
      rightSideButtons: [
        { icon: '/resourcenav1.svg', textKey: 'amCommunity', type: 'primary' as const, link: getLocalizedLink('/') },
      ]
    },
    Media: {
      labelKey: 'media',
      rightSideButtons: [
        { icon: '/events.svg', textKey: 'events', type: 'primary' as const, link: getLocalizedLink('/events') },
        { icon: '/blogs.svg', textKey: 'blogs', type: 'outline' as const, link: getLocalizedLink('/blogs') },
        { icon: '/thumbsup.svg', textKey: 'subscribe', type: 'outline' as const, link: getLocalizedLink('/events#subscribe') }      
      ]
    },
    Company: {
      labelKey: 'company',
      rightSideButtons: [
        { icon: '/tick.svg', textKey: 'successStories', type: 'primary' as const, link: getLocalizedLink('/success-stories') },     
        { icon: '/star.svg', textKey: 'whatSetsUsApart', type: 'outline' as const, link: getLocalizedLink('/features') },
        { icon: '/method.svg', textKey: 'ourMethodology', type: 'outline' as const, link: getLocalizedLink('/methodology') }        
      ]
    },
    Career: {
      labelKey: 'career',
      rightSideButtons: [
        { icon: '/services/financial.svg', textKey: 'jobs', type: 'primary' as const, link: getLocalizedLink('/careers') },
        { icon: '/method.svg', textKey: 'culture', type: 'outline' as const, link: getLocalizedLink('/careers#culture') },
        { icon: '/thumbsup.svg', textKey: 'apply', type: 'outline' as const, link: getLocalizedLink('/careers#open-positions') }    
      ]
    },
    Services: {
      labelKey: 'services',
      rightSideButtons: [
        {
          icon: '/services/financial.svg', textKey: 'financeTransformation', type: 'primary' as const, link: getLocalizedLink('/finance-transformation')
        },
        { icon: '/services/managed.svg', textKey: 'managedServices', type: 'outline' as const, link: getLocalizedLink('/finance-transformation#managed-services') },
      ]
    },
    'About Us': {
      labelKey: 'aboutUs',
      rightSideButtons: [
        { icon: '/events.svg', textKey: 'about', type: 'primary' as const, link: getLocalizedLink('/business#about-us') },
        { icon: '/services/financial.svg', textKey: 'mission', type: 'outline' as const, link: getLocalizedLink('/business#mission') },
        { icon: '/blogs.svg', textKey: 'team', type: 'outline' as const, link: getLocalizedLink('/business#team') }
      ]
    },
    'How we work': {
      labelKey: 'howWeWork',
      rightSideButtons: [
        { icon: '/tick.svg', textKey: 'process', type: 'primary' as const, link: getLocalizedLink('/methodology#process') },        
        { icon: '/blogs.svg', textKey: 'methods', type: 'outline' as const, link: getLocalizedLink('/methodology') },
        { icon: '/events.svg', textKey: 'results', type: 'outline' as const, link: getLocalizedLink('/features#results') }
      ]
    },
    'Make an Impact': {
      labelKey: 'makeAnImpact',
      rightSideButtons: [
        { icon: '/blogs.svg', textKey: 'impact', type: 'primary' as const, link: getLocalizedLink('/impacts') },
        { icon: '/events.svg', textKey: 'partners', type: 'outline' as const, link: getLocalizedLink('/') },
        { icon: '/tick.svg', textKey: 'donate', type: 'outline' as const, link: getLocalizedLink('/impacts#donate') }
      ]
    }
  }

  // 2. TIMEOUT LOGIC
  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  // MODIFIED: Accepts a duration parameter (default 150)
  const scheduleClose = (duration = 250) => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false);
      setActiveNavKey(null);
    }, duration);
  }

  const handleNavMouseEnter = (navKey: NavKey) => {
    cancelClose(); // Stop any pending closing
    setActiveNavKey(navKey);
    setIsModalOpen(true);
  }

  // Used for Mobile click logic
  const handleNavClick = (navKey: NavKey) => {
    if (isModalOpen && activeNavKey !== navKey) {
      setActiveNavKey(navKey)
    } else if (!isModalOpen) {
      setActiveNavKey(navKey)
      setIsModalOpen(true)
    } else if (activeNavKey === navKey) {
      setIsModalOpen(false)
      setActiveNavKey(null)
    }
    setIsMobileMenuOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setActiveNavKey(null)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="bg-white shadow-sm w-full z-50 sticky top-0">
        <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link href={getLocalizedLink('/')} className="shrink-0">
              <img src="/Logo.svg" alt="Logo" className="h-12 md:h-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ms-10 flex items-baseline gap-3">

                {/* Iterate through keys to reduce repetition and apply logic */}
                {(['Resources', 'Media', 'Company', 'Career'] as const).map((key) => (
                  <button
                    key={key}
                    onMouseEnter={() => handleNavMouseEnter(key)}
                    // 👇 HIGH DELAY: 500ms for the top row to bridge the gap
                    onMouseLeave={() => scheduleClose(500)}
                    className={`text-[#6B7280] cursor-pointer ${activeNavKey === key ? 'border-b border-[#D4AF37]' : ''} hover:text-gray-900 px-3 py-2 text-sm font-semibold transition-all`}
                  >
                    {content[navItems[key].labelKey].value}
                  </button>
                ))}

                <button onClick={() => router.push(getLocalizedLink("/contact#form"))} className="bg-[#D4AF37] hover:bg-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold cursor-pointer">
                  {content.bookConsultation.value}
                </button>
                <LanguageSwitcher />

              </div>
            </div>

            {/* Tablet & Mobile menu buttons */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => router.push(getLocalizedLink("/contact#form"))}
                className="hidden md:block bg-[#D4AF37] hover:bg-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
              >
                {content.bookConsultation.value}
              </button>

              {/* Language Switcher for mobile/tab */}
              <div className="md:block lg:hidden">
                <LanguageSwitcher />
              </div>

              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
            <div className="flex flex-col space-y-2">
              <button onClick={() => handleNavClick('Resources')} className={`text-[#6B7280] ${activeNavKey === 'Resources' ? 'bg-yellow-50 border-s-4 border-[#D4AF37]' : ''} hover:text-gray-900 px-3 py-3 text-sm font-semibold text-start`}>{content[navItems.Resources.labelKey].value}</button>
              <button onClick={() => handleNavClick('Media')} className={`text-[#6B7280] ${activeNavKey === 'Media' ? 'bg-yellow-50 border-s-4 border-[#D4AF37]' : ''} hover:text-gray-900 px-3 py-3 text-sm font-semibold text-start`}>{content[navItems.Media.labelKey].value}</button>
              <button onClick={() => handleNavClick('Company')} className={`text-[#6B7280] ${activeNavKey === 'Company' ? 'bg-yellow-50 border-s-4 border-[#D4AF37]' : ''} hover:text-gray-900 px-3 py-3 text-sm font-semibold text-start`}>{content[navItems.Company.labelKey].value}</button>
              <button onClick={() => handleNavClick('Career')} className={`text-[#6B7280] ${activeNavKey === 'Career' ? 'bg-yellow-50 border-s-4 border-[#D4AF37]' : ''} hover:text-gray-900 px-3 py-3 text-sm font-semibold text-start`}>{content[navItems.Career.labelKey].value}</button>
              <button onClick={() => router.push(getLocalizedLink("/contact#form"))} className="md:hidden bg-[#D4AF37] hover:bg-yellow-600 text-black px-4 py-3 rounded-full text-sm font-semibold mx-3 mt-2">{content.bookConsultation.value}</button>
            </div>
            <div className="bg-[#D4AF37] mt-4 py-2 rounded-lg">
              <div className="flex flex-row flex-wrap gap-2 px-3 md:justify-center">
                <button onClick={() => handleNavClick('Services')} className={`text-white hover:text-yellow-100 ${activeNavKey === 'Services' ? 'bg-[#897122]' : ''} py-2 px-3 text-sm font-semibold text-start rounded`}>{content[navItems.Services.labelKey].value}</button>
                <button onClick={() => handleNavClick('About Us')} className={`text-white hover:text-yellow-100 ${activeNavKey === 'About Us' ? 'bg-yellow-600' : ''} py-2 px-3 text-sm font-semibold text-start rounded`}>{content[navItems['About Us'].labelKey].value}</button>
                <button onClick={() => handleNavClick('How we work')} className={`text-white hover:text-yellow-100 ${activeNavKey === 'How we work' ? 'bg-yellow-600' : ''} py-2 px-3 text-sm font-semibold text-start rounded`}>{content[navItems['How we work'].labelKey].value}</button>
                <button onClick={() => handleNavClick('Make an Impact')} className={`text-white hover:text-yellow-100 ${activeNavKey === 'Make an Impact' ? 'bg-yellow-600' : ''} py-2 px-3 text-sm font-semibold text-start rounded`}>{content[navItems['Make an Impact'].labelKey].value}</button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP SECONDARY NAV */}
        <div className="bg-[#D4AF37] hidden lg:block">
          <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-6">
            <div className="flex gap-8 py-3">

              <button
                onMouseEnter={() => handleNavMouseEnter('Services')}
                // 👇 LOW DELAY: 150ms for bottom row (closer to modal)
                onMouseLeave={() => scheduleClose(150)}
                className={`text-white hover:text-yellow-100 cursor-pointer ${activeNavKey === 'Services' ? 'border-b border-white' : ''} py-2 text-sm font-bold text-white transition-all`}
              >
                {content[navItems.Services.labelKey].value}
              </button>

              <button
                onMouseEnter={() => handleNavMouseEnter('About Us')}
                onMouseLeave={() => scheduleClose(150)}
                className={`text-white hover:text-yellow-100 cursor-pointer ${activeNavKey === 'About Us' ? 'border-b border-white' : ''} py-2 text-sm font-semibold transition-all`}
              >
                {content[navItems['About Us'].labelKey].value}
              </button>

              <button
                onMouseEnter={() => handleNavMouseEnter('How we work')}
                onMouseLeave={() => scheduleClose(150)}
                className={`text-white hover:text-yellow-100 cursor-pointer ${activeNavKey === 'How we work' ? 'border-b border-white' : ''} py-2 text-sm font-semibold transition-all`}
              >
                {content[navItems['How we work'].labelKey].value}
              </button>

              <button
                onMouseEnter={() => handleNavMouseEnter('Make an Impact')}
                onMouseLeave={() => scheduleClose(150)}
                className={`text-white hover:text-yellow-100 cursor-pointer ${activeNavKey === 'Make an Impact' ? 'border-b border-white' : ''} py-2 text-sm font-semibold transition-all`}
              >
                {content[navItems['Make an Impact'].labelKey].value}
              </button>

            </div>
          </div>
        </div>

      </nav>

      <NavbarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        rightSideButtons={activeNavKey ? navItems[activeNavKey].rightSideButtons : []}
        onMouseEnter={cancelClose}
        onMouseLeave={() => scheduleClose(150)}
      />

    </>
  )
}

export default Navbar
