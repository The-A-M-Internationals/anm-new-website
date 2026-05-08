'use client'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
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
  // New props for the bridge logic
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      // Changed top-20 to top-16 to physically touch the navbar 
      className="fixed start-0 top-16 md:-top-55 lg:top-[120px] w-full z-50 md:h-screen md:flex md:items-center md:justify-center lg:block lg:h-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 md:hidden transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="w-[95%] md:w-[85%] lg:w-[90%] mx-auto md:max-h-[85vh] md:overflow-y-auto p-2 md:p-4">

        {/* CONTENT CARD - This is where we apply the Mouse Logic */}
        <div
          onMouseEnter={onMouseEnter} // Keep open when hovering the content
          onMouseLeave={onMouseLeave} // Close when leaving the content
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
            {/* Left side - Static content */}
            <div className="items-center flex flex-col gap-2 w-full md:w-[50%]">
              <div className="w-full md:w-fit bg-gradient-to-r from-[#FFFFFF] to-[#FFFBED] rounded-[15px] md:rounded-[20px] shadow-md px-4 md:px-8 py-4 md:py-6 flex flex-col gap-3 border border-gray-100">
                {/* Title */}
                <h2 className="text-lg md:text-2xl font-semibold text-gray-900">
                  {t.masterclassTitle.value}
                </h2>

                {/* Button */}
                <a href={t.masterclassRegisterUrl.value} target="_blank" onClick={onClose}>
                  <div className='flex w-full justify-center items-center'>
                    <button className="bg-[#D4AF37] text-black font-semibold px-4 md:px-7 py-2 md:py-3 rounded-full flex items-center gap-2 w-fit text-sm md:text-base cursor-pointer hover:scale-105 transition">
                      {t.masterclassRegisterBtn.value}
                      <ArrowRight className='w-4 h-4 md:w-5 md:h-5 rtl:rotate-180' />
                    </button>
                  </div>
                </a>
              </div>

              <div className="w-full md:w-fit bg-gradient-to-r from-[#FFFFFF] to-[#FFFBED] rounded-[15px] md:rounded-[20px] shadow-md px-4 md:px-8 py-4 md:py-6 flex flex-col gap-3 border border-gray-100">
                {/* Title */}
                <h2 className="text-lg md:text-2xl font-semibold text-gray-900">
                  {t.signsTitle.value}
                </h2>

                {/* Date & Time */}
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 md:gap-3">
                  {/* Time */}
                  <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                    <Clock className='w-4 h-4 md:w-6 md:h-6 text-[#D4AF37] font-light' />
                    <span className="text-gray-900 font-medium text-sm md:text-base">{t.signsReadTime.value}</span>
                  </div>

                  <button onClick={() => { onClose(); router.push(`/${currentLocale}/blogs#article`) }} className="text-[#D4AF37] font-semibold flex items-center gap-2 w-fit transition text-sm md:text-base cursor-pointer hover:scale-105 transition">
                    {t.signsReadBtn.value}
                    <ArrowRight className='w-4 h-4 md:w-5 md:h-5 rtl:rotate-180' />
                  </button>
                </div>
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
                  <span className="text-base md:text-xl font-semibold">{navbarContent[button.textKey].value}</span>
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