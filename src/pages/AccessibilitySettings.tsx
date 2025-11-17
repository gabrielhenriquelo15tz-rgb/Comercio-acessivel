"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Link } from 'react-router-dom';

const AccessibilitySettings = () => {
  const { highContrast, fontSize, simplifiedMode, toggleHighContrast, setFontSize, toggleSimplifiedMode } = useAccessibility();

  const handleResetSettings = () => {
    setFontSize(16);
    if (highContrast) toggleHighContrast();
    if (simplifiedMode) toggleSimplifiedMode();
    alert('Configurações de acessibilidade resetadas para o padrão.');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Configurações de Acessibilidade">
          Configurações de Acessibilidade
        </h1>

        <Card className="w-full max-w-2xl mx-auto p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">Ajuste a Experiência do Site</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast-page" className="text-xl font-medium">Modo de Alto Contraste</Label>
              <Switch
                id="high-contrast-page"
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
                aria-label="Ativar ou desativar modo de alto contraste para melhor visibilidade"
                className="h-8 w-14"
              />
            </div>
            <p className="text-muted-foreground -mt-4">
              Aumenta o contraste entre textos e fundos para facilitar a leitura, especialmente para pessoas com baixa visão.
            </p>

            <Separator />

            {/* Aumento de Fonte */}
            <div className="grid gap-4">
              <Label htmlFor="font-size-page" className="text-xl font-medium">Tamanho da Fonte</Label>
              <Slider
                id="font-size-page"
                min={16}
                max={32}
                step={4}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="w-full"
                aria-label={`Ajustar tamanho da fonte, atualmente ${fontSize} pixels`}
                aria-valuetext={`${fontSize} pixels`}
              />
              <div className="flex justify-between text-base text-muted-foreground">
                <span>16px (Padrão)</span>
                <span>20px</span>
                <span>24px</span>
                <span>32px (Extra Grande)</span>
              </div>
            </div>
            <p className="text-muted-foreground -mt-4">
              Ajuste o tamanho do texto em todo o site para uma leitura mais confortável.
            </p>

            <Separator />

            {/* Modo Simplificado */}
            <div className="flex items-center justify-between">
              <Label htmlFor="simplified-mode-page" className="text-xl font-medium">Modo Simplificado</Label>
              <Switch
                id="simplified-mode-page"
                checked={simplifiedMode}
                onCheckedChange={toggleSimplifiedMode}
                aria-label="Ativar ou desativar modo simplificado para uma experiência de usuário mais direta"
                className="h-8 w-14"
              />
            </div>
            <p className="text-muted-foreground -mt-4">
              Reduz a complexidade visual e o número de elementos na tela, ideal para pessoas com deficiência cognitiva ou que preferem uma interface mais limpa.
            </p>

            <Separator />

            {/* Outras Opções (Placeholder) */}
            <div className="grid gap-4">
              <h3 className="text-xl font-medium">Outras Opções (Em Desenvolvimento)</h3>
              <p className="text-muted-foreground">
                Estamos trabalhando para trazer mais opções de acessibilidade, como:
              </p>
              <ul className="list-disc pl-5 text-lg text-foreground space-y-1">
                <li>Leitura por voz aprimorada</li>
                <li>Navegação por gestos</li>
                <li>Personalização de cores</li>
              </ul>
            </div>

            <Separator />

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={handleResetSettings}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200"
              aria-label="Redefinir todas as configurações de acessibilidade para o padrão"
            >
              Redefinir Configurações
            </Button>
            <Link to="/help" className="block text-center text-blue-600 hover:underline mt-4 transition-colors duration-200" aria-label="Ir para a página de ajuda para mais informações sobre acessibilidade">
              Precisa de mais ajuda? Visite nossa página de Suporte.
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AccessibilitySettings;