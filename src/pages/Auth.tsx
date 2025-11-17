"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Globe, LayoutDashboard, User as UserIcon } from 'lucide-react'; // Removidos Mail, Lock, Phone
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useSpeech } from '@/hooks/use-speech'; // Importa o hook de fala

const Auth = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const { isListening, startListening, stopListening, transcript, clearTranscript, hasSpeechRecognition } = useSpeech();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');

  // Example credentials for demonstration
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASS = 'adminpass';
  const USER_EMAIL = 'user@example.com';
  const USER_PASS = 'userpass';

  useEffect(() => {
    if (transcript) {
      // Este é um placeholder para a lógica real de login por voz.
      // Em uma aplicação real, você analisaria o transcript para nome de usuário/senha
      // e então tentaria fazer o login.
      toast.info(`Comando de voz recebido: "${transcript}". Login por voz não implementado.`, { duration: 3000 });
      clearTranscript();
      stopListening();
    }
  }, [transcript, clearTranscript, stopListening, toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASS) {
      login(loginEmail, 'admin', 'Admin User');
      toast({
        title: "Login de Administrador",
        description: "Você foi logado como administrador.",
        duration: 3000,
        variant: "success",
      });
    } else if (loginEmail === USER_EMAIL && loginPassword === USER_PASS) {
      login(loginEmail, 'user', 'Regular User');
      toast({
        title: "Login de Usuário",
        description: "Você foi logado como usuário comum.",
        duration: 3000,
        variant: "success",
      });
    } else {
      toast({
        title: "Erro de Login",
        description: "Email ou senha inválidos.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', { registerName, registerEmail, registerPassword });
    toast({
      title: "Cadastro",
      description: "Tentativa de cadastro. (Funcionalidade de backend não implementada)",
      duration: 3000,
    });
    // Placeholder for actual registration logic
  };

  const handleSendSmsCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending SMS code to:', smsPhone);
    toast({
      title: "Código SMS Enviado",
      description: `Um código foi enviado para ${smsPhone}.`,
      duration: 3000,
    });
    // Placeholder for actual SMS sending logic
  };

  const handleSmsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SMS Login attempt:', { smsPhone, smsCode });
    toast({
      title: "Login por SMS",
      description: "Tentativa de login por SMS. (Funcionalidade de backend não implementada)",
      duration: 3000,
    });
    // Placeholder for actual SMS login logic
  };

  const handleSsoLogin = (provider: string) => {
    console.log(`Login com ${provider} via SSO.`);
    toast({
      title: `Login com ${provider}`,
      description: `Redirecionando para login com ${provider}. (Funcionalidade de SSO não implementada)`,
      duration: 3000,
    });
    // Placeholder for actual SSO logic
  };

  const handleVoiceLoginToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      toast.info("Diga seu nome de usuário e senha para fazer login. (Funcionalidade de voz não implementada)", { duration: 3000 });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">Acessar sua Conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Escolha como deseja fazer login ou crie uma nova conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger value="login" className="text-lg py-3 transition-colors duration-200" aria-label="Aba de Login">Login</TabsTrigger>
                <TabsTrigger value="register" className="text-lg py-3 transition-colors duration-200" aria-label="Aba de Cadastro">Cadastro</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="mt-6">
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold mb-2">Acesso Rápido (Demonstração):</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      onClick={() => login(ADMIN_EMAIL, 'admin', 'Admin User')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] flex items-center gap-2 transition-colors duration-200"
                      aria-label="Fazer login como administrador"
                    >
                      <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                      Login como Admin
                    </Button>
                    <Button
                      onClick={() => login(USER_EMAIL, 'user', 'Regular User')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] flex items-center gap-2 transition-colors duration-200"
                      aria-label="Fazer login como usuário comum"
                    >
                      <UserIcon className="h-5 w-5" aria-hidden="true" />
                      Login como Usuário
                    </Button>
                  </div>
                </div>
                <form onSubmit={handleLogin} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="loginEmail" className="text-lg">Email</Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="p-3 text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loginPassword" className="text-lg">Senha</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder="Sua senha"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="p-3 text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Entrar na sua conta">
                    Entrar
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Ou</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <Button variant="outline" onClick={() => handleSsoLogin('Google')} className="w-full px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] flex items-center gap-2 transition-colors duration-200" aria-label="Entrar com Google">
                    <Globe className="h-5 w-5" aria-hidden="true" />
                    Entrar com Google
                  </Button>
                  {hasSpeechRecognition && (
                    <Button
                      variant="outline"
                      onClick={handleVoiceLoginToggle}
                      className={`w-full px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] flex items-center gap-2 transition-colors duration-200 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                      aria-label={isListening ? "Parar entrada por voz" : "Entrar por voz"}
                      aria-pressed={isListening}
                    >
                      <Mic className="h-5 w-5" aria-hidden="true" />
                      {isListening ? 'Ouvindo...' : 'Entrar por Voz'}
                    </Button>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4 text-center">Login Simplificado (SMS)</h3>
                  <form onSubmit={handleSendSmsCode} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="smsPhone" className="text-lg">Número de Telefone</Label>
                      <Input
                        id="smsPhone"
                        type="tel"
                        placeholder="(XX) XXXXX-XXXX"
                        value={smsPhone}
                        onChange={(e) => setSmsPhone(e.target.value)}
                        required
                        className="p-3 text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                        aria-required="true"
                      />
                    </div>
                    <Button type="submit" variant="secondary" className="w-full px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Enviar código de verificação por SMS">
                      Enviar Código SMS
                    </Button>
                  </form>
                  {smsPhone && (
                    <form onSubmit={handleSmsLogin} className="grid gap-4 mt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="smsCode" className="text-lg">Código de Verificação</Label>
                        <Input
                          id="smsCode"
                          type="text"
                          placeholder="XXXXXX"
                          value={smsCode}
                          onChange={(e) => setSmsCode(e.target.value)}
                          required
                          className="p-3 text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                          aria-required="true"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Confirmar login com código SMS">
                        Confirmar Login SMS
                      </Button>
                    </form>
                  )}
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="mt-6">
                <form onSubmit={handleRegister} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="registerName" className="text-lg">Nome Completo</Label>
                    <Input
                      id="registerName"
                      type="text"
                      placeholder="Seu nome"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      className="p-3 text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="registerEmail" className="text-lg">Email</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      className="p-3 text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="registerPassword" className="text-lg">Senha</Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="Crie uma senha segura"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      className="p-3 text-lg min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-lg rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200" aria-label="Criar nova conta">
                    Cadastrar
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;