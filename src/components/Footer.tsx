"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-6 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Accessibility: Ensure links are clear and navigable */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navegação</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline transition-colors duration-200" aria-label="Ir para a página inicial">Home</Link></li>
            <li><Link to="/products" className="hover:underline transition-colors duration-200" aria-label="Ver todos os produtos">Produtos</Link></li>
            <li><Link to="/cart" className="hover:underline transition-colors duration-200" aria-label="Ver carrinho de compras">Carrinho</Link></li>
            <li><Link to="/auth" className="hover:underline transition-colors duration-200" aria-label="Acessar sua conta ou registrar">Login / Cadastro</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Suporte</h3>
          <ul className="space-y-2">
            <li><Link to="/help" className="hover:underline transition-colors duration-200" aria-label="Ir para a página de ajuda e suporte">Ajuda / Suporte</Link></li>
            <li><Link to="/contact" className="hover:underline transition-colors duration-200" aria-label="Entrar em contato conosco">Contato</Link></li>
            <li><Link to="/accessibility" className="hover:underline transition-colors duration-200" aria-label="Ver e ajustar configurações de acessibilidade">Acessibilidade</Link></li>
            <li><Link to="/about" className="hover:underline transition-colors duration-200" aria-label="Sobre o projeto e a equipe">Sobre o Projeto</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3">Precisa de Ajuda?</h3>
          {/* Accessibility: Chat button with clear label */}
          <Button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-lg text-base flex items-center gap-2 min-h-[44px] min-w-[44px] transition-colors duration-200"
            aria-label="Abrir chat de suporte assistido"
            onClick={() => alert('Chat de suporte assistido em breve!')} // Placeholder for chat functionality
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Chat Assistido
          </Button>
          <p className="text-sm mt-2">Disponível 24/7</p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} E-commerce Acessível. Todos os direitos reservados.</p>
        <p className="mt-2">Feito com foco em inclusão e acessibilidade.</p>
      </div>
    </footer>
  );
};

export default Footer;