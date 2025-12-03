import { useState } from 'react';
import { Button } from '@/shared/components/ui';
import { PageWrapper } from '@/shared/components/generic';

/**
 * Buttons Demo Page
 * Showcases all button variants, sizes, and states
 */
export const ButtonsDemoPage = () => {
  const [loadingButtons, setLoadingButtons] = useState<Record<string, boolean>>(
    {}
  );

  const handleLoadingDemo = (buttonId: string) => {
    setLoadingButtons(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingButtons(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <PageWrapper className="space-y-12">
      {/* Variants Section */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Button Variants
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Solid Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Special Variants
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Button Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="small">
            Small
          </Button>
          <Button variant="primary" size="medium">
            Medium
          </Button>
          <Button variant="primary" size="large">
            Large
          </Button>
        </div>
      </section>

      {/* States Section */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Button States
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Loading State
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                isLoading={loadingButtons.btn1}
                onClick={() => handleLoadingDemo('btn1')}
              >
                Click to Load
              </Button>
              <Button
                variant="secondary"
                isLoading={loadingButtons.btn2}
                onClick={() => handleLoadingDemo('btn2')}
              >
                Loading Demo
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Disabled State
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* With Icons Section */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Buttons with Icons
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Left Icon
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                leftIcon={
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
              >
                Add New
              </Button>
              <Button
                variant="success"
                leftIcon={
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                }
              >
                Confirm
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Right Icon
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                rightIcon={
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
                }
              >
                Next
              </Button>
              <Button
                variant="accent"
                rightIcon={
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                }
              >
                Open External
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Icon Only
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="ghost"
                className="px-3!"
                leftIcon={
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                }
              />
              <Button
                variant="ghost"
                className="px-3!"
                leftIcon={
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                }
              />
              <Button
                variant="ghost"
                className="px-3!"
                leftIcon={
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example Section */}
      <section className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Usage Example
        </h2>
        <div className="bg-muted rounded-lg p-6">
          <pre className="text-sm overflow-x-auto">
            <code className="text-text-primary">
              {`import { Button } from '@/shared/components/ui';

// Basic usage
<Button variant="primary">Click me</Button>

// With size
<Button variant="secondary" size="large">Large Button</Button>

// With loading state
<Button variant="primary" isLoading={loading}>
  Submit
</Button>

// With icons
<Button 
  variant="accent"
  leftIcon={<Icon />}
>
  Add Item
</Button>

// Disabled
<Button variant="primary" disabled>
  Disabled
</Button>`}
            </code>
          </pre>
        </div>
      </section>
    </PageWrapper>
  );
};
