interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function checkRateLimit(identifier: string, maxRequests: number = 3, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = identifier;
  
  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    };
    return true;
  }
  
  if (store[key].count >= maxRequests) {
    return false;
  }
  
  store[key].count++;
  return true;
}

// Nettoyage périodique des anciennes entrées
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}, 60000); // Nettoyage toutes les minutes 