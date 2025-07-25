'use client';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function useGTM() {
  const pushEvent = (event: string, data?: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event,
        ...data,
      });
    }
  };

  const trackContactForm = (formData: any) => {
    pushEvent('contact_form_submit', {
      form_name: formData.name,
      form_email: formData.email,
      form_company: formData.company,
      form_project: formData.project,
      form_budget: formData.budget,
    });
  };

  const trackPageView = (page: string) => {
    pushEvent('page_view', {
      page_title: page,
      page_location: window.location.href,
    });
  };

  const trackScroll = (section: string) => {
    pushEvent('scroll_to_section', {
      section_name: section,
    });
  };

  return {
    pushEvent,
    trackContactForm,
    trackPageView,
    trackScroll,
  };
} 