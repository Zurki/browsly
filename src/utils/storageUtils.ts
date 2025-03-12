import { LinkSection } from '../types';

const STORAGE_KEYS = {
  DASHBOARD_SECTIONS: 'dashboardSections',
  DARK_MODE: 'darkMode',
  SELECTED_SEARCH_ENGINE: 'selectedSearchEngine'
};

/**
 * Save sections data to localStorage
 * @param sections - The sections data to save
 * @returns boolean indicating success
 */
export function saveSections(sections: LinkSection[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEYS.DASHBOARD_SECTIONS, JSON.stringify(sections));
    return true;
  } catch (error) {
    console.error('Error saving sections to localStorage:', error);
    return false;
  }
}

/**
 * Load sections data from localStorage
 * @param defaultSections - Default sections to use if none are found
 * @returns The loaded sections or default sections
 */
export function loadSections(defaultSections: LinkSection[]): LinkSection[] {
  try {
    const savedSections = localStorage.getItem(STORAGE_KEYS.DASHBOARD_SECTIONS);
    if (savedSections) {
      return JSON.parse(savedSections);
    }
  } catch (error) {
    console.error('Error loading sections from localStorage:', error);
  }
  return defaultSections;
}

/**
 * Save dark mode preference to localStorage
 * @param isDarkMode - Whether dark mode is enabled
 */
export function saveDarkMode(isDarkMode: boolean): void {
  localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDarkMode.toString());
}

/**
 * Load dark mode preference from localStorage
 * @returns The loaded dark mode preference or null if not found
 */
export function loadDarkMode(): boolean | null {
  const savedMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
  if (savedMode !== null) {
    return savedMode === 'true';
  }
  return null;
}

/**
 * Save selected search engine to localStorage
 * @param engine - The selected search engine
 */
export function saveSearchEngine(engine: string): void {
  localStorage.setItem(STORAGE_KEYS.SELECTED_SEARCH_ENGINE, engine);
}

/**
 * Load selected search engine from localStorage
 * @param defaultEngine - Default engine to use if none is found
 * @returns The loaded search engine or default engine
 */
export function loadSearchEngine(defaultEngine: string): string {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_SEARCH_ENGINE) || defaultEngine;
} 