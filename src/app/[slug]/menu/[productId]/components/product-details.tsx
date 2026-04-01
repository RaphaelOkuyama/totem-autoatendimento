"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../contexts/cart";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleAddToCart = () => {
    addProduct({ ...product, quantity });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-t-3xl border-t bg-white p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        
        <div className="flex-none pb-4">
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
          </div>
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">{formatCurrency(product.price)}</h3>
            <div className="flex items-center gap-3 text-center">
              <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                <ChevronLeftIcon size={16} />
              </Button>
              <p className="w-4 text-sm font-medium">{quantity}</p>
              <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* MEIO DO CARD (Scroll: Sobre e Ingredientes) */}
        <div className="flex-1 overflow-hidden mt-4">
          <ScrollArea className="h-full">
            <div className="space-y-6 pb-6 px-1">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Sobre</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  <ChefHatIcon size={18} />
                  <h4 className="font-semibold text-sm">Ingredientes</h4>
                </div>
                <ul className="list-disc px-5 text-sm text-muted-foreground space-y-1">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* RODAPÉ DO CARD (Fixo: Botão sempre visível) */}
        <div className="flex-none pt-4 bg-white">
          <Button className="w-full rounded-full py-7 font-bold text-base" onClick={handleAddToCart}>
            Adicionar à sacola
          </Button>
        </div>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;