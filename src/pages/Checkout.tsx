
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import CartItem from "@/components/checkout/CartItem";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, ArrowLeft, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CheckoutPage = () => {
  const { cartItems, totalItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Save order data to session storage for confirmation page
    sessionStorage.setItem("orderData", JSON.stringify({
      name,
      phone,
      items: cartItems,
      timestamp: new Date().toISOString()
    }));
    
    clearCart();
    navigate("/confirmation");
  };

  if (totalItems === 0) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto py-12">
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="mt-4 text-2xl font-medium text-gray-900">Seu carrinho está vazio</h2>
            <p className="mt-2 text-gray-500">
              Parece que você ainda não adicionou nenhum produto ao seu pedido.
            </p>
            <Button
              onClick={() => navigate("/store")}
              className="mt-6 bg-brand-magenta hover:bg-brand-magenta/90"
            >
              Continuar Comprando
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ShoppingBag className="text-brand-magenta" size={24} />
          Finalizar Pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-900">Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <CartItem 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        image={item.image}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Nenhum item no pedido.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <User size={18} className="text-brand-magenta" />
                  Seus Dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label 
                      htmlFor="name" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      Nome Completo
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        required
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="phone" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Phone size={16} className="text-brand-magenta" />
                      Telefone
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        required
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 lg:hidden">
                    <Button 
                      type="submit"
                      className="w-full bg-brand-magenta hover:bg-brand-magenta/90 py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processando..." : "Confirmar Pedido"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <OrderSummary className="sticky top-24" />
            
            <div className="mt-6 hidden lg:block">
              <Button 
                onClick={handleSubmit}
                className="w-full bg-brand-magenta hover:bg-brand-magenta/90 py-6 h-auto text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Confirmar Pedido"}
              </Button>
              
              {/* Social proof - only on desktop */}
              <div className="flex items-center justify-center text-gray-500 text-sm mt-4">
                <span className="flex items-center">
                  <span className="inline-flex -space-x-2 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className={`inline-block h-6 w-6 rounded-full ring-2 ring-white ${
                          i % 3 === 0 ? 'bg-brand-magenta/20' : 
                          i % 3 === 1 ? 'bg-brand-orange/20' : 'bg-purple-200'
                        }`}
                      >
                        <span className="sr-only">User {i}</span>
                      </div>
                    ))}
                  </span>
                  <span className="ml-3">+120 pedidos hoje</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
