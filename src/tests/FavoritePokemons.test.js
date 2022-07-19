import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Se é exibida na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
  test('Se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const snorlaxButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(snorlaxButton);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkFavoritePokemon = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkFavoritePokemon);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    const snorlaxImg = screen.getByAltText(/snorlax sprite/i);
    expect(snorlaxImg.src).toEqual('https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
  });
});
