import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { color } from "../../../../../Theme/color";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart
} from "../../../../../redux/features/cart/CartProducer";
import { RootState } from "../../../../../redux/storeClient";
import { Product } from "../../../../../submodules/models/ProductModel/Product";
import { numberFormat } from "../../../../../helpers/formatPrice";
import EditIcon from "@mui/icons-material/Edit";

const CartProduct = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const cart = useSelector((state: RootState) => state.cart.cartItems);
  useEffect(() => {
    fetchCart();
  }, []);
  const [Cart, setCart] = useState<Product[]>([]);
  const fetchCart = async () => {
    const local = localStorage.getItem("cartItems");
    if (local) {
      const localCart = JSON.parse(local);
      setCart(localCart);
    }
  };
  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  const handleRemove = (id: any) => {
    const remove = cart.filter((cart: any) => cart.id !== id);
    dispatch(removeFromCart(id));
    setCart(remove);
  };
  const handleDes = (id: any) => {
    dispatch(decreaseCart(id));
  };
  const handleIncrement = (id: any) => {
    dispatch(addToCart(id));
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid
            display={"flex"}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            bgcolor={color.white}
            p={2}
            borderRadius={"4px"}
          >
            <Grid item xs={6} md={6}>
              <Typography>
                Tổng số lượng ({cartTotalQuantity} sản phẩm)
              </Typography>
            </Grid>
            <Grid item xs={2.5} md={3} textAlign={"center"}>
              <Typography>Số lượng</Typography>
            </Grid>
            <Grid item xs={2.5} md={2} textAlign={"center"}>
              <Typography>Thành tiền</Typography>
            </Grid>
            <Grid item xs={1} md={1}></Grid>
          </Grid>
          <Box>
            {cart.map((element: Product) => {
              return (
                <Grid
                  className="cartItem"
                  display={"flex"}
                  alignItems={"center"}
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  bgcolor={color.white}
                  mt={2}
                  p={2}
                  borderRadius={"4px"}
                >
                  <Grid
                    className="cartItem_thumb"
                    direction={"row"}
                    spacing={2}
                    xs={6}
                    md={6}
                  >
                    <Stack direction={"row"} alignItems={"normal"} spacing={2}>
                      <Box maxWidth={"119px"}>
                        <img
                          src={
                            element.productImages
                              ? element.productImages[0].image
                              : ""
                          }
                          alt=""
                          width={"100%"}
                        />
                      </Box>
                      <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                      >
                        <Typography>{element.title}</Typography>
                        <Stack direction={"row"} spacing={2}>
                          <Typography
                            variant="caption"
                            className="cartItem_Price"
                            fontWeight={"bold"}
                          >
                            {numberFormat(Number(element.price))}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="cartItem_PriceSale"
                            sx={{
                              textDecoration: "underline"
                            }}
                          >
                            {`${numberFormat(Number(element.price_sale))} `}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    className="cartItem_action"
                    direction={"row"}
                    spacing={2}
                    xs={2.5}
                    md={3}
                  >
                    <Stack
                      direction={"row"}
                      spacing={3}
                      border={"1px solid #eee"}
                      p={"3px 10px"}
                      borderRadius={2}
                      display={"flex"}
                      textAlign={"center"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <RemoveIcon
                        sx={{
                          fontSize: "17px",
                          cursor: "pointer"
                        }}
                        onClick={() => handleDes(element.id)}
                      />
                      <input
                        type="text"
                        value={element?.cartQuantity}
                        style={{
                          width: "10px"
                        }}
                      />
                      <AddIcon
                        onClick={() => handleIncrement(element)}
                        sx={{
                          fontSize: "17px",
                          cursor: "pointer"
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid xs={2.5} md={2} textAlign={"center"}>
                    <Typography color={"#F39801"}>
                      {
                        element?.price_sale !== undefined &&
                        element?.cartQuantity !== undefined
                          ? `${numberFormat(
                              Number(element.price_sale * element.cartQuantity)
                            )} `
                          : "N/A" /* Replace "N/A" with your preferred placeholder */
                      }
                    </Typography>
                  </Grid>
                  <Grid xs={1} md={1} textAlign={"end"}>
                    <DeleteForeverIcon
                      onClick={() => handleRemove(element.id)}
                      sx={{
                        fontSize: "17px",
                        cursor: "pointer"
                      }}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor={color.white} px={2} borderRadius={2}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              py={2}
              borderBottom={"1px solid #eee"}
            >
              <Stack color={color.text_second} direction={"row"} spacing={2}>
                <Typography variant="body1">KHUYẾN MÃI</Typography>
                <LoyaltyIcon
                  sx={{
                    fontSize: "17px"
                  }}
                />
              </Stack>
              <Stack color={color.text_second} direction={"row"}>
                <Typography variant="body1"> Xem thêm</Typography>
                <KeyboardArrowRightIcon />
              </Stack>
            </Stack>
            <Box pt={2}>
              <Stack
                direction={"row"}
                border={"1px solid #eee"}
                spacing={2}
                p={1}
                borderRadius={2}
                fontSize={"14px"}
                color={color.text_color}
              >
                <input
                  placeholder="Nhập mã khuyến mãi/Quà tặng"
                  style={{
                    flex: 1,
                    color: "inherit"
                  }}
                />
                <Button variant="outlined">
                  <Typography variant="body1">Áp dụng</Typography>
                </Button>
              </Stack>
              <Typography
                variant="body1"
                color={color.text_color}
                py={1}
                fontSize={"13px"}
              >
                Có thể áp dụng đồng thời mot ma
              </Typography>
            </Box>
          </Box>

          <Box bgcolor={color.white} px={2} borderRadius={2} mt={2}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              py={2}
              borderBottom={"1px solid #eee"}
            >
              <Stack color={color.text_color} direction={"row"} spacing={2}>
                <Typography variant="body1">KHUYẾN MÃI</Typography>
              </Stack>
              <Stack color={color.text_color} direction={"row"}>
                <Typography variant="body1"> 0d</Typography>
              </Stack>
            </Stack>
            <Box pt={2}>
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
                fontSize={"14px"}
                color={color.text_color}
                fontWeight={"bold"}
              >
                <Typography
                  variant="body1"
                  fontSize={"15.8px"}
                  fontWeight={"bold"}
                  color={color.text_color}
                >
                  Tổng Số Tiền (gồm VAT)
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={"15.8px"}
                  fontWeight={"bold"}
                  color={color.error}
                >
                  {`${numberFormat(Number(cartTotalAmount))}`}
                </Typography>
              </Stack>
              <Link to={"/checkout"}>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    bgcolor: "red",
                    color: "#fff"
                  }}
                  fullWidth
                >
                  <Typography fontWeight={"bold"} p={1}>
                    Thanh toán
                  </Typography>
                </Button>
              </Link>

              <Typography
                variant="body1"
                color={color.error}
                py={1}
                fontSize={"13px"}
              >
                (Giảm giá trên web chỉ áp dụng cho bán lẻ)
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* <iframe
          width="350"
          height="430"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/greetBot"
        ></iframe> */}
      </Grid>
    </Container>
  );
};

export default CartProduct;
