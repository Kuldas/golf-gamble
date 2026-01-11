// src/alpine/alert.js
import { alerts } from '../data/alertsData.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('alert', (key) => {
    const config = alerts[key];

    if (!config) {
      console.warn(`Alert "${key}" neexistuje`);
    }

    return {
      ...config,
      type: config?.type ?? 'info',
      title: config?.title ?? '',
      message: config?.message ?? '',
      showIcon: config?.showIcon ?? true,
      showVersion: config?.showVersion ?? false,

      get classes() {
        return {
          warning: 'alert-warning alert-soft',
          info: 'alert-info alert-soft',
          success: 'alert-success alert-soft',
          error: 'alert-error alert-soft',
        }[this.type];
      },
    };
  });
});
