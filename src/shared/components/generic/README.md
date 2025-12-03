# Generic Components

Reusable layout and structural components for the IEEE CUSB Frontend application.

## PageWrapper

A responsive wrapper component that ensures consistent spacing, padding, and layout across all pages.

### Features

- **Max-width container**: Configurable maximum width (sm, md, lg, xl, 2xl, full)
- **Responsive padding**: Mobile-first padding that scales up on larger screens
- **Center alignment**: Automatically centers content horizontally
- **Optional padding**: Can disable padding for full-width layouts

### Props

| Prop        | Type                                              | Default  | Description                    |
| ----------- | ------------------------------------------------- | -------- | ------------------------------ |
| `children`  | `ReactNode`                                       | required | Content to wrap                |
| `className` | `string`                                          | `''`     | Additional CSS classes         |
| `maxWidth`  | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`   | Maximum width of the container |
| `noPadding` | `boolean`                                         | `false`  | Remove default padding         |

### Usage

#### Basic Usage

```tsx
import { PageWrapper } from '@/shared/components/generic';

export const MyPage = () => {
  return (
    <PageWrapper>
      <h1>Page Title</h1>
      <p>Page content goes here...</p>
    </PageWrapper>
  );
};
```

#### Custom Max Width

```tsx
<PageWrapper maxWidth="2xl">
  <YourContent />
</PageWrapper>
```

#### Without Padding

```tsx
<PageWrapper noPadding>
  <FullWidthComponent />
</PageWrapper>
```

#### With Additional Classes

```tsx
<PageWrapper className="space-y-6">
  <Section1 />
  <Section2 />
</PageWrapper>
```

### Responsive Behavior

The PageWrapper uses mobile-first responsive design:

- **Mobile**: `px-4 py-6`
- **Tablet (md)**: `px-6 py-8`
- **Desktop (lg)**: `px-8 py-10`

### Max Width Options

| Value  | Max Width | Use Case                         |
| ------ | --------- | -------------------------------- |
| `sm`   | 640px     | Narrow content (forms, articles) |
| `md`   | 768px     | Medium content                   |
| `lg`   | 1024px    | Standard pages                   |
| `xl`   | 1280px    | Default - most pages             |
| `2xl`  | 1536px    | Wide layouts                     |
| `full` | 100%      | Full-width layouts               |

### Best Practices

1. **Use on all pages**: Wrap all page content with PageWrapper for consistency
2. **Choose appropriate max-width**: Use `xl` for most pages, `2xl` for dashboards, `sm` for forms
3. **Combine with spacing utilities**: Add `className="space-y-8"` for vertical spacing between sections
4. **Disable padding carefully**: Only use `noPadding` when you need precise control over spacing

### Examples

#### Standard Page

```tsx
export const HomePage = () => {
  return (
    <PageWrapper>
      <h1>Welcome</h1>
      <ExampleFeature />
    </PageWrapper>
  );
};
```

#### Wide Dashboard

```tsx
export const DashboardPage = () => {
  return (
    <PageWrapper maxWidth="2xl" className="space-y-6">
      <Header />
      <StatsGrid />
      <ChartSection />
    </PageWrapper>
  );
};
```

#### Narrow Form Page

```tsx
export const LoginPage = () => {
  return (
    <PageWrapper maxWidth="sm">
      <LoginForm />
    </PageWrapper>
  );
};
```
