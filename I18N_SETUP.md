# i18next Translation Setup

## Installation

Run the following command to install the required packages:

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

## What's Been Added

### 1. Translation Files
- `src/locales/ar/translation.json` - Arabic translations
- `src/locales/en/translation.json` - English translations

### 2. Configuration
- `src/lib/i18n.ts` - i18next configuration with language detection

### 3. Components
- `src/components/i18n-provider.tsx` - Provider wrapper for i18n
- `src/components/language-switcher.tsx` - Language toggle button (AR/EN)

### 4. Updated Components
The following components have been updated to use translations:
- `src/app/layout.tsx` - Wrapped with I18nProvider
- `src/components/navigation.tsx` - Navigation links + language switcher
- `src/app/page.tsx` - Homepage content (hero, about, stats)
- `src/components/footer.tsx` - Footer content
- `src/components/offers-section.tsx` - Offers UI labels + benefits section (excluding DB content)
- `src/components/news-section.tsx` - News UI labels (excluding DB content)
- `src/app/contact/page.tsx` - Contact page (all content)
- `src/app/offers/page.tsx` - Offers page hero section
- `src/app/media/page.tsx` - Media gallery page
- `src/app/testimonials/page.tsx` - Testimonials page (all content)

## Features

### Language Switcher
- Located in the navigation bar (desktop)
- Located in mobile menu footer (mobile)
- Toggles between Arabic (AR) and English (EN)
- Automatically updates document direction (RTL/LTR)
- Saves preference to localStorage

### Automatic Language Detection
- Detects browser language on first visit
- Falls back to Arabic if detection fails
- Remembers user's language choice

### RTL/LTR Support
- Automatically switches document direction based on language
- Arabic: RTL (right-to-left)
- English: LTR (left-to-right)

## Translation Coverage

### ✅ Translated (Static Content)
- Navigation menu
- Hero section
- About section
- Offers section UI (buttons, labels, pricing labels, benefits/gifts)
- News section UI (buttons, labels)
- Footer
- Contact page (complete)
- Offers page hero section
- Media gallery page (complete)
- Testimonials page (complete including certificate descriptions)
- Common UI elements

### ❌ Not Translated (Database Content)
As requested, the following database-driven content remains untranslated:
- News titles, dates, and content
- Umrah offer titles, descriptions, features
- Hajj offer details
- Any other dynamic content from the database

## Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  );
}
```

## Adding New Translations

1. Add the key to both `src/locales/ar/translation.json` and `src/locales/en/translation.json`
2. Use the translation in your component with `t('your.key')`

Example:
```json
// ar/translation.json
{
  "mySection": {
    "title": "عنوان القسم"
  }
}

// en/translation.json
{
  "mySection": {
    "title": "Section Title"
  }
}
```

## Next Steps

After running `npm install`, the translation system will be fully functional. The language switcher will appear in the navigation, and all static content will be translatable between Arabic and English.
