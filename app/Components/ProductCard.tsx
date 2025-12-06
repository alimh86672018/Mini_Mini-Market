"use client";

import { useCartStore } from "../store/cartStore";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const ProductCard = ({ product }: any) => {
  const { title, description, price, discountPercentage, images, thumbnail } =
    product;

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartStore((state) => state.items);

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const descriptionLimit = (text: string) =>
    text.length > 60 ? text.slice(0, 60) + "..." : text;

  const priceWithDiscount = price - (price * discountPercentage) / 100;

  const hasMultipleImages = images?.length > 1;

  return (
    <Card className="overflow-hidden relative py-5">
      {/* Discount Badge */}
      <div className="absolute top-2 right-2 z-20">
        <Badge className="h-12 min-w-5 rounded-md px-1 text-white bg-red-500 flex flex-col items-center justify-center leading-tight">
          <span className="text-sm font-bold">{discountPercentage}%</span>
          <span className="text-sm fa">تخفیف</span>
        </Badge>
      </div>

      {/* ========= CASE 1: MULTIPLE IMAGES (FULL IMAGE CARD) ========= */}
      {hasMultipleImages ? (
        <>
          <div className="relative h-56 w-full">
            <Image src={images[0]} alt={title} fill className="object-cover" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            <div className="absolute bottom-2 left-2 right-2 text-white">
              <CardTitle className="text-lg drop-shadow">{title}</CardTitle>
              <CardDescription className="text-sm drop-shadow line-clamp-2 text-white">
                {descriptionLimit(description)}
              </CardDescription>
            </div>
          </div>

          <CardFooter className="flex justify-between items-center py-3 px-4">
            <div className=" relative flex items-center gap-2">
              <div
                aria-hidden="true"
                className={`absolute inset-0 rounded-md bg-pink-400
                                    transition-all duration-500
                                    ${
                                      quantity > 0
                                        ? "opacity-100 scale-x-100"
                                        : "opacity-50 scale-x-0 origin-right"
                                    }
                                  `}
              />

              <div className="relative z-10 flex items-center gap-2 px-2 py-1">
                <div
                  className={`relative z-10 flex items-center gap-2 transition-all duration-300
                                  ${
                                    quantity > 0
                                      ? "opacity-100 translate-y-0 delay-100"
                                      : "opacity-0 translate-y-1 delay-0"
                                  }
                                `}
                >
                  {quantity > 0 && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => removeItem(product.id)}
                        className="bg-pink-400 text-white hover:bg-pink-400 w-7 h-7"
                      >
                        <Minus size={14} />
                      </Button>

                      <span className="font-semibold text-white">
                        {quantity}
                      </span>
                    </>
                  )}
                </div>

                <Button
                  size="sm"
                  className={`w-8 h-8 ${
                    quantity > 0
                      ? "bg-gray-700 text-white hover:bg-gray-700"
                      : "bg-pink-400 text-white"
                  }`}
                  onClick={() => addItem(product)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm line-through opacity-60">{price}$</p>
              <p className="font-bold">{priceWithDiscount.toFixed(2)}$</p>
            </div>
          </CardFooter>
        </>
      ) : (
        /* ======== CASE 2: ONLY ONE IMAGE ========= */
        <>
          <CardContent className="relative p-4 flex gap-4">
            <div className="relative">
              <Image
                src={thumbnail}
                alt={title}
                width={120}
                height={120}
                className="rounded-md object-cover"
              />

              <div className="absolute bottom-0 right-0">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    // className={`absolute inset-0 rounded-md bg-pink-400 transition-all duration-500 ${
                    //   quantity > 0
                    //     ? "opacity-100 scale-x-100"
                    //     : "opacity-0 scale-x-0 origin-right"
                    // }`}
                    className={`absolute inset-0 rounded-md bg-pink-400
                                    transition-all duration-500
                                    ${
                                      quantity > 0
                                        ? "opacity-100 scale-x-100"
                                        : "opacity-50 scale-x-0 origin-right"
                                    }
                                  `}
                  />

                  <div className="relative z-10 flex items-center gap-2 px-2 py-1">
                    <div
                      className={`relative z-10 flex items-center gap-2 transition-all duration-300
                                  ${
                                    quantity > 0
                                      ? "opacity-100 translate-y-0 delay-100"
                                      : "opacity-0 translate-y-1 delay-0"
                                  }
                                `}
                    >
                      {quantity > 0 && (
                        <Button
                          size="sm"
                          onClick={() => removeItem(product.id)}
                          className="w-7 h-7 rounded-lg bg-pink-400 text-white hover:bg-pink-400"
                        >
                          <Minus />
                        </Button>
                      )}

                      {quantity > 0 && (
                        <span className="min-w-7 text-center font-semibold px-1 bg-pink-400 text-white rounded">
                          {quantity}
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className={`w-8 h-8 rounded-lg ${
                        quantity > 0
                          ? "bg-gray-700 text-white hover:bg-gray-700"
                          : "bg-pink-400 text-white"
                      }`}
                      onClick={() => addItem(product)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 pr-6">
              <CardTitle className="mb-1">{title}</CardTitle>
              <CardDescription className="text-sm line-clamp-3">
                {descriptionLimit(description)}
              </CardDescription>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-end">
            <p className="text-sm line-through">{price}$</p>
            <p className="font-bold">{priceWithDiscount.toFixed(2)}$</p>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ProductCard;
