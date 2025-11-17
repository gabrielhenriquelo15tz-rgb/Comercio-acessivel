"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom'; // Adicionado Link aqui

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast({
      title: "Mensagem Enviada!",
      description: "Agradecemos seu contato. Responderemos em breve.",
      duration: 5000,
      variant: "success",
    });
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Página de Contato">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Form */}
          <Card className="p-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">Envie-nos uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-lg">Seu Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome Completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-lg">Seu Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-12 text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject" className="text-lg">Assunto</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Assunto da mensagem"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-lg">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem aqui..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="text-lg p-3 min-h-[120px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-xl rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200"
                  aria-label="Enviar mensagem de contato"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">Nossas Informações</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 text-lg">
              <div className="flex items-center gap-4">
                <Mail className="h-8 w-8 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Email:</p>
                  <a href="mailto:contato@ecommerceacessivel.com" className="text-blue-600 hover:underline transition-colors duration-200" aria-label="Enviar email para contato@ecommerceacessivel.com">
                    contato@ecommerceacessivel.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-8 w-8 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Telefone:</p>
                  <a href="tel:+5511987654321" className="text-blue-600 hover:underline transition-colors duration-200" aria-label="Ligar para o telefone (11) 98765-4321">
                    (XX) XXXX-XXXX
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-primary mt-1" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Endereço:</p>
                  <p>Rua da Acessibilidade, 123</p>
                  <p>Bairro Inclusivo, Cidade Exemplo - SP</p>
                  <p>CEP: 00000-000</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-6">
              <Link to="/help" className="w-full">
                <Button variant="outline" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Ir para a página de ajuda e suporte">
                  Ver Perguntas Frequentes
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;