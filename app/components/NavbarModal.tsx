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
  onMouseEnter,
  onMouseLeave
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
          document.addEventListener('click', handleClickOutside)
      }, 100);
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed start-0 top-16 lg:top-[120px] w-full z-50 px-4"
    >
      {/* Backdrop for click outside - hidden visually but captures clicks */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-[1200px] mx-auto bg-[#F9F9F9] rounded-2xl md:rounded-4xl border border-gray-300 shadow-2xl overflow-hidden p-4 md:p-8 relative animate-fadeIn"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-2 end-2 md:top-4 md:end-4 text-gray-400 hover:text-gray-600 z-10 p-2 cursor-pointer transition-colors"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row justify-start gap-6 md:gap-8 mt-4">
          {/* Left side - Static content */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <div className="w-full bg-gradient-to-r from-[#FFFFFF] to-[#FFFBED] rounded-2xl shadow-sm px-6 py-5 md:py-8 flex flex-col gap-4 border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                {t.masterclassTitle}
              </h2>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className='w-5 h-5 text-[#D4AF37]' />
                  <span className="text-gray-900 font-semibold text-sm md:text-base">{t.masterclassDateMain}</span>
                  <span className="text-gray-500 text-sm md:text-base">{t.masterclassDateSub}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className='w-5 h-5 text-[#D4AF37]' />
                  <span className="text-gray-900 font-semibold text-sm md:text-base">{t.masterclassTime}</span>
                </div>
              </div>

              <a href={t.masterclassRegisterUrl} target="_blank" onClick={onClose} className="w-fit">
                <button className="bg-[#D4AF37] text-black font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-full flex items-center gap-2 text-sm md:text-base cursor-pointer hover:scale-105 transition shadow-sm">
                  {t.masterclassRegisterBtn}
                  <ArrowRight className='w-4 h-4 md:w-5 md:h-5 rtl:rotate-180' />
                </button>
              </a>
            </div>

            <div className="w-full bg-gradient-to-r from-[#FFFFFF] to-[#FFFBED] rounded-2xl shadow-sm px-6 py-5 md:py-8 flex flex-col gap-4 border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                {t.signsTitle}
              </h2>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className='w-5 h-5 text-[#D4AF37]' />
                  <span className="text-gray-900 font-semibold text-sm md:text-base">{t.signsReadTime}</span>
                </div>

                <button 
                  onClick={() => { onClose(); router.push(`/${currentLocale}/blogs#article`) }} 
                  className="text-[#D4AF37] font-bold flex items-center gap-2 w-fit hover:scale-105 transition text-sm md:text-base cursor-pointer"
                >
                  {t.signsReadBtn}
                  <ArrowRight className='w-4 h-4 md:w-5 md:h-5 rtl:rotate-180' />
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Dynamic content from props */}
          <div className="flex flex-row content-start flex-wrap w-full md:w-1/2 gap-3 md:gap-4">
            {rightSideButtons.map((button, index) => (
              <Link
                href={button.link}
                scroll={true}
                onClick={onClose}
                key={index}
                className="flex items-center gap-3 bg-white px-5 md:px-6 py-3 rounded-2xl border border-gray-200 shadow-sm hover:border-[#D4AF37] hover:shadow-md transition-all group w-full sm:w-[calc(50%-8px)] lg:w-full"
              >
                <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-[#D4AF37]/10 transition-colors">
                  <img src={button.icon} alt="Icon" className='w-6 h-6 md:w-8 md:h-8' />
                </div>
                <span className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-[#D4AF37] transition-colors">{navbarContent[button.textKey]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default NavbarModal