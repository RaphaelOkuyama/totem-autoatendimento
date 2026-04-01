"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);
  
  const { products, total, toggleCart, totalQuantity } =
    useContext(CartContext);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-1 flex-col overflow-hidden rounded-t-3xl bg-white">
      
      {/* 1. CABEÇALHO DO CARD (Fixo: Não rola) */}
      <div className="flex-none p-5 pb-0">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      {/* 2. BOTÕES DE CATEGORIAS (Fixo verticalmente, scroll apenas lateral) */}
      <div className="flex-none mt-2">
        <ScrollArea className="w-full">
          <div className="flex w-max space-x-4 p-4 pt-2">
            {restaurant.menuCategories.map((category) => (
              <Button
                onClick={() => handleCategoryClick(category)}
                key={category.id}
                variant={getCategoryButtonVariant(category)}
                size="sm"
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      </div>

      {/* 3. ÁREA DOS PRODUTOS (Scroll Vertical travado apenas aqui) */}
      <div className="flex-1 overflow-hidden mt-2">
        <ScrollArea className="h-full w-full overscroll-contain">
          <div className={`px-1 ${products.length > 0 ? "pb-32" : "pb-6"}`}>
            <Products products={selectedCategory.products} />
          </div>
        </ScrollArea>
      </div>

      {/* 4. RODAPÉ DA SACOLA (Fixo embaixo de tudo) */}
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] flex w-full items-center justify-between border-t bg-white px-5 py-4 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
          <div>
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total)}
              <span className="text-xs font-normal text-muted-foreground">
                {" "}/ {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>
          <Button onClick={toggleCart} className="rounded-full px-6">
            Ver sacola
          </Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;