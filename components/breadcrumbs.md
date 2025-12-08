# Breadcrumbs Component

A simple, clean path navigation component for your Next.js pages.

## Features

- ✨ Automatically generates breadcrumbs from the current URL path
- 🏠 Includes a home icon for easy navigation back to the homepage
- 🎨 Clean, minimal design with hover effects
- 📱 Responsive and accessible
- 🔧 Customizable labels for each path segment

## Usage

### Basic Usage

```tsx
import Breadcrumbs from '@/components/breadcrumbs';

export default function YourPage() {
  return (
    <div>
      <Breadcrumbs />
      {/* Your page content */}
    </div>
  );
}
```

### With Custom Styling

```tsx
<Breadcrumbs className="mb-8 px-4" />
```

### With Custom Labels

By default, the component capitalizes URL segments and has predefined labels for common routes. You can override these:

```tsx
<Breadcrumbs
  customLabels={{
    'my-custom-route': 'Custom Label',
    'another-route': 'Another Label'
  }}
/>
```

## Default Labels

The component includes default labels for:
- `along-care` → "Along Care"
- `terms-conditions` → "Terms & Conditions"
- `warranty-policy` → "Warranty Policy"
- `blog` → "Blog"
- `models` → "Models"
- `order` → "Order"
- `routes` → "Routes"

## Example

For the URL `/blog/my-first-post`, the breadcrumbs will display:

🏠 > Blog > My First Post

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customLabels` | `Record<string, string>` | `{}` | Custom labels for path segments |
| `className` | `string` | `''` | Additional CSS classes |

## Behavior

- Does not render on the homepage (`/`)
- The current page is displayed in bold and is not clickable
- All parent paths are clickable links
- Uses Tabler Icons for the home and chevron icons
