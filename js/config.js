/**
 * VileSaint Configuration
 * Update these values with your Supabase project credentials.
 */
const CONFIG = {
  // Supabase project — replace with your own
  supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR-ANON-KEY',

  // Site
  siteUrl: 'https://vilesaint.com',
  siteName: 'VileSaint',
  defaultLanguage: 'en',

  // Rate limits (client-side enforcement)
  rateLimit: {
    maxCommentsPerMinute: 5,
    duplicateWindowMs: 30000,
  },

  // Comment settings
  comments: {
    maxLength: 500,
    pageSize: 50,
    maxNesting: 2,
    hotWindowMinutes: 30,
    hotnessDecay: 1.0,
  },

  // Canvas settings
  canvas: {
    posterWidth: 1080,
    posterHeight: 1350,
    qrCodeSize: 240,
  },

  // Featured case slug (hardcoded for initial launch)
  defaultCaseSlug: 'raul-jimenez-mexico-south-africa-2026',
};

// Prevent accidental modification
Object.freeze(CONFIG);
