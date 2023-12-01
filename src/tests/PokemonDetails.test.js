import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import pokemons from '../data';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se as informações detalhadas do pokémon são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const details = screen.getByText(/Pikachu Details/i);
    const summary = screen.getByText(/Summary/i);
    const p = screen.getByText(/This intelligent Pokémon roasts hard berries with./);
    expect(details).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(p).toBeInTheDocument();
  });
  test(`Se existe na página uma 
  seção com os mapas contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const h2 = screen.getAllByRole('heading', { level: 2 });
    expect(h2[2]).toHaveTextContent(/Game Locations of Pikachu/i);
    const location1 = screen.getByText(/Kanto Viridian Forest/i);
    expect(location1).toBeInTheDocument();
    const location2 = screen.getByText(/Kanto Power Plant/i);
    expect(location2).toBeInTheDocument();
    const img = screen.getAllByRole('img');
    console.log(img);
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(img[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(img[2]).toHaveAttribute('alt', 'Pikachu location');
  });
  test(`Se o usuário pode favoritar um 
  pokémon através da página de detalhes:`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const fav = screen.getByRole('checkbox');
    if (!screen.getByRole('checkbox').checked) {
      userEvent.click(fav);
      expect(screen.getByRole('checkbox').checked).toEqual(true);
      const imgFavorite = screen.getByAltText('Pikachu is marked as favorite');
      expect(imgFavorite).toBeInTheDocument();
    }
    if (screen.getByRole('checkbox').checked) {
      userEvent.click(fav);
      expect(screen.getByRole('checkbox').checked).toEqual(false);
    }
    const label = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
  });
});
