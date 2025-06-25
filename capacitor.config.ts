
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.53c05a0b5a0847c8afa61f87a64b53d2',
  appName: 'La Mia Dieta',
  webDir: 'dist',
  server: {
    url: 'https://53c05a0b-5a08-47c8-afa6-1f87a64b53d2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#16a34a",
      showSpinner: false
    }
  }
};

export default config;
