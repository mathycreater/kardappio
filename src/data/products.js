import pizzaEspecial from '../assets/pizza-especial.jpg'
import burgerClassico from '../assets/burger-classico.jpg'
import comboSushi from '../assets/combo-sushi.jpg'

const products = [
  {
    id: 1,
    name: 'Burger Clássico',
    category: 'lanches',
    price: 32.90,
    sku: 'SKU-001',
    image: burgerClassico,
    extras: ['Carne mal passada', 'Ao ponto', 'Bem passada'],
  },

  {
    id: 2,
    name: 'Pizza Especial',
    category: 'pizzas',
    price: 54.90,
    sku: 'SKU-002',
    image: pizzaEspecial,
    extras: ['Borda de catupiry', 'Borda de cheddar'],
  },

  {
    id: 3,
    name: 'Combo Sushi',
    category: 'oriental',
    price: 72.90,
    sku: 'SKU-003',
    image: comboSushi,
    extras: ['Temaki tradicional', 'Temaki hot'],
  },
]

export default products