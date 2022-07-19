import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do componente <App.js />', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorite = screen.getByRole('link', { name: /favorite/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
  test('Se a aplicação é redirecionada para a URL / ao clicar no link Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const homePage = screen.getByRole('heading', {
      name: /encountered/i,
      level: 2,
    });
    expect(homePage).toBeInTheDocument();
  });
  test('Se a aplicação é redirecionada para about, ao clicar em About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const aboutPage = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 2,
    });
    expect(aboutPage).toBeInTheDocument();
  });
  test('Se é redirecionada para favorites, ao clicar em Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(favorite);
    const favoritePage = screen.getByRole('heading', {
      name: /favorite/i,
      level: 2,
    });
    expect(favoritePage).toBeInTheDocument();
  });
  test('Se é redirecionada para Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons-lendários');
    const NotFoundPage = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(NotFoundPage).toBeInTheDocument();
  });
});
