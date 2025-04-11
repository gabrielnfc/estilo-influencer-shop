import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import CartItem from "@/components/checkout/CartItem";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, ArrowLeft, User, Phone, MapPin, AlertCircle, FileText, Home, Building, Map, Landmark, Flag, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

const CheckoutPage = () => {
  const { cartItems, totalItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [observations, setObservations] = useState("");
  const [showObservations, setShowObservations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zipCodeError, setZipCodeError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateZipCode = (value: string) => {
    const numericZipCode = value.replace(/\D/g, '');
    if (numericZipCode.length <= 5) {
      return numericZipCode;
    } else {
      return `${numericZipCode.slice(0, 5)}-${numericZipCode.slice(5, 8)}`;
    }
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedZipCode = validateZipCode(e.target.value);
    setZipCode(formattedZipCode);
    
    if (formattedZipCode.length > 0 && formattedZipCode.replace(/\D/g, '').length !== 8) {
      setZipCodeError("CEP inválido. Deve conter 8 dígitos.");
    } else {
      setZipCodeError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    if (zipCode && zipCodeError) {
      toast({
        title: "CEP inválido",
        description: "Por favor, informe um CEP válido para entrega.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    sessionStorage.setItem("orderData", JSON.stringify({
      name,
      phone,
      delivery: {
        zipCode: zipCode || "Não informado",
        street: street || "Não informado",
        number: number || "S/N",
        complement: complement || "Não informado",
        neighborhood: neighborhood || "Não informado",
        city: city || "Não informado",
        state: state || "Não informado",
        country: country || "Brasil"
      },
      observations: observations || "Nenhuma observação",
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

            <Card className="mb-6">
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
                </form>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <MapPin size={18} className="text-brand-magenta" />
                  Informações de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label 
                      htmlFor="zipCode" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <MapPin size={14} className="text-gray-500" />
                      CEP
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="zipCode"
                        value={zipCode}
                        onChange={handleZipCodeChange}
                        placeholder="00000-000"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                        maxLength={9}
                      />
                      {zipCodeError && (
                        <p className="text-red-500 text-xs mt-1">{zipCodeError}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="country" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Globe size={14} className="text-gray-500" />
                      País
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="País"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label 
                      htmlFor="street" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Home size={14} className="text-gray-500" />
                      Av/Rua
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="street"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        placeholder="Nome da rua ou avenida"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="number" 
                      className="font-medium text-gray-700"
                    >
                      Número
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="number"
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        placeholder="Número"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="complement" 
                      className="font-medium text-gray-700"
                    >
                      Complemento
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="complement"
                        value={complement}
                        onChange={e => setComplement(e.target.value)}
                        placeholder="Casa, Apto, Bloco"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="neighborhood" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Building size={14} className="text-gray-500" />
                      Bairro
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="neighborhood"
                        value={neighborhood}
                        onChange={e => setNeighborhood(e.target.value)}
                        placeholder="Bairro"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="city" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Landmark size={14} className="text-gray-500" />
                      Cidade
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Cidade"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor="state" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Flag size={14} className="text-gray-500" />
                      Estado
                    </Label>
                    <div className="relative mt-1 group">
                      <Input 
                        id="state"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="Estado"
                        className="pl-3 pr-3 py-2 h-11 rounded-lg border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Os itens selecionados estão sujeitos à confirmação de estoque e serão reservados em um momento posterior à conclusão da compra.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <FileText size={18} className="text-brand-magenta" />
                  Observações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Collapsible
                  open={showObservations}
                  onOpenChange={setShowObservations}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 flex items-center space-x-2">
                      <Checkbox 
                        id="hasObservations" 
                        checked={showObservations}
                        onCheckedChange={() => setShowObservations(!showObservations)}
                      />
                      <Label htmlFor="hasObservations" className="text-sm font-medium cursor-pointer">
                        Deseja adicionar observações ao seu pedido?
                      </Label>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        {showObservations ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <Label 
                      htmlFor="observations" 
                      className="font-medium text-gray-700"
                    >
                      Informações adicionais para seu pedido
                    </Label>
                    <Textarea 
                      id="observations"
                      value={observations}
                      onChange={e => setObservations(e.target.value)}
                      placeholder="Informações adicionais para entrega ou sobre os produtos"
                      className="min-h-[80px] border-gray-200 focus-visible:ring-brand-magenta transition-all resize-none"
                    />
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <OrderSummary />
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-brand-magenta hover:bg-brand-magenta/90 py-6 h-auto text-base font-medium"
                disabled={isSubmitting}
                form="checkoutForm"
              >
                {isSubmitting ? "Processando..." : "Confirmar Pedido"}
              </Button>
              
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
