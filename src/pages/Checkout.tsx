"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Mic, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useSpeech } from '@/hooks/use-speech'; // Importa o hook de fala

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { simplifiedMode } = useAccessibility();
  const { isListening, startListening, stopListening, transcript, clearTranscript, hasSpeechRecognition } = useSpeech();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'pix',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const cartItems = [ // Dummy cart items for checkout summary
    { id: '1', name: 'Fone de Ouvido', price: 299.90, quantity: 1 },
    { id: '2', name: 'Teclado Ergonômico', price: 189.50, quantity: 2 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 25.00;
  const total = subtotal + shipping;

  useEffect(() => {
    if (transcript.toLowerCase().includes('confirmar pedido')) {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
      clearTranscript();
      stopListening();
    } else if (transcript) {
      toast.info(`Comando de voz não reconhecido: "${transcript}". Tente "Confirmar Pedido".`, { duration: 3000 });
      clearTranscript();
    }
  }, [transcript, clearTranscript, stopListening, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual order processing
    console.log('Order submitted:', formData);
    toast({
      title: "Pedido Realizado com Sucesso!",
      description: "Seu pedido foi enviado e está sendo processado. Obrigado por comprar conosco!",
      duration: 5000,
      variant: "success",
    });
    navigate('/order-confirmation'); // Redirect to a confirmation page
  };

  const handleVoiceConfirmationToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      toast.info("Diga 'Confirmar Pedido' para finalizar a compra.", { duration: 3000 });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Checkout Simplificado">
          Checkout Simplificado
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <Card className="lg:col-span-2 p-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">Informações de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-lg">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address" className="text-lg">Endereço</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Rua, número, complemento"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                  aria-required="true"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="city" className="text-lg">Cidade</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Sua cidade"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip" className="text-lg">CEP</Label>
                  <Input
                    id="zip"
                    type="text"
                    placeholder="00000-000"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information & Order Summary */}
          <Card className="p-6 shadow-lg h-fit">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <RadioGroup value={formData.paymentMethod} onValueChange={handlePaymentMethodChange} className="grid gap-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="pix" id="pix" className="h-6 w-6" aria-label="Pagar com PIX" />
                  <Label htmlFor="pix" className="text-lg">PIX</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="card" id="card" className="h-6 w-6" aria-label="Pagar com Cartão de Crédito" />
                  <Label htmlFor="card" className="text-lg">Cartão de Crédito</Label>
                </div>
                {!simplifiedMode && (
                  <div className="flex items-center space-x-3 hide-on-simplified">
                    <RadioGroupItem value="assisted" id="assisted" className="h-6 w-6" aria-label="Pagamento Assistido" />
                    <Label htmlFor="assisted" className="text-lg">Pagamento Assistido</Label>
                  </div>
                )}
              </RadioGroup>

              {formData.paymentMethod === 'card' && (
                <div className="grid gap-4 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber" className="text-lg">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardExpiry" className="text-lg">Validade</Label>
                      <Input
                        id="cardExpiry"
                        type="text"
                        placeholder="MM/AA"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                        className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                        aria-required="true"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardCvc" className="text-lg">CVC</Label>
                      <Input
                        id="cardCvc"
                        type="text"
                        placeholder="XXX"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        required
                        className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Seu pagamento é seguro com 3DS adaptado.
                  </p>
                </div>
              )}

              <Separator className="my-4" />

              {/* Order Summary */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-2">Seu Pedido</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-base">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
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
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mt-6">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-xl rounded-lg min-h-[44px] min-w-[44px] font-semibold flex items-center gap-2 transition-colors duration-200"
                aria-label="Confirmar e finalizar pedido"
              >
                <CheckCircle className="h-6 w-6" aria-hidden="true" />
                Confirmar Pedido
              </Button>
              {hasSpeechRecognition && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleVoiceConfirmationToggle}
                  className={`w-full px-8 py-4 text-xl rounded-lg min-h-[44px] min-w-[44px] font-semibold flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary/10 transition-colors duration-200 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                  aria-label={isListening ? "Parar confirmação por voz" : "Confirmar pedido por voz"}
                  aria-pressed={isListening}
                >
                  <Mic className="h-6 w-6" aria-hidden="true" />
                  {isListening ? 'Ouvindo...' : 'Confirmar por Voz'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;