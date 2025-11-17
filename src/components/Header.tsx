"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Accessibility, Mic, ShoppingCart, User, LogOut, LayoutDashboard, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSpeech } from '@/hooks/use-speech'; // Importa o hook de fala

const Header = () => {
  const { highContrast, fontSize, simplifiedMode, toggleHighContrast, setFontSize, toggleSimplifiedMode } = useAccessibility();
  const { user, logout } = useAuth();
  const { isListening, startListening, stopListening, transcript, clearTranscript, speak, isSpeaking, stopSpeaking, hasSpeechRecognition, hasSpeechSynthesis } = useSpeech();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
      // Opcionalmente, você pode disparar a busca aqui
      // console.log("Termo de busca por voz:", transcript);
      clearTranscript(); // Limpa o transcript após usá-lo
    }
  }, [transcript, clearTranscript]);

  const handleVoiceSearchToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleReadPageTitle = () => {
    const pageTitle = document.querySelector('h1')?.textContent || document.title;
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(pageTitle);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
      <div className="flex items-center gap-4 w-full md:w-auto justify-between">
        <Link to="/" className="text-2xl font-bold transition-colors duration-200 hover:text-primary-foreground/80" aria-label="Página inicial do e-commerce">
          <img src="/placeholder.svg" alt="Logo do E-commerce Acessível" className="h-8 w-auto" />
        </Link>
        <div className="flex md:hidden gap-2">
          <Button variant="ghost" size="icon" aria-label="Abrir configurações de acessibilidade" className="transition-colors duration-200 hover:bg-primary-foreground/10">
            <Accessibility className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Ver carrinho de compras" className="transition-colors duration-200 hover:bg-primary-foreground/10">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          {user.isLoggedIn ? (
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Sair da sua conta" className="transition-colors duration-200 hover:bg-primary-foreground/10">
              <LogOut className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" asChild aria-label="Acessar sua conta" className="transition-colors duration-200 hover:bg-primary-foreground/10">
              <Link to="/auth"><User className="h-6 w-6" /></Link>
            </Button>
          )}
        </div>
      </div>

      {/* Accessibility: Search bar with voice support */}
      <div className="relative flex-grow max-w-xl w-full">
        <Input
          type="search"
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-12 py-2 rounded-md bg-background text-foreground border-border focus-visible:ring-ring transition-all duration-200 ease-in-out"
          aria-label="Barra de busca de produtos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
        {hasSpeechRecognition && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
            onClick={handleVoiceSearchToggle}
            aria-label={isListening ? "Parar busca por voz" : "Iniciar busca por voz"}
            aria-pressed={isListening}
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex items-center gap-4 mt-4 md:mt-0">
        <Link to="/products" className="text-primary-foreground hover:underline transition-colors duration-200" aria-label="Ver todos os produtos">Produtos</Link>
        <Link to="/cart" className="text-primary-foreground hover:underline flex items-center gap-1 transition-colors duration-200" aria-label="Ver carrinho de compras">
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          Carrinho
        </Link>

        {user.isLoggedIn ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-primary-foreground hover:underline flex items-center gap-1 transition-colors duration-200" aria-label="Acessar painel administrativo">
                <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                Admin
              </Link>
            )}
            <Button variant="ghost" onClick={logout} className="text-primary-foreground hover:bg-primary-foreground hover:text-primary flex items-center gap-1 transition-colors duration-200" aria-label="Sair da sua conta">
              <LogOut className="h-5 w-5" aria-hidden="true" />
              Sair
            </Button>
          </>
        ) : (
          <Link to="/auth" className="text-primary-foreground hover:underline flex items-center gap-1 transition-colors duration-200" aria-label="Acessar sua conta">
            <User className="h-5 w-5" aria-hidden="true" />
            Login
          </Link>
        )}

        {/* Read Aloud Button for page title/main heading */}
        {hasSpeechSynthesis && (
          <Button
            variant="ghost"
            size="icon"
            className={`text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors duration-200 ${isSpeaking ? 'text-yellow-400 animate-pulse' : ''}`}
            onClick={handleReadPageTitle}
            aria-label={isSpeaking ? "Parar leitura da página" : "Ouvir título da página"}
            aria-pressed={isSpeaking}
          >
            {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
        )}

        {/* Accessibility Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors duration-200" aria-label="Abrir configurações de acessibilidade">
              <Accessibility className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xs bg-background text-foreground">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">Acessibilidade</SheetTitle>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              {/* Alto Contraste */}
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="text-lg">Alto Contraste</Label>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={toggleHighContrast}
                  aria-label="Ativar ou desativar modo de alto contraste"
                />
              </div>

              {/* Aumento de Fonte */}
              <div className="grid gap-2">
                <Label htmlFor="font-size" className="text-lg">Tamanho da Fonte</Label>
                <Slider
                  id="font-size"
                  min={16}
                  max={32}
                  step={4}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="w-full"
                  aria-label={`Ajustar tamanho da fonte, atualmente ${fontSize} pixels`}
                  aria-valuetext={`${fontSize} pixels`}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>16px</span>
                  <span>20px</span>
                  <span>24px</span>
                  <span>32px</span>
                </div>
              </div>

              {/* Modo Simplificado */}
              <div className="flex items-center justify-between">
                <Label htmlFor="simplified-mode" className="text-lg">Modo Simplificado</Label>
                <Switch
                  id="simplified-mode"
                  checked={simplifiedMode}
                  onCheckedChange={toggleSimplifiedMode}
                  aria-label="Ativar ou desativar modo simplificado"
                />
              </div>
            </div>
            <Link to="/accessibility" className="block text-center text-blue-600 hover:underline transition-colors duration-200 mt-4" aria-label="Ir para a página de configurações de acessibilidade">
              Mais opções de acessibilidade
            </Link>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;