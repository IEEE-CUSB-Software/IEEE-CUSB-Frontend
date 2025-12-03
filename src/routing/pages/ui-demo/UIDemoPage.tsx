import { Link, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { PageWrapper } from '@/shared/components/generic';

/**
 * UI Demo Page
 * Main page for showcasing all UI components
 */
export const UIDemoPage = () => {
  const location = useLocation();
  const isMainPage = location.pathname === ROUTES.UI_DEMO;

  const demoLinks = [
    { to: ROUTES.UI_DEMO_BUTTONS, label: 'Buttons', icon: '🔘' },
    { to: ROUTES.UI_DEMO_DATEPICKER, label: 'Date Picker', icon: '📅' },
    { to: ROUTES.UI_DEMO_PAGEWRAPPER, label: 'Page Wrapper', icon: '📐' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">UI Components Demo</h1>
          <p className="text-primary-foreground/80">
            IEEE CUSB Frontend Component Library
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-surface border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto">
            {demoLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center gap-2 px-4 py-3 font-medium
                    border-b-2 transition-all whitespace-nowrap
                    ${
                      isActive
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-muted-foreground hover:text-text-primary hover:border-border'
                    }
                  `}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      {isMainPage ? (
        <PageWrapper maxWidth="2xl">
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Welcome to the UI Component Library
            </h2>
            <p className="text-muted-foreground mb-6">
              Browse through our collection of reusable UI components built with
              React, TypeScript, and Tailwind CSS, themed with IEEE brand
              colors.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {demoLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="
                    group p-6 rounded-lg border-2 border-border
                    hover:border-primary hover:shadow-lg
                    transition-all duration-200
                    bg-surface hover:bg-background-light
                  "
                >
                  <div className="text-4xl mb-3">{link.icon}</div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary">
                    {link.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    View {link.label.toLowerCase()} examples and variants
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </PageWrapper>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
