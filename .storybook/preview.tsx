import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';
import { ThemeProvider } from '@theguild/components/src';
import NextImage, { ImageProps } from 'next/image';
import NextLink, { LinkProps } from 'next/link';

import '@algolia/autocomplete-theme-classic';
import '../styles/global.css';
import '../styles/search-bar-v2.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Components', ['Headers'], 'Projects'],
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.normal, appBg: 'white' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' },
  },
  // Remove padding from storybook in mobile
  layout: 'fullscreen',
};

const OriginalNextImage = NextImage;
const OriginalNextLink = NextLink;

// https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: ImageProps) => <OriginalNextImage {...props} unoptimized />,
});

Object.defineProperty(NextLink, 'default', {
  configurable: true,
  value: (props: LinkProps) => <OriginalNextLink {...props} legacyBehavior={false} />,
});

export const decorators = [
  Story => (
    <ThemeProvider forcedTheme={useDarkMode() ? 'dark' : 'light'}>
      <Story />
    </ThemeProvider>
  ),
];
