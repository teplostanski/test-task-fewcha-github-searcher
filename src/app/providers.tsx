import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { HeroUIProvider } from '@heroui/react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </HeroUIProvider>
  );
};
