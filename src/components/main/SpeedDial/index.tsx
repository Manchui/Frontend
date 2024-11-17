import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as m from 'framer-motion/m';
import Device from '@/constants/device';
import { SPEED_DIAL_BUTTONS } from '@/constants/speedDial';
import useDeviceState from '@/hooks/useDeviceState';
import useInternalRouter from '@/hooks/useInternalRouter';

export default function SpeedDial() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useInternalRouter();

  const deviceState = useDeviceState();

  const toggleSpeedDial = () => setIsOpen((prev) => !prev);

  if (deviceState !== Device.Tablet && deviceState !== Device.Mobile) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[50px]">
      <AnimatePresence>
        {isOpen && (
          <m.div className="mb-2 flex flex-col items-center space-y-2">
            {SPEED_DIAL_BUTTONS.map((button, i) => (
              <m.div
                key={button.label}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: isOpen ? (SPEED_DIAL_BUTTONS.length - 1 - i) * 0.1 : i * 0.1,
                  duration: 0.3,
                }}
              >
                <div className="relative flex items-center">
                  <div className="absolute right-16 flex items-center gap-5 text-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                    {button.label}
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-[7px] border-l-[7px] border-y-transparent border-l-gray-800" />
                  </div>
                  <button
                    onClick={() => router.push(button.link)}
                    type="button"
                    className="flex-center size-[50px] rounded-full bg-gray-700 shadow-md hover:bg-blue-700"
                  >
                    {button.icon}
                  </button>
                </div>
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={toggleSpeedDial}
        className="z-50 flex size-[50px] items-center justify-center rounded-full bg-blue-800 shadow-md hover:bg-blue-700"
        aria-label="Toggle Speed Dial"
      >
        <m.svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          color="white"
          strokeWidth={2}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </m.svg>
      </button>
    </div>
  );
}
