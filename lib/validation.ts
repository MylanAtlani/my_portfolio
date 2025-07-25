export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  project?: string;
  budget?: string;
  message: string;
  honeypot?: string;
}

export function validateContactForm(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Vérification du honeypot
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.push('Spam détecté');
    return { isValid: false, errors };
  }

  // Validation du nom
  if (!data.name?.trim()) {
    errors.push('Le nom est requis');
  } else if (data.name.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  } else if (data.name.trim().length > 100) {
    errors.push('Le nom est trop long');
  }

  // Validation de l'email
  if (!data.email?.trim()) {
    errors.push('L\'email est requis');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Format d\'email invalide');
    }
    
    // Vérification des domaines suspects
    const suspiciousDomains = ['10minutemail.com', 'guerrillamail.com', 'tempmail.org'];
    const domain = data.email.split('@')[1]?.toLowerCase();
    if (domain && suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
      errors.push('Type d\'email temporaire non autorisé');
    }
  }

  // Validation du message
  if (!data.message?.trim()) {
    errors.push('Le message est requis');
  } else if (data.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  } else if (data.message.trim().length > 2000) {
    errors.push('Le message est trop long (max 2000 caractères)');
  }

  // Vérification des mots-clés spam
  const spamKeywords = [
    'viagra', 'casino', 'loan', 'credit', 'debt', 'make money fast',
    'click here', 'free money', 'lottery', 'winner', 'urgent'
  ];
  
  const messageLower = data.message.toLowerCase();
  const foundSpamKeywords = spamKeywords.filter(keyword => 
    messageLower.includes(keyword)
  );
  
  if (foundSpamKeywords.length > 0) {
    errors.push('Contenu suspect détecté');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validation côté serveur
export function validateServerSide(data: ContactFormData): { isValid: boolean; error?: string } {
  // Vérifications supplémentaires côté serveur
  if (!data.name || !data.email || !data.message) {
    return { isValid: false, error: 'Données manquantes' };
  }

  // Vérification de la longueur des champs
  if (data.name.length > 100 || data.email.length > 254 || data.message.length > 2000) {
    return { isValid: false, error: 'Données trop longues' };
  }

  // Vérification du format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: 'Email invalide' };
  }

  return { isValid: true };
}