"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Users, Package, DollarSign, Settings, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from '@/lib/localData';
import { useAuth } from '@/contexts/AuthContext'; // Importa o hook de autenticação

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate(); // Hook para navegação
  const { user } = useAuth(); // Obtém o usuário do contexto de autenticação

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    alt: '',
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Verifica se o usuário é admin
  const isAdmin = user.isLoggedIn && user.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      // Redireciona se não for admin
      navigate('/');
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar o painel administrativo.",
        variant: "destructive",
      });
    } else {
      loadProducts();
    }
  }, [isAdmin, navigate, toast]); // Dependências para o useEffect

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message || "Ocorreu um erro desconhecido.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (editingProduct) {
      setEditingProduct(prev => ({ ...prev!, [id]: id === 'price' ? parseFloat(value) : value }));
    } else {
      setNewProduct(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedProduct = await addProduct({
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
        alt: newProduct.alt,
      });
      if (addedProduct) {
        toast({
          title: "Produto adicionado com sucesso!",
          description: `${newProduct.name} foi adicionado ao catálogo.`,
          variant: "success",
        });
        setNewProduct({ name: '', description: '', price: '', image: '', alt: '' });
        loadProducts();
      } else {
        throw new Error("Falha ao adicionar produto.");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar produto",
        description: error.message || "Ocorreu um erro desconhecido.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const updated = await updateProduct(editingProduct);
      if (updated) {
        toast({
          title: "Produto atualizado com sucesso!",
          description: `${editingProduct.name} foi atualizado.`,
          variant: "success",
        });
        setEditingProduct(null);
        loadProducts();
      } else {
        throw new Error("Falha ao atualizar produto.");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar produto",
        description: error.message || "Ocorreu um erro desconhecido.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${name}"?`)) return;

    try {
      const deleted = await deleteProduct(id);
      if (deleted) {
        toast({
          title: "Produto excluído!",
          description: `${name} foi removido do catálogo.`,
          variant: "success",
        });
        loadProducts();
      } else {
        throw new Error("Falha ao excluir produto.");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao excluir produto",
        description: error.message || "Ocorreu um erro desconhecido.",
        variant: "destructive",
      });
    }
  };

  // Se não for admin, o useEffect já redirecionou. Este return é um fallback.
  if (!isAdmin) {
    return null; // Ou um spinner, ou uma mensagem de carregamento
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground" aria-label="Dashboard Administrativo">
          Dashboard Administrativo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <Users className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
            <CardTitle className="text-xl font-semibold mb-2">Usuários</CardTitle>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground">1,234</p>
              <p className="text-muted-foreground">Total de Clientes</p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <Package className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
            <CardTitle className="text-xl font-semibold mb-2">Produtos</CardTitle>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground">{products.length}</p>
              <p className="text-muted-foreground">Itens em Estoque</p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <DollarSign className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
            <CardTitle className="text-xl font-semibold mb-2">Vendas</CardTitle>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground">R$ 15.678,90</p>
              <p className="text-muted-foreground">Vendas do Mês</p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <Settings className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
            <CardTitle className="text-xl font-semibold mb-2">Configurações</CardTitle>
            <CardContent className="p-0">
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-muted-foreground">Ajustes Pendentes</p>
            </CardContent>
          </Card>
        </div>

        <section className="my-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground" aria-label="Gerenciamento de Produtos">
            Gerenciamento de Produtos
          </h2>
          <Card className="p-6 shadow-lg max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">
                {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-lg">Nome do Produto</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome do produto"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={handleInputChange}
                    required
                    className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-lg">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrição detalhada do produto"
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="text-lg p-3 min-h-[120px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price" className="text-lg">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={editingProduct ? editingProduct.price : newProduct.price}
                      onChange={handleInputChange}
                      required
                      className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image" className="text-lg">URL da Imagem</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="/placeholder.svg"
                      value={editingProduct ? editingProduct.image : newProduct.image}
                      onChange={handleInputChange}
                      required
                      className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="alt" className="text-lg">Texto Alternativo da Imagem</Label>
                  <Input
                    id="alt"
                    type="text"
                    placeholder="Descrição da imagem para acessibilidade"
                    value={editingProduct ? editingProduct.alt : newProduct.alt}
                    onChange={handleInputChange}
                    required
                    className="text-lg p-3 min-h-[44px] transition-all duration-200 ease-in-out"
                    aria-required="true"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-xl rounded-lg min-h-[44px] min-w-[44px] flex items-center gap-2 transition-colors duration-200"
                  aria-label={editingProduct ? "Atualizar produto" : "Adicionar novo produto"}
                >
                  {editingProduct ? <Edit className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
                  {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
                </Button>
                {editingProduct && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingProduct(null)}
                    className="w-full px-8 py-4 text-xl rounded-lg min-h-[44px] min-w-[44px] flex items-center gap-2 mt-2 transition-colors duration-200"
                    aria-label="Cancelar edição de produto"
                  >
                    Cancelar Edição
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-center text-foreground">Produtos Existentes</h3>
            <div className="grid gap-4">
              {products.length === 0 ? (
                <p className="text-center text-muted-foreground">Nenhum produto cadastrado.</p>
              ) : (
                products.map((product) => (
                  <Card key={product.id} className="flex items-center justify-between p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.alt} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <p className="font-semibold text-lg">{product.name}</p>
                        <p className="text-muted-foreground">R$ {product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setEditingProduct(product)}
                        aria-label={`Editar produto ${product.name}`}
                        className="transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        aria-label={`Excluir produto ${product.name}`}
                        className="transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;