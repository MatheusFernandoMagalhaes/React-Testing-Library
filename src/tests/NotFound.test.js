import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found 😭;', () => {
    render(<NotFound />);
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const sadPikachu = screen.getByAltText(/pikachu crying/i);
    expect(sadPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
