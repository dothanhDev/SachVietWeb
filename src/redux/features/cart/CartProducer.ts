import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartItem {
  id: number;
  cartQuantity: number;
  price:number
  // Add other properties from your item here
}

interface CartState {
  cartItem: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}
const storedCartItems = localStorage.getItem('CartItems');
const initialCartItems: CartItem[] = storedCartItems ? JSON.parse(storedCartItems) : [];

const initialState: CartState = {
  cartItem: initialCartItems, 
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
      console.log(itemIndex)
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1;
        toast.info("Cập nhật giỏ hàng thành công!", {
          position: "bottom-right",
        });
        console.log('thu', state.cartItem[itemIndex].cartQuantity);
      } else {
        const itemProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(itemProduct);
        toast.success(" Thêm thành công sản phẩm vào giỏ hàng!", {
          position: "bottom-right",
        });
      }
      localStorage.setItem('CartItems', JSON.stringify(state.cartItem));
    },
    
    decrementCartItem(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        if (state.cartItem[itemIndex].cartQuantity > 1) {
          state.cartItem[itemIndex].cartQuantity -= 1;
          localStorage.setItem('CartItems', JSON.stringify(state.cartItem));
          toast.info("Cập nhật giỏ hàng thành công!", {
            position: "bottom-right",
          });
        } else {
          // If the cart quantity becomes zero, remove the item from the cart
          state.cartItem = state.cartItem.filter((item) => item.id !== action.payload.id);
          localStorage.setItem('CartItems', JSON.stringify(state.cartItem));
          toast.error('Đã xóa sản phẩm khỏi giỏ hàng!', {
            position: "bottom-right",
          });
        }
      }
    },
    incrementCartItem(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1;
        localStorage.setItem('CartItems', JSON.stringify(state.cartItem));
        toast.info("Cập nhật giỏ hàng thành công!", {
          position: "bottom-right",
        });
      }
    },

    getTotal(state) {
      let { total, quantity } = state.cartItem.reduce(
        (cartTotal, cartItem) => {
          let { price, cartQuantity } = cartItem;
          let itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const remove = state.cartItem.filter((item) => item.id !== action.payload.id);
      state.cartItem = remove;
      localStorage.setItem('CartItems', JSON.stringify(state.cartItem));
      toast.error('Đã xóa sản phẩm khỏi giỏ hàng!', {
        position: "bottom-right",
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, getTotal, removeItem, decrementCartItem , incrementCartItem } = cardSlice.actions;

export default cardSlice.reducer;
