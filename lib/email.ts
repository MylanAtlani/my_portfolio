export interface ContactFormData {
    name: string;
    email: string;
    company?: string;
    project?: string;
    budget?: string;
    message: string;
  }
  
  export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Erreur lors de l\'envoi du message'
        };
      }
  
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      return {
        success: false,
        error: 'Erreur de connexion'
      };
    }
  }