import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  reviews?: number;
  features?: string[];
  videoUrl?: string;
}

let products: Product[] = [
  {
    id: uuidv4(),
    name: 'Fone de Ouvido com Cancelamento de Ruído',
    description: 'Experimente um som imersivo com cancelamento de ruído ativo, ideal para ambientes barulhentos. Conforto e qualidade de áudio superiores.',
    price: 299.90,
    image: '/Fone de Ouvido com Cancelamento de Ruído.jpg',
    alt: 'Fone de Ouvido com Cancelamento de Ruído',
    reviews: 4.5,
    features: ['Cancelamento de ruído ativo', 'Bateria de longa duração', 'Conexão Bluetooth 5.0'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: uuidv4(),
    name: 'Teclado Ergonômico com Teclas Grandes',
    description: 'Teclado projetado para conforto, com teclas grandes e espaçadas, ideal para digitação prolongada e usuários com dificuldades motoras.',
    price: 189.50,
    image: '/Teclado Ergonômico com Teclas Grandes.jpg',
    alt: 'Teclado branco com teclas grandes e layout ergonômico',
    reviews: 4.8,
    features: ['Design ergonômico', 'Teclas de alto contraste', 'Conexão USB plug-and-play'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: uuidv4(),
    name: 'Mouse Vertical Ergonômico',
    description: 'Reduz a tensão no pulso e antebraço com um design vertical inovador. Perfeito para longas horas de uso.',
    price: 99.99,
    image: '/Mouse Vertical Ergonômico.jpg',
    alt: 'Mouse vertical ergonômico na cor preta',
    reviews: 4.2,
    features: ['Design vertical para conforto', 'DPI ajustável', 'Conexão sem fio 2.4GHz'],
  },
  {
    id: uuidv4(),
    name: 'Relógio Inteligente com Monitor Cardíaco',
    description: 'Monitore sua saúde e atividades diárias com este relógio inteligente. Possui tela grande e fácil de ler.',
    price: 350.00,
    image: '/Relógio Inteligente com Monitor Cardíaco.jpg',
    alt: 'Relógio inteligente com tela digital mostrando batimentos cardíacos',
    reviews: 4.7,
    features: ['Monitor de frequência cardíaca', 'Contador de passos', 'Notificações de smartphone'],
  },
  {
    id: uuidv4(),
    name: 'Lupa de Leitura com Iluminação LED',
    description: 'Facilite a leitura de textos pequenos com esta lupa de alta qualidade, equipada com luzes LED para melhor visibilidade.',
    price: 75.00,
    image: '/Lupa de Leitura com Iluminação LED.jpg',
    alt: 'Lupa de mão com iluminação LED acesa',
    reviews: 4.6,
    features: ['Ampliação de 3x', 'Iluminação LED ajustável', 'Leve e portátil'],
  },
  {
    id: uuidv4(),
    name: 'Telefone Fixo com Teclas Grandes',
    description: 'Telefone simples e funcional, com teclas grandes e volume amplificado, ideal para idosos e pessoas com deficiência visual ou auditiva.',
    price: 120.00,
    image: '/Telefone Fixo com Teclas Grandes.jpg',
    alt: 'Telefone fixo branco com botões numéricos grandes',
    reviews: 4.9,
    features: ['Teclas grandes e iluminadas', 'Volume ajustável', 'Função viva-voz'],
  },
];

export const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return products;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return products.find(p => p.id === id);
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const newProduct = { ...product, id: uuidv4(), price: parseFloat(product.price.toString()) };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...updatedProduct, price: parseFloat(updatedProduct.price.toString()) };
    return products[index];
  }
  return undefined;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  return products.length < initialLength;
};
