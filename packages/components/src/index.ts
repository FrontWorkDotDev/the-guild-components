export { Navbar, NotFoundPage, useConfig, useTheme, useThemeConfig } from 'nextra-theme-docs';
export {
  Callout,
  Cards,
  Code,
  FileTree,
  Mermaid,
  Steps,
  Tabs,
  Table,
  Bleed,
  Collapse,
  Search,
  Banner,
} from 'nextra/components';
export { useMounted } from 'nextra/hooks';
export * from './components';
export { PRODUCTS } from './products';
export * from './types/components';
export * from './logos';
export { cn } from './cn';
export * from './next-types';
export { normalizePages } from 'nextra/normalize-pages';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
