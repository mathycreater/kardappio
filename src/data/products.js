import pizzaEspecial from '../assets/pizza-especial.jpg'
import burgerClassico from '../assets/burger-classico.jpg'
import comboSushi from '../assets/combo-sushi.jpg'

const products = [
  {
    id: 1,
    name: 'Burger Clássico',
    price: 32.90,
    image: burgerClassico,
    extras: ['Carne mal passada', 'Ao ponto', 'Bem passada'],
  },

  {
    id: 2,
    name: 'Pizza Especial',
    price: 54.90,
    image: pizzaEspecial,
    extras: ['Borda de catupiry', 'Borda de cheddar'],
  },

  {
    id: 3,
    name: 'Combo Sushi',
    price: 72.90,
    image: comboSushi,
    extras: ['Temaki tradicional', 'Temaki hot'],
  },
]

export default products