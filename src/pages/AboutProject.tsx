"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Code, Layout, Shield, Database, Accessibility } from 'lucide-react'; // Mudado Cloud para Database

const AboutProject = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Sobre o Projeto: E-commerce Acessível">
          Sobre o Projeto: E-commerce Acessível
        </h1>

        <section className="my-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground" aria-label="Nosso Objetivo">
            Nosso Objetivo
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Criar um e-commerce verdadeiramente inclusivo, projetado para atender às necessidades de idosos e pessoas com diversas deficiências, garantindo uma experiência de compra simples, funcional e acessível a todos.
          </p>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground" aria-label="Arquitetura e Tecnologias">
            Arquitetura e Tecnologias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Code className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <CardTitle className="text-xl font-semibold mb-2">Front-end</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-foreground">React, Vite, TypeScript</p>
                <p className="text-sm text-muted-foreground">Shadcn/ui, Tailwind CSS</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Layout className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <CardTitle className="text-xl font-semibold mb-2">Back-end</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-foreground">Node.js (API Modular)</p>
                <p className="text-sm text-muted-foreground">PostgreSQL (Banco de Dados)</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Shield className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <CardTitle className="text-xl font-semibold mb-2">Autenticação</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-foreground">JWT + MFA (SMS)</p>
                <p className="text-sm text-muted-foreground">Segurança LGPD + OWASP Top10</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Accessibility className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <CardTitle className="text-xl font-semibold mb-2">Acessibilidade</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-foreground">WCAG 2.1 AA, ARIA, HTML Semântico</p>
                <p className="text-sm text-muted-foreground">Testes automatizados de acessibilidade</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Database className="h-12 w-12 text-primary mb-4" aria-hidden="true" /> {/* Ícone de banco de dados */}
              <CardTitle className="text-xl font-semibold mb-2">Banco de Dados Local (Temporário)</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-foreground">Dados armazenados localmente</p>
                <p className="text-sm text-muted-foreground">Para fins de desenvolvimento e demonstração</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground" aria-label="Nossa Equipe Ideal">
            Nossa Equipe Ideal
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Para garantir a excelência e a abrangência deste projeto, uma equipe multidisciplinar é essencial.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">Product Owner (PO)</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Define a visão e prioriza o backlog.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">UX/UI Designer (Acessibilidade)</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Foca na experiência do usuário e design inclusivo.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">2 Desenvolvedores Front-end</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Constroem a interface do usuário acessível.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">1 Desenvolvedor Back-end</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Desenvolve a API e gerencia o banco de dados.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">QA (Quality Assurance)</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Garante a qualidade e testa funcionalidades.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">DevOps</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Gerencia a infraestrutura e CI/CD.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">Especialista em Acessibilidade</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Audita e orienta sobre as melhores práticas de acessibilidade.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="h-10 w-10 text-secondary-foreground mb-3" aria-hidden="true" />
              <CardTitle className="text-lg font-semibold">Suporte</CardTitle>
              <CardContent className="p-0">
                <p className="text-base text-muted-foreground">Oferece assistência contínua aos usuários.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground" aria-label="Cronograma Resumido">
            Cronograma Resumido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardTitle className="text-xl font-semibold mb-2">Semanas 1-2</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground">Requisitos e Protótipos</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardTitle className="text-xl font-semibold mb-2">Semanas 3-4</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground">Arquitetura e Design Final</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardTitle className="text-xl font-semibold mb-2">Semanas 5-8</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground">Desenvolvimento do Core</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardTitle className="text-xl font-semibold mb-2">Semana 9</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground">Pagamentos e Testes</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardTitle className="text-xl font-semibold mb-2">Semana 10</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground">Usabilidade Real</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardTitle className="text-xl font-semibold mb-2">Semana 11</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground">Implantação</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardTitle className="text-xl font-semibold mb-2">Semana 12</CardTitle>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground">Ajustes Pós-Go-Live</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutProject;