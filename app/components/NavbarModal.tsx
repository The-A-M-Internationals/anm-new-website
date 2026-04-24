'use client'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import '../components/navbarModal.content'
import { useIntlayer } from "next-intlayer";
import { useLocale } from "next-intlayer";
import type { AppLocale } from "@/types/locale";

type IntlayerKey = keyof ReturnType<typeof useIntlayer>;

interface RightSideButton {
  icon: string
  textKey: IntlayerKey
  type: string
  link: string
}

interface NavbarModalProps {
  isOpen: boolean
  onClose: () => void
  rightSideButtons: RightSideButton[]
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const NavbarModal = ({
  isOpen,
  onClose,
  rightSideButtons,
}: NavbarModalProps) => {
  const { locale } = useLocale();
  const currentLocale = locale as AppLocale;
  const router = useRouter();
  const navbarContent = useIntlayer("navbar");
  const t = useIntlayer("navbarModal");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      setTimeout(() => {
          document.addEventListener('mousedown', handleClickOutside)
      }, 100);
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed start-0 top-16 md:-top-55 lg:top-[120px] w-full z-50 md:h-screen md:flex md:items-center md:justify-center lg:block lg:h-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="w-[95%] md:w-[85%] lg:w-[90%] mx-auto md:max-h-[85vh] md:overflow-y-auto p-2 md:p-4">

        {/* CONTENT CARD */}
        <div
          ref={modalRef}
          className="relative bg-[#F9F9F9] rounded-2xl md:rounded-4xl border border-gray-300 w-full h-fit overflow-hidden p-4 md:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-2 end-2 md:top-4 md:end-4 text-gray-400 hover:text-gray-600 z-10 p-2 cursor-pointer"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row justify-start gap-4 md:gap-0">
          {/* LEFT side - Static content */}
          <div className="flex flex-col gap-0 w-full md:w-[460px] shrink-0 px-2">
            <div className="flex flex-row items-center justify-between border-b border-gray-100 pb-1">
              {/* Title */}
              <h2 className="text-[16px] md:text-[17px] font-bold text-gray-900 leading-tight">
                {t.masterclassTitle}
              </h2>

              {/* Button */}
              <a href={t.masterclassRegisterUrl} target="_blank" onClick={onClose} className="shrink-0">
                <button className="bg-[#D4AF37] text-black font-bold h-7 px-4 rounded-full flex items-center gap-1 text-[11px] md:text-[12px] cursor-pointer hover:scale-105 transition">
                  Register
                  <ArrowRight className='w-3.5 h-3.5 rtl:rotate-180' />
                </button>
              </a>
            </div>
          </div>

            {/* Right side - Dynamic content from props */}
            <div className="flex flex-row content-start flex-wrap w-full md:w-[50%] gap-2 md:gap-4 mt-4 md:mt-6 md:ms-4">
              {rightSideButtons.map((button, index) => (
                <Link
                  href={button.link}
                  scroll={true}
                  onClick={onClose}
                  key={index}
                  className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-xl border border-[#D4AF37] shadow hover:shadow-md transition w-full sm:w-auto"
                >
                  <img src={button.icon} alt="Bottom Icon" className='w-6 h-5 md:w-8 md:h-6' />
                  <span className="text-base md:text-xl font-semibold">{navbarContent[button.textKey]}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarModal
