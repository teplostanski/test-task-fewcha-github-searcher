import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

describe('ErrorMessage', () => {
  describe('getErrorMessage', () => {
    it('должен отобразить сообщение из data.message', () => {
      const error = {
        status: 404,
        data: { message: 'Тестовая ошибка' }
      } as FetchBaseQueryError;

      render(<ErrorMessage error={error} />);
      expect(screen.getByText('Тестовая ошибка')).toBeInTheDocument();
    });

    it('должен отобразить сообщение из error.message', () => {
      const error = {
        message: 'Тестовая ошибка'
      } as SerializedError;

      render(<ErrorMessage error={error} />);
      expect(screen.getByText('Тестовая ошибка')).toBeInTheDocument();
    });

    it('должен отобразить дефолтное сообщение, если нет message', () => {
      const error = {
        status: 500
      } as FetchBaseQueryError;

      render(<ErrorMessage error={error} />);
      expect(screen.getByText('Произошла ошибка при загрузке данных')).toBeInTheDocument();
    });
  });
}); 