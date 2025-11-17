"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import React, { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/localData";

const Home = () => {
  const { simplifiedMode } = useAccessibility();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.slice(0, 4) || []); // Fetch up to 4 products for featured
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <section className="text-center my-12">
          <h1 className="text-5xl font-extrabold mb-6 text-primary-foreground" aria-label="Bem-vindo ao E-commerce Acessível">
            Bem-vindo ao E-commerce Acessível
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Sua loja online pensada para todos. Encontre produtos com facilidade e conforto, adaptados às suas necessidades.
          </p>
          <Link to="/products">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Explorar todos os produtos">
              Explorar Produtos
            </Button>
          </Link>
        </section>

        {!simplifiedMode && (
          <section className="my-16">
            <h2 className="text-4xl font-bold text-center mb-10 text-foreground" aria-label="Categorias de Produtos">
              Categorias Populares
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Accessibility: Ensure category links are clear and navigable by keyboard */}
              <Link to="/products?category=eletronicos" className="block" aria-label="Ver produtos da categoria Eletrônicos">
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Eletrônicos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src="/placeholder.svg" alt="Ícone de eletrônicos" className="mx-auto h-24 w-24 mb-4" />
                    <CardDescription>Dispositivos para o dia a dia.</CardDescription>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/products?category=casa" className="block" aria-label="Ver produtos da categoria Casa e Cozinha">
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Casa e Cozinha</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src="/placeholder.svg" alt="Ícone de casa" className="mx-auto h-24 w-24 mb-4" />
                    <CardDescription>Conforto e praticidade para seu lar.</CardDescription>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/products?category=saude" className="block" aria-label="Ver produtos da categoria Saúde e Bem-estar">
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Saúde e Bem-estar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src="/placeholder.svg" alt="Ícone de saúde" className="mx-auto h-24 w-24 mb-4" />
                    <CardDescription>Produtos para seu cuidado pessoal.</CardDescription>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/products?category=mobilidade" className="block" aria-label="Ver produtos da categoria Mobilidade">
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Mobilidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src="/placeholder.svg" alt="Ícone de mobilidade" className="mx-auto h-24 w-24 mb-4" />
                    <CardDescription>Soluções para sua independência.</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        )}


        <section className="my-16">
          <h2 className="text-4xl font-bold text-center mb-10 text-foreground" aria-label="Produtos em Destaque">
            Produtos em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <Link to={`/product/${product.id}`} aria-label={`Ver detalhes do produto ${product.name}`}>
                  <CardHeader className="p-0">
                    <img src={product.image} alt={product.alt} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                    <CardDescription className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</CardDescription>
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
          <div className="text-center mt-10">
            <Link to="/products">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Ver Todos os Produtos Disponíveis">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;