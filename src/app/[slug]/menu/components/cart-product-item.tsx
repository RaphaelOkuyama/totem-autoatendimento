"use client";

import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);

  return (
    <div className="relative flex items-center justify-between mb-5 last:mb-0">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill 
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <p className="max-w-[140px] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>

          {/* QUANTIDADE */}
          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7 rounded-lg"
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              className="h-7 w-7 rounded-lg"
              variant="destructive"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTÃO DE DELETAR FIXADO NA DIREITA */}
      <Button
        className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg border-gray-200 text-gray-400"
        variant="outline"
        size="icon"
        onClick={() => removeProduct(product.id)}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartProductItem;