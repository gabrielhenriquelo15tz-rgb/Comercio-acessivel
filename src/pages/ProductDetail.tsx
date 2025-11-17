"use client";

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Truck, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getProductById, Product } from '@/lib/localData';
import { useSpeech } from '@/hooks/use-speech'; // Importa o hook de fala

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { speak, isSpeaking, stopSpeaking, hasSpeechSynthesis } = useSpeech();

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      const data = await getProductById(productId);
      setProduct(data || null);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8 text-center">
          <h1 className="text-3xl font-bold mt-10">Produto não encontrado.</h1>
          <p className="text-lg mt-4">Por favor, verifique o ID do produto e tente novamente.</p>
          <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200">
            <Link to="/products" aria-label="Voltar para a lista de produtos">Voltar para Produtos</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    // Placeholder for adding to cart logic
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
      duration: 3000,
      variant: "default",
    });
    console.log(`Adicionando ${product.name} ao carrinho.`);
  };

  const handleReadDescription = () => {
    if (product?.description) {
      if (isSpeaking) {
        stopSpeaking();
      } else {
        speak(product.description);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:underline transition-colors duration-200">Home</Link> / <Link to="/products" className="hover:underline transition-colors duration-200">Produtos</Link> / <span aria-current="page">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card p-6 rounded-lg shadow-lg">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.alt}
              className="w-full max-w-md h-auto object-contain rounded-lg border border-border"
              aria-label={`Imagem do produto: ${product.name}`}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-foreground" aria-label={`Nome do produto: ${product.name}`}>
              {product.name}
            </h1>
            <div className="flex items-center gap-2 text-lg text-muted-foreground" aria-label={`Avaliação do produto: ${product.reviews} de 5 estrelas`}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.reviews || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} aria-hidden="true" />
                ))}
              </div>
              <span>({product.reviews} estrelas)</span>
            </div>
            <p className="text-5xl font-extrabold text-primary" aria-label={`Preço: R$ ${product.price.toFixed(2)}`}>
              R$ {product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-lg text-foreground leading-relaxed" aria-label={`Descrição do produto: ${product.description}`}>
                {product.description}
              </p>
              {hasSpeechSynthesis && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleReadDescription}
                  className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 ${isSpeaking ? 'text-yellow-400 animate-pulse' : ''}`}
                  aria-label={isSpeaking ? "Parar leitura da descrição" : "Ouvir descrição do produto"}
                  aria-pressed={isSpeaking}
                >
                  {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              )}
            </div>

            <Separator className="my-4" />

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-xl rounded-lg min-h-[44px] min-w-[44px] font-semibold transition-colors duration-200"
              onClick={handleAddToCart}
              aria-label={`Adicionar ${product.name} ao carrinho de compras`}
            >
              Adicionar ao Carrinho
            </Button>

            <div className="flex items-center gap-4 text-muted-foreground text-sm mt-4">
              <div className="flex items-center gap-1" aria-label="Entrega rápida">
                <Truck className="h-5 w-5" aria-hidden="true" />
                <span>Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-1" aria-label="Compra segura">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                <span>Compra Segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <section className="my-12 bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-foreground" aria-label="Características do Produto">
              Características
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-foreground list-disc pl-5">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Product Video (Placeholder for accessibility features) */}
        {product.videoUrl && (
          <section className="my-12 bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-foreground" aria-label="Vídeo do Produto">
              Vídeo do Produto
            </h2>
            <div className="aspect-video w-full max-w-3xl mx-auto">
              <iframe
                width="100%"
                height="100%"
                src={product.videoUrl}
                title={`Vídeo de demonstração do produto ${product.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
                // Accessibility: Add aria-label and ensure controls are accessible
                aria-label={`Player de vídeo para ${product.name}. Este vídeo inclui legendas, transcrição e audiodescrição.`}
              ></iframe>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Este vídeo possui legendas, transcrição e audiodescrição para garantir a acessibilidade a todos os usuários.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;