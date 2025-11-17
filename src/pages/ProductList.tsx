"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { getProducts, Product } from '@/lib/localData';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setAllProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Lista de Todos os Produtos">
          Todos os Produtos
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Accessibility: Search input with clear label */}
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              className="w-full pl-10 py-2 rounded-md bg-background text-foreground border-border focus-visible:ring-ring transition-all duration-200 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Campo de busca de produtos"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>

          {/* Accessibility: Sort select with clear label */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px] bg-background text-foreground border-border focus-visible:ring-ring min-h-[44px] transition-all duration-200 ease-in-out">
              <SelectValue placeholder="Ordenar por" aria-label="Ordenar produtos por" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground border-border">
              <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
              <SelectItem value="price-asc">Preço (Menor para Maior)</SelectItem>
              <SelectItem value="price-desc">Preço (Maior para Menor)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`} aria-label={`Ver detalhes do produto ${product.name}`}>
                <CardHeader className="p-0">
                  <img src={product.image} alt={product.alt} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground mb-2">{product.description}</CardDescription>
                  <p className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                </CardContent>
              </Link>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-base rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label={`Adicionar ${product.name} ao carrinho`}>
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <p className="text-center text-lg text-muted-foreground mt-8">Nenhum produto encontrado com os critérios de busca.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;