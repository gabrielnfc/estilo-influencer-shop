
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { History, Package, Calendar, FileText, Search } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Sample purchase history data
const purchaseHistory = [
  {
    id: "ORD-2023-001",
    date: "2023-04-10",
    totalItems: 3,
    totalValue: 259.9,
    status: "delivered"
  },
  {
    id: "ORD-2023-002",
    date: "2023-03-22",
    totalItems: 1,
    totalValue: 89.9,
    status: "delivered"
  },
  {
    id: "ORD-2023-003",
    date: "2023-02-15",
    totalItems: 2,
    totalValue: 129.8,
    status: "delivered"
  },
  {
    id: "ORD-2024-001",
    date: "2024-01-05",
    totalItems: 4,
    totalValue: 321.6,
    status: "delivered"
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-18",
    totalItems: 2,
    totalValue: 157.8,
    status: "processing"
  },
];

const PurchaseHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOrders = purchaseHistory.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <History className="text-brand-magenta" />
                Histórico de Compras
              </h1>
              <p className="text-gray-500 mt-1">Acompanhe todos os seus pedidos</p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por ID"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Orders Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seus Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID do Pedido</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="hidden md:table-cell">Itens</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell className="hidden md:table-cell">{order.totalItems}</TableCell>
                        <TableCell>{formatCurrency(order.totalValue)}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              order.status === "delivered" 
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            }`}
                          >
                            {order.status === "delivered" ? "Entregue" : "Em processamento"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-xs"
                          >
                            <FileText size={14} />
                            Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <Package className="mx-auto h-10 w-10 text-gray-300" />
                  <p className="mt-2 text-gray-500">Nenhum pedido encontrado</p>
                </div>
              )}
              
              {filteredOrders.length > 0 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Info Card */}
          <Card className="bg-brand-magenta/5 border-brand-magenta/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-brand-magenta shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Seus pedidos ficam disponíveis para visualização por até 12 meses após a data da compra. 
                  Para mais informações, entre em contato com nosso suporte.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PurchaseHistory;
