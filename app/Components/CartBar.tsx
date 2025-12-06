"use client";

import { useCartStore } from "../store/cartStore";
import { Badge } from "@/components/ui/badge";

const CartBar = () => {
  const totalItems = useCartStore((state) => state.getTotalCount());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div
        className="
        w-[90%] max-w-md 
        bg-pink-400 text-white 
        px-6 py-3 
        rounded-xl 
        flex justify-between items-center 
        shadow-lg
      "
      >
        <span className="font-bold text-lg">{`${totalPrice.toFixed(
          2
        )} $`}</span>
        <span className="text-sm opacity-80 flex items-center gap-1">
          <span className="text-sm font-semibold">تکمیل خرید</span>
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
            <span dir="ltr">{totalItems}</span>
          </Badge>
        </span>
      </div>
    </div>
  );
};

export default CartBar;
