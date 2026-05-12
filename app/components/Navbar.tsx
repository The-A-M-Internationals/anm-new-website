'use client'
import { useState, useRef } from 'react'
import NavbarModal from './NavbarModal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useIntlayer, useLocale } from "next-intlayer";
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

type IntlayerKey = keyof ReturnType<typeof useIntlayer>;

type NavKey =
  | 'Services'
  | 'About Us'
  | 'Features'
  | 'What Sets Us Apart'
  | 'Make an Impact'
  | 'Career';

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

  const handleHashLink = (e: React.MouseEvent, link: string) => {
    if (link.includes('#')) {
      const [path, hash] = link.split('#');
      const currentPath = window.location.pathname;

      if (currentPath === path || (path === '' && hash)) {
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          const yOffset = -112; // Adjusted for navbar height
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          window.history.pushState(null, '', `#${hash}`);
          return true;
        }
      }
    }
    return false;
  };

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ─── NAV ITEMS ────────────────────────────────────────────────────────────
  // Only "Services" and "About Us" open a modal dropdown.
  // The remaining items are direct links rendered as plain buttons.
  const navItems: Record<NavKey, NavItem> = {
    Services: {
      labelKey: 'services',
      rightSideButtons: [
        {
          icon: '/services/financial.svg',
          textKey: 'financeTransformation',
          type: 'primary' as const,
          link: getLocalizedLink('/finance-transformation')
        },
        {
          icon: '/services/digital.svg',
          textKey: 'digitalTransformation',
          type: 'outline' as const,
          link: getLocalizedLink('/digital-transformation')
        },
        {
          icon: '/services/ai.svg',
          textKey: 'aiAutomations',
          type: 'outline' as const,
          link: getLocalizedLink('/ai-automations')
        },
      ]
    },
    'About Us': {
      labelKey: 'aboutUs',
      rightSideButtons: [
        {
          icon: '/services/financial.svg',
          textKey: 'mission',
          type: 'primary' as const,
          link: getLocalizedLink('/business#mission')
        },
        {
          icon: '/blogs.svg',
          textKey: 'team',
          type: 'outline' as const,
          link: getLocalizedLink('/business#team')
        },
        {
          icon: '/tick.svg',
          textKey: 'successStories',
          type: 'outline' as const,
          link: getLocalizedLink('/success-stories')
        },
        {
          icon: '/method.svg',
          textKey: 'features',
          type: 'outline' as const,
          link: getLocalizedLink('/features')
        },
        {
          icon: '/method.svg',
          textKey: 'ourMethodology',
          type: 'outline' as const,
          link: getLocalizedLink('/methodology')
        },
        {
          icon: '/events.svg',
          textKey: 'events',
          type: 'outline' as const,
          link: getLocalizedLink('/events')
        },
        {
          icon: '/blogs.svg',
          textKey: 'media',
          type: 'outline' as const,
          link: getLocalizedLink('/blogs')
        },
      ]
    },
    Features: {
      labelKey: 'features',
      rightSideButtons: []
    },
    'What Sets Us Apart': {
      labelKey: 'whatSetsUsApart',
      rightSideButtons: []
    },
    'Make an Impact': {
      labelKey: 'makeAnImpact',
      rightSideButtons: []
    },
    Career: {
      labelKey: 'career',
      rightSideButtons: []
    },
  }

  // Direct-link URLs for non-dropdown items
  const directLinks: Partial<Record<NavKey, string>> = {
    Features: getLocalizedLink('/features'),
    'What Sets Us Apart': getLocalizedLink('/what-sets-us-apart'),
    'Make an Impact': getLocalizedLink('/impacts'),
    Career: getLocalizedLink('/careers'),
  }

  // ─── HOVER / CLOSE HELPERS ────────────────────────────────────────────────
  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  const scheduleClose = (duration = 250) => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false);
      setActiveNavKey(null);
    }, duration);
  }

  const handleNavMouseEnter = (navKey: NavKey) => {
    // Only open a modal when there are dropdown items
    if (navItems[navKey].rightSideButtons.length === 0) return;
    cancelClose();
    setActiveNavKey(navKey);
    setIsModalOpen(true);
  }

  // Mobile click logic
  const handleNavClick = (navKey: NavKey) => {
    const hasDropdown = navItems[navKey].rightSideButtons.length > 0;

    if (!hasDropdown) {
      const link = directLinks[navKey];
      if (link) router.push(link);
      setIsMobileMenuOpen(false);
      return;
    }

    if (isModalOpen && activeNavKey !== navKey) {
      setActiveNavKey(navKey);
    } else if (!isModalOpen) {
      setActiveNavKey(navKey);
      setIsModalOpen(true);
    } else if (activeNavKey === navKey) {
      setIsModalOpen(false);
      setActiveNavKey(null);
    }
    setIsMobileMenuOpen(false);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveNavKey(null);
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <>
      <nav className="bg-white shadow-sm w-full z-50 lg:relative">
        <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link href={getLocalizedLink('/')} className="shrink-0">
              <img src="/Logo.svg" alt="Logo" className="h-12 md:h-auto" />
            </Link>

            {/* ── Desktop Navigation ── */}
            <div className="hidden lg:flex items-center gap-1">

              {/* Services — dropdown */}
              <DesktopNavButton
                navKey="Services"
                navItems={navItems}
                activeNavKey={activeNavKey}
                handleNavMouseEnter={handleNavMouseEnter}
                scheduleClose={scheduleClose}
                content={content}
                router={router}
                directLinks={directLinks}
                handleHashLink={handleHashLink}
              />

              {/* About Us — dropdown */}
              <DesktopNavButton
                navKey="About Us"
                navItems={navItems}
                activeNavKey={activeNavKey}
                handleNavMouseEnter={handleNavMouseEnter}
                scheduleClose={scheduleClose}
                content={content}
                router={router}
                directLinks={directLinks}
                handleHashLink={handleHashLink}
              />

              {/* Features — direct link */}
              <DesktopNavButton
                navKey="Features"
                navItems={navItems}
                activeNavKey={activeNavKey}
                handleNavMouseEnter={handleNavMouseEnter}
                scheduleClose={scheduleClose}
                content={content}
                router={router}
                directLinks={directLinks}
                handleHashLink={handleHashLink}
              />

              {/* What Sets Us Apart — direct link */}
              <DesktopNavButton
                navKey="What Sets Us Apart"
                navItems={navItems}
                activeNavKey={activeNavKey}
                handleNavMouseEnter={handleNavMouseEnter}
                scheduleClose={scheduleClose}
                content={content}
                router={router}
                directLinks={directLinks}
                handleHashLink={handleHashLink}
              />

              {/* Make an Impact — direct link */}
              <DesktopNavButton
                navKey="Make an Impact"
                navItems={navItems}
                activeNavKey={activeNavKey}
                handleNavMouseEnter={handleNavMouseEnter}
                scheduleClose={scheduleClose}
                content={content}
                router={router}
                directLinks={directLinks}
                handleHashLink={handleHashLink}
              />

              {/* Career — direct link */}
              <DesktopNavButton
                navKey="Career"
                navItems={navItems}
                activeNavKey={activeNavKey}
                handleNavMouseEnter={handleNavMouseEnter}
                scheduleClose={scheduleClose}
                content={content}
                router={router}
                directLinks={directLinks}
                handleHashLink={handleHashLink}
              />

              {/* Divider */}
              <span className="mx-2 h-5 w-px bg-gray-200" aria-hidden />

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* CTA */}
              <Link
                href={getLocalizedLink("/contact#form")}
                onClick={(e) => handleHashLink(e, getLocalizedLink("/contact#form"))}
                className="ml-2 bg-[#C9A84C] hover:bg-[#b8963e] text-white px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-150 whitespace-nowrap flex items-center justify-center"
              >
                {content.bookConsultation.value}
              </Link>
            </div>

            {/* ── Tablet & Mobile controls ── */}
            <div className="lg:hidden flex items-center gap-3">
              <Link
                href={getLocalizedLink("/contact#form")}
                onClick={(e) => handleHashLink(e, getLocalizedLink("/contact#form"))}
                className="hidden md:flex items-center justify-center bg-[#C9A84C] hover:bg-[#b8963e] text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-150"
              >
                {content.bookConsultation.value}
              </Link>

              <div className="md:block lg:hidden">
                <LanguageSwitcher />
              </div>

              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                aria-label="Toggle menu"
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

          {/* ── Mobile Menu ── */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-100 mt-1">
              <div className="flex flex-col divide-y divide-gray-100">
                <MobileNavButton
                  navKey="Services"
                  navItems={navItems}
                  activeNavKey={activeNavKey}
                  isModalOpen={isModalOpen}
                  handleNavClick={handleNavClick}
                  content={content}
                />
                <MobileNavButton
                  navKey="About Us"
                  navItems={navItems}
                  activeNavKey={activeNavKey}
                  isModalOpen={isModalOpen}
                  handleNavClick={handleNavClick}
                  content={content}
                />
                <MobileNavButton
                  navKey="Features"
                  navItems={navItems}
                  activeNavKey={activeNavKey}
                  isModalOpen={isModalOpen}
                  handleNavClick={handleNavClick}
                  content={content}
                />
                <MobileNavButton
                  navKey="What Sets Us Apart"
                  navItems={navItems}
                  activeNavKey={activeNavKey}
                  isModalOpen={isModalOpen}
                  handleNavClick={handleNavClick}
                  content={content}
                />
                <MobileNavButton
                  navKey="Make an Impact"
                  navItems={navItems}
                  activeNavKey={activeNavKey}
                  isModalOpen={isModalOpen}
                  handleNavClick={handleNavClick}
                  content={content}
                />
                <MobileNavButton
                  navKey="Career"
                  navItems={navItems}
                  activeNavKey={activeNavKey}
                  isModalOpen={isModalOpen}
                  handleNavClick={handleNavClick}
                  content={content}
                />
              </div>

              {/* Mobile CTA */}
              <div className="px-4 pt-4">
                <Link
                  href={getLocalizedLink("/contact#form")}
                  onClick={(e) => {
                    if (!handleHashLink(e, getLocalizedLink("/contact#form"))) {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-center bg-[#C9A84C] hover:bg-[#b8963e] text-white px-4 py-3 rounded-full text-sm font-semibold transition-colors duration-150"
                >
                  {content.bookConsultation.value}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Dropdown Modal ── */}
      <NavbarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        rightSideButtons={activeNavKey ? navItems[activeNavKey].rightSideButtons : []}
        onMouseEnter={cancelClose}
        onMouseLeave={() => scheduleClose(150)}
        handleHashLink={handleHashLink}
      />
    </>
  )
}

// ─── DESKTOP NAV BUTTON RENDERER ─────────────────────────────────────────
interface DesktopNavButtonProps {
  navKey: NavKey
  navItems: Record<NavKey, NavItem>
  activeNavKey: NavKey | null
  handleNavMouseEnter: (navKey: NavKey) => void
  scheduleClose: (duration?: number) => void
  content: Record<string, any>
  router: ReturnType<typeof useRouter>
  directLinks: Partial<Record<NavKey, string>>
  handleHashLink: (e: React.MouseEvent, link: string) => boolean
}

const DesktopNavButton = ({
  navKey,
  navItems,
  activeNavKey,
  handleNavMouseEnter,
  scheduleClose,
  content,
  router,
  directLinks,
  handleHashLink
}: DesktopNavButtonProps) => {
  const hasDropdown = navItems[navKey].rightSideButtons.length > 0;
  const isActive = activeNavKey === navKey;

  if (hasDropdown) {
    return (
      <button
        onMouseEnter={() => handleNavMouseEnter(navKey)}
        onMouseLeave={() => scheduleClose(300)}
        className={`
          text-[#4B5563] cursor-pointer px-3 py-2 text-sm font-semibold
          transition-colors duration-150 hover:text-gray-900
          ${isActive ? 'border-b-2 border-[#C9A84C] text-gray-900' : ''}
        `}
      >
        <span className="flex items-center gap-1">
          {(content as any)[navItems[navKey].labelKey].value}
          <svg
            className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        if (!handleHashLink(e, directLinks[navKey]!)) {
          router.push(directLinks[navKey]!)
        }
      }}
      className="text-[#4B5563] cursor-pointer px-3 py-2 text-sm font-semibold transition-colors duration-150 hover:text-gray-900"
    >
      {(content as any)[navItems[navKey].labelKey].value}
    </button>
  );
};

// ─── MOBILE NAV BUTTON RENDERER ──────────────────────────────────────────
interface MobileNavButtonProps {
  navKey: NavKey
  navItems: Record<NavKey, NavItem>
  activeNavKey: NavKey | null
  isModalOpen: boolean
  handleNavClick: (navKey: NavKey) => void
  content: Record<string, any>
}

const MobileNavButton = ({
  navKey,
  navItems,
  activeNavKey,
  isModalOpen,
  handleNavClick,
  content
}: MobileNavButtonProps) => {
  const hasDropdown = navItems[navKey].rightSideButtons.length > 0;
  const isActive = activeNavKey === navKey && isModalOpen;

  return (
    <button
      onClick={() => handleNavClick(navKey)}
      className={`
        w-full text-left text-[#4B5563] px-4 py-3 text-sm font-semibold
        flex items-center justify-between
        transition-colors duration-150
        ${isActive ? 'bg-yellow-50 border-l-4 border-[#C9A84C] text-gray-900' : 'hover:bg-gray-50'}
      `}
    >
      <span>{(content as any)[navItems[navKey].labelKey].value}</span>
      {hasDropdown && (
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </button>
  );
};

export default Navbar