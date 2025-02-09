import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/shared/styles/global.css';
import { Home } from '@/pages/home';
import { Providers } from './providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Home />
    </Providers>
  </StrictMode>
);
