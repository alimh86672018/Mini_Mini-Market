import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (!item) return state;

      if (item.quantity === 1) {
        return { items: state.items.filter((item) => item.id !== id) };
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }),

  getTotalCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((sum, item) => {
      const discounted =
        item.price - (item.price * item.discountPercentage) / 100;
      return sum + discounted * item.quantity;
    }, 0),
}));
