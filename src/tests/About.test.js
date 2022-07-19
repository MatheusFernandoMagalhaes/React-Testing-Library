import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Teste o componente <About.js />.', () => {
  test('Se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const pokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(pokedex).toBeInTheDocument();
  });
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      name: /About Pokédex/i, level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs.length).toEqual(2);
  });
  test('Se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByAltText(/pokédex/i);
    expect(image.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
