"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const HelpSupport = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Página de Ajuda e Suporte">
          Ajuda e Suporte
        </h1>

        <section className="my-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground" aria-label="Perguntas Frequentes">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg p-4 text-left hover:no-underline focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-lg transition-colors duration-200" aria-expanded="false" aria-controls="accordion-content-1">
                  Como faço para ativar o modo de alto contraste?
                </AccordionTrigger>
                <AccordionContent className="p-4 text-lg text-muted-foreground">
                  Você pode ativar o modo de alto contraste clicando no ícone de acessibilidade (um boneco) no cabeçalho do site e alternando a opção "Alto Contraste". Alternativamente, visite a página de <Link to="/accessibility" className="text-blue-600 hover:underline transition-colors duration-200">Configurações de Acessibilidade</Link> para mais opções.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg p-4 text-left hover:no-underline focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200" aria-expanded="false" aria-controls="accordion-content-2">
                  Posso aumentar o tamanho da fonte?
                </AccordionTrigger>
                <AccordionContent className="p-4 text-lg text-muted-foreground">
                  Sim! No mesmo menu de acessibilidade no cabeçalho, você encontrará um controle deslizante para ajustar o tamanho da fonte. Você também pode fazer isso na página de <Link to="/accessibility" className="text-blue-600 hover:underline transition-colors duration-200">Configurações de Acessibilidade</Link>.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg p-4 text-left hover:no-underline focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200" aria-expanded="false" aria-controls="accordion-content-3">
                  Como funciona o login simplificado por SMS?
                </AccordionTrigger>
                <AccordionContent className="p-4 text-lg text-muted-foreground">
                  Na página de <Link to="/auth" className="text-blue-600 hover:underline transition-colors duration-200">Login / Cadastro</Link>, selecione a opção "Login Simplificado (SMS)". Digite seu número de telefone, e enviaremos um código de verificação. Insira o código para acessar sua conta sem precisar de senha.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg p-4 text-left hover:no-underline focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200" aria-expanded="false" aria-controls="accordion-content-4">
                  O site é compatível com leitores de tela?
                </AccordionTrigger>
                <AccordionContent className="p-4 text-lg text-muted-foreground">
                  Absolutamente! Nosso site foi desenvolvido seguindo as diretrizes WCAG 2.1 AA, utilizando HTML semântico e atributos ARIA para garantir total compatibilidade com leitores de tela como NVDA, JAWS e VoiceOver.
                </AccordionContent>
              </AccordionItem>
            </Card>
          </Accordion>
        </section>

        <section className="my-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground" aria-label="Precisa de Ajuda Adicional?">
            Precisa de Ajuda Adicional?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Nossa equipe de suporte está pronta para ajudar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow duration-200">
              <Phone className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <CardTitle className="text-xl font-semibold mb-2">Telefone</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-foreground mb-2">(XX) XXXX-XXXX</p>
                <p className="text-sm text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
              </CardContent>
            </Card>

            <Card className="p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow duration-200">
              <Mail className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <CardTitle className="text-xl font-semibold mb-2">Email</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-foreground mb-2">
                  <a href="mailto:suporte@ecommerceacessivel.com" className="text-blue-600 hover:underline transition-colors duration-200 break-all" aria-label="Enviar email para suporte@ecommerceacessivel.com">
                    suporte@ecommerceacessivel.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">Resposta em até 24h úteis</p>
              </CardContent>
            </Card>

            <Card className="p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow duration-200">
              <MessageCircle className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <CardTitle className="text-xl font-semibold mb-2">Chat Online</CardTitle>
              <CardContent className="p-0">
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200"
                  aria-label="Abrir chat de suporte online"
                  onClick={() => alert('Chat de suporte assistido em breve!')}
                >
                  Iniciar Chat
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Disponível 24/7</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpSupport;