/* eslint-disable @typescript-eslint/no-explicit-any */

// src/types/global.d.ts
declare global {
  interface FacebookPixel {
    (command: 'init', pixelId: string): void;
    (command: 'track', event: string, parameters?: Record<string, unknown>): void;
    (command: 'trackCustom', event: string, parameters?: Record<string, unknown>): void;
    push: (...args: any[]) => void;
  }

  interface GoogleTag {
    (...args: any[]): void;
  }

  interface Window {
    fbq?: FacebookPixel;
    gtag?: GoogleTag;
    dataLayer?: any[];
  }
}

// This export is needed for ES module systems
export {};
