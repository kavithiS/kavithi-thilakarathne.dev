/**
 * Global type definitions for the LakinduQA Portfolio
 */

export interface StatsCounter {
  element: HTMLElement;
  target: number;
  current: number;
  increment: number;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface CarouselConfig {
  autoPlay: boolean;
  interval: number;
  showDots: boolean;
  showArrows: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SkillItem {
  name: string;
  level: number;
  category: string;
}

// Utility types
export type ThemeMode = 'light' | 'dark';
export type AnimationState = 'idle' | 'running' | 'paused' | 'finished';
export type LoadingState = 'loading' | 'loaded' | 'error';

// Event handler types
export type ScrollHandler = (event: Event) => void;
export type ClickHandler = (event: MouseEvent) => void;
export type ResizeHandler = (event: UIEvent) => void;