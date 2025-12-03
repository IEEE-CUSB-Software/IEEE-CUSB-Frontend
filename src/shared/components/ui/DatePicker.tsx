import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

/**
 * DatePicker Component
 * A comprehensive date picker with desktop and mobile views
 * Follows IEEE brand colors and Material Design principles
 */
export const DatePicker = ({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  error,
  disabled = false,
  minDate,
  maxDate,
  className = '',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [currentMonth, setCurrentMonth] = useState(
    value
      ? new Date(value.getFullYear(), value.getMonth(), 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [isMobile, setIsMobile] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty slots for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
  };

  const handleYearChange = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setShowYearPicker(false);
  };

  // Generate year range (current year ± 100 years)
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const minYear = minDate ? minDate.getFullYear() : currentYear - 100;
    const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 100;
    const years: number[] = [];
    for (let year = minYear; year <= maxYear; year++) {
      years.push(year);
    }
    return years;
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    // Check min/max date constraints
    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
    onChange?.(today);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    onChange?.(undefined as any);
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {/* Input Field */}
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-medium text-text-muted tracking-wide uppercase">
            {label}
          </label>
        )}

        <div
          className={`
            relative flex items-center gap-2 px-4 py-3 
            bg-surface border-b-2 transition-all cursor-pointer
            rounded-t-lg
            ${isOpen ? 'border-primary bg-background-light' : 'border-border'}
            ${error ? 'border-destructive' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-background-light'}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <input
            type="text"
            value={formatDate(selectedDate)}
            placeholder={placeholder}
            readOnly
            disabled={disabled}
            className={`
              flex-1 bg-transparent outline-none cursor-pointer
              text-text-primary placeholder:text-muted-foreground
              ${disabled ? 'cursor-not-allowed' : ''}
            `}
          />

          {/* Calendar Icon */}
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          {/* Clear Button */}
          {selectedDate && !disabled && (
            <button
              onClick={e => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 rounded-full hover:bg-muted transition-colors"
              type="button"
            >
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {error && (
          <span className="text-xs text-destructive tracking-wide">
            {error}
          </span>
        )}
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          {isMobile && <div className="fixed inset-0 bg-black/20 z-40" />}

          <div
            className={`
              ${
                isMobile
                  ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'
                  : 'absolute top-full left-0 mt-1 z-10'
              }
              bg-card shadow-2xl rounded-lg overflow-hidden
              border border-border
              ${isMobile ? 'w-[90vw] max-w-sm' : 'w-80'}
            `}
          >
            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                type="button"
                aria-label="Previous month"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {/* Month Dropdown */}
                <select
                  value={currentMonth.getMonth()}
                  onChange={e => handleMonthChange(Number(e.target.value))}
                  className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-sm font-medium cursor-pointer outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  {months.map((month, index) => (
                    <option
                      key={month}
                      value={index}
                      className="bg-card text-text-primary"
                    >
                      {month}
                    </option>
                  ))}
                </select>

                {/* Year Dropdown/Picker Toggle */}
                <button
                  onClick={() => setShowYearPicker(!showYearPicker)}
                  className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-sm font-medium transition-colors"
                  type="button"
                >
                  {currentMonth.getFullYear()}
                  <svg
                    className={`w-3 h-3 inline-block ml-1 transition-transform ${showYearPicker ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleNextMonth}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                type="button"
                aria-label="Next month"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Year Picker or Calendar Grid */}
            {showYearPicker ? (
              <div className="p-4 bg-card max-h-64 overflow-y-auto">
                <div className="grid grid-cols-4 gap-2">
                  {generateYears().map(year => (
                    <button
                      key={year}
                      onClick={() => handleYearChange(year)}
                      type="button"
                      className={`
                        px-3 py-2 rounded-lg text-sm font-medium transition-all
                        ${
                          year === currentMonth.getFullYear()
                            ? 'bg-primary text-primary-foreground shadow-md scale-105'
                            : year === new Date().getFullYear()
                              ? 'bg-accent/20 text-accent-foreground font-bold'
                              : 'text-text-primary hover:bg-muted'
                        }
                      `}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-card">
                {/* Week Days */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map(day => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && handleDateSelect(day)}
                      disabled={!day || isDateDisabled(day)}
                      type="button"
                      className={`
                        aspect-square flex items-center justify-center rounded-full
                        text-sm font-medium transition-all
                        ${!day ? 'invisible' : ''}
                        ${
                          day && isSelected(day)
                            ? 'bg-primary text-primary-foreground shadow-md scale-105'
                            : day && isToday(day)
                              ? 'bg-accent text-accent-foreground font-bold'
                              : 'text-text-primary hover:bg-muted'
                        }
                        ${day && isDateDisabled(day) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                        disabled:cursor-not-allowed disabled:hover:bg-transparent
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface border-t border-border gap-2">
              <Button
                variant="outline"
                size="small"
                onClick={handleToday}
                type="button"
              >
                Today
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Done
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
