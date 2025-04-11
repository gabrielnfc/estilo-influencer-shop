
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ShoppingBag, User, Phone, Share2 } from "lucide-react";
import { Product } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface OrderData {
  name: string;
  phone: string;
  items: (Product & { quantity: number })[];
  timestamp: string;
}

const ConfirmationPage = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const data = sessionStorage.getItem("orderData");
    if (!data) {
      navigate("/store");
      return;
    }
    
    setOrderData(JSON.parse(data));
  }, [navigate]);

  const handleShare = () => {
    toast({
      title: "Pedido compartilhado",
      description: "Link do pedido copiado para a área de transferência.",
    });
  };

  if (!orderData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <div className="w-20 h-20 rounded-full border-4 border-t-brand-magenta border-gray-200 border-solid animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Carregando pedido...</p>
        </div>
      </MainLayout>
    );
  }

  const formattedDate = new Date(orderData.timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const totalValue = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalValue);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-12">
        <Card className="overflow-hidden">
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-brand-magenta to-brand-orange h-4" />
          
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-brand-magenta/10 mb-4">
                <CheckCircle className="h-12 w-12 text-brand-magenta" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900">Pedido Confirmado!</h1>
              <p className="text-gray-500 mt-2">
                Obrigado por seu pedido, {orderData.name}.
              </p>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-brand-magenta" size={18} />
                  <h2 className="font-medium text-lg">Resumo do Pedido</h2>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {formattedDate}
                </div>
              </div>
              
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <div>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-200 flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span className="text-brand-magenta">{formattedTotal}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <User size={16} className="text-brand-magenta" />
                  Dados do Cliente:
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg mt-2">
                  <p className="text-gray-700">{orderData.name}</p>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Phone size={14} />
                    {orderData.phone}
                  </div>
                </div>
              </div>
              
              <div className="text-gray-500 text-sm bg-brand-magenta/5 p-3 rounded-lg border border-brand-magenta/10">
                <p className="text-center">
                  Em breve entraremos em contato para confirmar seu pedido.
                </p>
              </div>
              
              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate("/store")} 
                  className="w-full sm:flex-1 bg-brand-magenta hover:bg-brand-magenta/90"
                >
                  Voltar para a Loja
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full sm:w-auto border-brand-magenta text-brand-magenta hover:bg-brand-magenta/10"
                >
                  <Share2 size={16} className="mr-2" />
                  Compartilhar
                </Button>
              </div>
              
              {/* Social proof */}
              <div className="flex items-center justify-center text-gray-500 text-sm mt-3">
                <span className="flex items-center gap-2">
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
                  <span>+50 pessoas compraram hoje</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ConfirmationPage;
