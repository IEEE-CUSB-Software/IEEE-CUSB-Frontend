import { PageWrapper } from '@/shared/components/generic';

/**
 * PageWrapper Demo Page
 * Showcases the PageWrapper component with different configurations
 */
export const PageWrapperDemoPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header showing full width */}
      <div className="bg-primary text-primary-foreground py-4">
        <PageWrapper>
          <h1 className="text-3xl font-bold">PageWrapper Demo</h1>
          <p className="text-primary-foreground/80">
            Consistent spacing & layout for all pages
          </p>
        </PageWrapper>
      </div>

      {/* Main content with different examples */}
      <PageWrapper className="space-y-8">
        {/* Features Section */}
        <section className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Key Features
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>✓ Responsive padding (mobile, tablet, desktop)</li>
            <li>✓ Configurable max-width containers</li>
            <li>✓ Automatic horizontal centering</li>
            <li>✓ Optional padding control</li>
            <li>✓ Custom className support</li>
          </ul>
        </section>

        {/* Max Width Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary">
            Max Width Options
          </h2>

          {/* Small */}
          <div className="bg-muted/30 p-4 rounded">
            <PageWrapper maxWidth="sm" noPadding>
              <div className="bg-card border-2 border-primary rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-2">
                  Small (max-w-screen-sm)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Best for narrow content like forms and articles
                </p>
              </div>
            </PageWrapper>
          </div>

          {/* Medium */}
          <div className="bg-muted/30 p-4 rounded">
            <PageWrapper maxWidth="md" noPadding>
              <div className="bg-card border-2 border-accent rounded-lg p-6">
                <h3 className="font-semibold text-accent mb-2">
                  Medium (max-w-screen-md)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Good for medium-width content
                </p>
              </div>
            </PageWrapper>
          </div>

          {/* Large */}
          <div className="bg-muted/30 p-4 rounded">
            <PageWrapper maxWidth="lg" noPadding>
              <div className="bg-card border-2 border-success rounded-lg p-6">
                <h3 className="font-semibold text-success mb-2">
                  Large (max-w-screen-lg)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Standard pages with moderate content
                </p>
              </div>
            </PageWrapper>
          </div>

          {/* Extra Large (Default) */}
          <div className="bg-muted/30 p-4 rounded">
            <PageWrapper maxWidth="xl" noPadding>
              <div className="bg-card border-2 border-secondary rounded-lg p-6">
                <h3 className="font-semibold text-secondary mb-2">
                  Extra Large (max-w-screen-xl) - DEFAULT
                </h3>
                <p className="text-sm text-muted-foreground">
                  Default option - works well for most pages
                </p>
              </div>
            </PageWrapper>
          </div>

          {/* 2XL */}
          <div className="bg-muted/30 p-4 rounded">
            <PageWrapper maxWidth="2xl" noPadding>
              <div className="bg-card border-2 border-info rounded-lg p-6">
                <h3 className="font-semibold text-info mb-2">
                  2X Large (max-w-screen-2xl)
                </h3>
                <p className="text-sm text-muted-foreground">
                  For wide layouts like dashboards with multiple columns
                </p>
              </div>
            </PageWrapper>
          </div>
        </section>

        {/* Padding Demo */}
        <section className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
          <div className="bg-primary text-primary-foreground px-6 py-4">
            <h2 className="text-2xl font-bold">Responsive Padding</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="bg-primary/10 border-2 border-primary border-dashed">
                <PageWrapper>
                  <div className="bg-card p-4 rounded">
                    <p className="text-sm">
                      <strong>Mobile:</strong> px-4 py-6
                    </p>
                    <p className="text-sm">
                      <strong>Tablet:</strong> px-6 py-8
                    </p>
                    <p className="text-sm">
                      <strong>Desktop:</strong> px-8 py-10
                    </p>
                  </div>
                </PageWrapper>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Code Example */}
        <section className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Usage Example
          </h2>
          <div className="bg-muted rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm">
              <code className="text-text-primary">{`import { PageWrapper } from '@/shared/components/generic';

export const MyPage = () => {
  return (
    <PageWrapper maxWidth="xl" className="space-y-6">
      <h1>Page Title</h1>
      <section>Content section 1</section>
      <section>Content section 2</section>
    </PageWrapper>
  );
};`}</code>
            </pre>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Best Practices
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-success text-xl">✓</span>
              <div>
                <p className="font-medium text-text-primary">
                  Use on all pages for consistency
                </p>
                <p className="text-sm text-muted-foreground">
                  Wrap all page content to maintain uniform spacing
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-success text-xl">✓</span>
              <div>
                <p className="font-medium text-text-primary">
                  Choose appropriate max-width
                </p>
                <p className="text-sm text-muted-foreground">
                  xl for standard pages, 2xl for dashboards, sm for forms
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-success text-xl">✓</span>
              <div>
                <p className="font-medium text-text-primary">
                  Combine with spacing utilities
                </p>
                <p className="text-sm text-muted-foreground">
                  Use className="space-y-6" for vertical section spacing
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-destructive text-xl">✗</span>
              <div>
                <p className="font-medium text-text-primary">
                  Avoid nested PageWrappers
                </p>
                <p className="text-sm text-muted-foreground">
                  Only use once per page at the top level
                </p>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
};
