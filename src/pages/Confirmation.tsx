
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { Product } from "@/contexts/CartContext";

interface OrderData {
  name: string;
  phone: string;
  items: (Product & { quantity: number })[];
  timestamp: string;
}

const ConfirmationPage = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("orderData");
    if (!data) {
      navigate("/store");
      return;
    }
    
    setOrderData(JSON.parse(data));
  }, [navigate]);

  if (!orderData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          Carregando...
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900">Pedido Confirmado!</h1>
            <p className="text-gray-500 mt-2">
              Obrigado por seu pedido, {orderData.name}.
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg">Resumo do Pedido</h2>
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
              <h3 className="font-medium">Dados do Cliente:</h3>
              <p className="text-gray-600 mt-1">{orderData.name}</p>
              <p className="text-gray-600">{orderData.phone}</p>
            </div>
            
            <div className="text-gray-500 text-sm">
              Em breve entraremos em contato para confirmar seu pedido.
            </div>
            
            <div className="pt-6">
              <Button 
                onClick={() => navigate("/store")} 
                className="w-full bg-brand-magenta hover:bg-brand-magenta/90"
              >
                Voltar para a Loja
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfirmationPage;
