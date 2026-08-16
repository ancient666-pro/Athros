import { createContext, useContext, useState, type ReactNode } from "react";
import type { PackageType } from "@/lib/bookings/bookings.server";

interface BookingModalContextValue {
  isOpen: boolean;
  selectedPackage: PackageType;
  openBookingModal: (pkg?: PackageType) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("PRODUCTION_READY");

  const openBookingModal = (pkg?: PackageType) => {
    if (pkg) setSelectedPackage(pkg);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        selectedPackage,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
