"use client";

import Image from "next/image";

type Props = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
  products: any[];
};

const CategoriesBar = ({
  selectedCategory,
  onSelectCategory,
  categories,
  products,
}: Props) => {
  return (
    <div className="w-full py-3">
      {/* Scrollable container */}
      <div
        className="
          flex gap-3 px-3
          overflow-x-auto 
          scrollbar-none
          snap-x snap-mandatory
          scroll-smooth
          whitespace-nowrap
        "
      >
        {/* ALL Category */}
        <button
          onClick={() => onSelectCategory("all")}
          className={`
            snap-start flex-shrink-0
            w-28 h-24 rounded-xl relative overflow-hidden
            border transition-all duration-200
            ${
              selectedCategory === "all"
                ? "border-pink-500 shadow-lg"
                : "border-gray-300"
            }
          `}
        >
          <div className="absolute inset-0 bg-gray-700" />
          <div className="absolute inset-0 bg-black/30" />
          <span className="absolute left-1/2 -translate-x-1/2 text-white font-bold">
            all products
          </span>
        </button>

        {categories.map((category) => {
          const sampleThumb = products.find(
            (p) => p.category === category
          )?.thumbnail;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                snap-start flex-shrink-0
                w-28 h-24 rounded-xl relative overflow-hidden
                border transition-all duration-200
                ${
                  selectedCategory === category
                    ? "border-pink-500 shadow-lg scale-[1.02]"
                    : "border-gray-300"
                }
              `}
            >
              {sampleThumb && (
                <Image
                  src={sampleThumb}
                  alt={category}
                  fill
                  className="object-cover"
                />
              )}

              <div className="absolute inset-0 bg-black/30" />

              <span className="absolute left-1/2 -translate-x-1/2 text-white font-bold text-sm">
                {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesBar;
