import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    // Container principal trava a tela
    <div className="flex h-[100dvh] flex-col overflow-hidden">
      
      {/* Header renderiza a imagem normalmente */}
      <RestaurantHeader restaurant={restaurant} />
      
      {/* Categories tem a margem negativa e o flex-1 internamente, 
          então vai sobrepor a imagem sem ser cortado */}
      <RestaurantCategories restaurant={restaurant} />
      
    </div>
  );
};

export default RestaurantMenuPage;