import { memo } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError;
}

const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('data' in error) {
    return (error.data as { message: string }).message;
  }
  if ('message' in error && error.message) {
    return error.message;
  }
  return 'Произошла ошибка при загрузке данных';
};

export const ErrorMessage = memo(({ error }: ErrorMessageProps) => {
  return (
    <div className="text-red-500 mt-2.5" data-testid="error-message">
      {getErrorMessage(error)}
    </div>
  );
}); 