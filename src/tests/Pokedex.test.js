import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons;', () => {
    renderWithRouter(<App />);
    const pokedexMessage = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2 });
    expect(pokedexMessage).toBeInTheDocument();
  });
  test('Se é exibido o próximo pokémon da lista quando clica em Próximo pokémon', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextPoke = screen.getByRole('button', {
      name: /próximo pokémon/i });
    userEvent.click(nextPoke);
    const charmander = screen.getByAltText(/charmander sprite/i);
    expect(charmander.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    userEvent.click(nextPoke);
    const caterpie = screen.getByAltText(/caterpie sprite/i);
    expect(caterpie.src).toBe('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
    userEvent.click(nextPoke);
    const ekans = screen.getByAltText(/ekans sprite/i);
    expect(ekans.src).toBe('https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
    userEvent.click(nextPoke);
    const alakazam = screen.getByAltText(/alakazam sprite/i);
    expect(alakazam.src).toBe('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
    userEvent.click(nextPoke);
    const mew = screen.getByAltText(/mew sprite/i);
    expect(mew.src).toBe('https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');
    userEvent.click(nextPoke);
    const rapidash = screen.getByAltText(/rapidash sprite/i);
    expect(rapidash.src).toBe('https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png');
    userEvent.click(nextPoke);
    const snorlax = screen.getByAltText(/snorlax sprite/i);
    expect(snorlax.src).toBe('https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    userEvent.click(nextPoke);
    const dragonair = screen.getByAltText(/dragonair sprite/i);
    expect(dragonair.src).toBe('https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    userEvent.click(nextPoke);
    expect(pikachu).toBeInTheDocument();
  });
  test('Se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
    const electric = screen.getByRole('button', { name: /electric/i });
    expect(electric).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    const fire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fire);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPoke);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    const bug = screen.getByRole('button', { name: /bug/i });
    expect(bug).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    const poison = screen.getByRole('button', { name: /poison/i });
    expect(poison).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    const psychic = screen.getByRole('button', { name: /psychic/i });
    expect(psychic).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    userEvent.click(psychic);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    userEvent.click(nextPoke);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();
    const normal = screen.getByRole('button', { name: /normal/i });
    expect(normal).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    const dragon = screen.getByRole('button', { name: /dragon/i });
    expect(dragon).toBeInTheDocument();
    expect(all).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    const pikachu = screen.getByAltText(/pikachu sprite/i);
    expect(pikachu.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se data test ID tem 7 quantidades', () => {
    renderWithRouter(<App />);
    const length = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(length);
  });
});
