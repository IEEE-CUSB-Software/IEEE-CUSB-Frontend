# UI Components Demo

This directory contains demo pages showcasing all the UI components in the IEEE CUSB Frontend application.

## Available Demo Pages

### 1. Buttons Demo (`/ui-demo/buttons`)

Showcases all button variants, sizes, and states:

- **Variants**: Primary, Secondary, Accent, Success, Danger, Outline, Ghost
- **Sizes**: Small, Medium, Large
- **States**: Loading, Disabled
- **Icons**: Left icon, Right icon, Icon-only buttons

### 2. DatePicker Demo (`/ui-demo/datepicker`)

Comprehensive date picker component with:

- Basic date selection
- Initial value support
- Min/max date constraints
- Date range selection (using two pickers)
- Error states
- Disabled state
- Mobile responsive design
- IEEE brand color theming

## Features

All components follow IEEE brand guidelines and support:

- ✅ Light/Dark mode theming
- ✅ Mobile-first responsive design
- ✅ Accessibility considerations
- ✅ TypeScript type safety
- ✅ Tailwind CSS styling

## Navigation

Access the UI Demo through:

1. Main navigation sidebar: Click "🎨 UI Demo"
2. Direct URL: `/ui-demo`

## Component Usage

All components are exported from `@/shared/components/ui` and can be imported like:

\`\`\`tsx
import { Button, DatePicker } from '@/shared/components/ui';
\`\`\`

See individual demo pages for detailed usage examples and code snippets.
