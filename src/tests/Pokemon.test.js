import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import pokemons from '../data';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name', { name: /pikachu/i });
    const type = screen.getByTestId('pokemon-type', { name: /electric/i });
    const weight = screen.getByTestId('pokemon-weight', {
      name: /Average weight: 6.0 kg/i });
    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(type).toContainHTML('Electric');
    expect(weight).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Se o card do pokémon contém link de navegação para exibir mais detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const summary = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(summary).toBeInTheDocument();
  });
  test('Se ao clicar no link de nav do pokémon,é redirecionado para detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(('/pokemons/25'));
  });
  test('Se existe um ícone de estrela nos pokémons favoritados:', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const favButton = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favButton);
    const imgFavButton = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(imgFavButton).toBeInTheDocument();
    expect(imgFavButton).toHaveAttribute('src', '/star-icon.svg');
  });
});
