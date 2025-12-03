import { useState } from 'react';
import { DatePicker } from '@/shared/components/ui';

/**
 * DatePicker Demo Page
 * Showcases all date picker features and configurations
 */
export const DatePickerDemoPage = () => {
  const [selectedDate1, setSelectedDate1] = useState<Date | undefined>();
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(
    new Date()
  );
  const [selectedDate3, setSelectedDate3] = useState<Date | undefined>();
  const [selectedDate4, setSelectedDate4] = useState<Date | undefined>();
  const [selectedDate5, setSelectedDate5] = useState<Date | undefined>();

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="space-y-12">
      {/* Basic DatePicker */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Basic DatePicker
        </h2>
        <div className="max-w-md">
          <DatePicker
            label="Select Date"
            value={selectedDate1}
            onChange={setSelectedDate1}
            placeholder="Choose a date"
          />
          {selectedDate1 && (
            <div className="mt-4 p-4 bg-background-light rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Selected Date:</p>
              <p className="font-semibold text-primary">
                {selectedDate1.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* With Initial Value */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          DatePicker with Initial Value
        </h2>
        <div className="max-w-md">
          <DatePicker
            label="Event Date"
            value={selectedDate2}
            onChange={setSelectedDate2}
            placeholder="Select event date"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            This picker has today's date pre-selected
          </p>
        </div>
      </section>

      {/* With Min/Max Dates */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          DatePicker with Constraints
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <DatePicker
              label="Minimum Date (Today)"
              value={selectedDate3}
              onChange={setSelectedDate3}
              placeholder="Select future date"
              minDate={today}
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Cannot select dates before today
            </p>
          </div>
          <div>
            <DatePicker
              label="Maximum Date (Next Week)"
              value={selectedDate4}
              onChange={setSelectedDate4}
              placeholder="Select date this week"
              maxDate={nextWeek}
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Cannot select dates after next week
            </p>
          </div>
        </div>
      </section>

      {/* Date Range Example */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Date Range (Using Two Pickers)
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <DatePicker
            label="Start Date"
            value={selectedDate3}
            onChange={setSelectedDate3}
            placeholder="Select start date"
          />
          <DatePicker
            label="End Date"
            value={selectedDate4}
            onChange={setSelectedDate4}
            placeholder="Select end date"
            minDate={selectedDate3}
          />
        </div>
        {selectedDate3 && selectedDate4 && (
          <div className="mt-4 p-4 bg-background-light rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Selected Range:
            </p>
            <p className="font-semibold text-primary">
              {selectedDate3.toLocaleDateString()} -{' '}
              {selectedDate4.toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Duration:{' '}
              {Math.ceil(
                (selectedDate4.getTime() - selectedDate3.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{' '}
              days
            </p>
          </div>
        )}
      </section>

      {/* Error State */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          DatePicker with Error
        </h2>
        <div className="max-w-md">
          <DatePicker
            label="Required Date"
            value={selectedDate5}
            onChange={setSelectedDate5}
            placeholder="This field is required"
            error={!selectedDate5 ? 'Please select a date' : undefined}
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Disabled DatePicker
        </h2>
        <div className="max-w-md">
          <DatePicker
            label="Disabled Picker"
            value={today}
            placeholder="Cannot interact"
            disabled
          />
          <p className="mt-2 text-sm text-muted-foreground">
            This picker is disabled and cannot be interacted with
          </p>
        </div>
      </section>

      {/* Mobile Responsive */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Mobile Responsive
        </h2>
        <div className="max-w-md">
          <DatePicker
            label="Responsive Picker"
            value={selectedDate1}
            onChange={setSelectedDate1}
            placeholder="Try on mobile"
          />
          <div className="mt-4 p-4 bg-info/10 border border-info rounded-lg">
            <p className="text-sm text-info-foreground">
              💡 <strong>Tip:</strong> On mobile devices (screen width &lt;
              768px), the calendar appears as a centered modal with an overlay
              for better UX.
            </p>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                IEEE Brand Colors
              </h3>
              <p className="text-sm text-muted-foreground">
                Uses official IEEE color palette
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                Mobile Responsive
              </h3>
              <p className="text-sm text-muted-foreground">
                Optimized for both desktop and mobile
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                Date Constraints
              </h3>
              <p className="text-sm text-muted-foreground">
                Min/max date validation
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Clear & Today</h3>
              <p className="text-sm text-muted-foreground">
                Quick action buttons included
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                Keyboard Navigation
              </h3>
              <p className="text-sm text-muted-foreground">
                Click outside to close picker
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                Error Handling
              </h3>
              <p className="text-sm text-muted-foreground">
                Built-in validation support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Usage Example
        </h2>
        <div className="bg-muted rounded-lg p-6">
          <pre className="text-sm overflow-x-auto">
            <code className="text-text-primary">
              {`import { DatePicker } from '@/shared/components/ui';
import { useState } from 'react';

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <DatePicker
      label="Select Date"
      value={date}
      onChange={setDate}
      placeholder="Choose a date"
      minDate={new Date()} // Optional: today as minimum
      error={!date ? 'Required field' : undefined}
    />
  );
}`}
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
};
