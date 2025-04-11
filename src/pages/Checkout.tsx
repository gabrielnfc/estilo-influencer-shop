
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import CartItem from "@/components/checkout/CartItem";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
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
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Finalizar Pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Itens do Pedido</h2>
              
              {cartItems.length > 0 ? (
                <div className="divide-y divide-gray-200">
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
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Seus Dados</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                  />
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
              </div>
            </form>
          </div>

          <div>
            <OrderSummary className="sticky top-24" />
            
            <div className="mt-6 hidden lg:block">
              <Button 
                onClick={handleSubmit}
                className="w-full bg-brand-magenta hover:bg-brand-magenta/90 py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Confirmar Pedido"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
