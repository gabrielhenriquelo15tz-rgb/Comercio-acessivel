import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Importa a página Home
import NotFound from "./pages/NotFound";
import { AccessibilityProvider } from "./contexts/AccessibilityContext"; // Importa o provedor de acessibilidade
import { AuthProvider } from "./contexts/AuthContext"; // Importa o provedor de autenticação
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import AccessibilitySettings from "./pages/AccessibilitySettings";
import HelpSupport from "./pages/HelpSupport";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AboutProject from "./pages/AboutProject";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AccessibilityProvider>
        <BrowserRouter>
          <AuthProvider> {/* Envolve as rotas com o provedor de autenticação */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/accessibility" element={<AccessibilitySettings />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about" element={<AboutProject />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </AccessibilityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;