"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
}

const Cart = () => {
  const { toast } = useToast();
  // Dummy cart items (in a real app, this would come from a global state/context)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Fone de Ouvido com Cancelamento de Ruído', price: 299.90, quantity: 1, image: '/placeholder.svg', alt: 'Fone de ouvido preto' },
    { id: '2', name: 'Teclado Ergonômico com Teclas Grandes', price: 189.50, quantity: 2, image: '/placeholder.svg', alt: 'Teclado branco' },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removido!",
      description: "O item foi removido do seu carrinho.",
      duration: 3000,
      variant: "destructive",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 25.00; // Fixed dummy shipping
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Seu Carrinho de Compras">
          Seu Carrinho
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg shadow-lg">
            <p className="text-xl text-muted-foreground mb-6">Seu carrinho está vazio.</p>
            <Link to="/products">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Continuar comprando">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-md">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-24 h-24 object-cover rounded-md mr-4 mb-4 sm:mb-0"
                    aria-label={`Imagem do produto ${item.name}`}
                  />
                  <div className="flex-grow text-center sm:text-left">
                    <CardTitle className="text-xl font-semibold mb-1">{item.name}</CardTitle>
                    <p className="text-lg font-bold text-primary mb-2">R$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-10 w-10 text-lg min-h-[44px] min-w-[44px] transition-colors duration-200"
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 text-center text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                        aria-label={`Quantidade de ${item.name}, atualmente ${item.quantity}`}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-10 w-10 text-lg min-h-[44px] min-w-[44px] transition-colors duration-200"
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-destructive hover:bg-destructive/10 min-h-[44px] min-w-[44px] transition-colors duration-200"
                        aria-label={`Remover ${item.name} do carrinho`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="p-6 shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Frete:</span>
                  <span className="font-semibold">R$ {shipping.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-2xl font-bold text-primary">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="mt-6">
                <Link to="/checkout" className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-xl rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Prosseguir para o checkout">
                    Prosseguir para o Checkout
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;