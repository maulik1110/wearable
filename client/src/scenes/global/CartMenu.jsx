import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  deccreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";
import React from "react";
import Close from "@mui/icons-material/Close";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  // const totalPrice = cart.reduce((total, item) => {
  //   return total + item.count * item.attribute.price;
  // }, 0);
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.count * item.attribute?.price || 0); // Using optional chaining and providing a fallback value
  }, 0);
  

  return (
    <Box //overlay pura screen leke
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0,0,0,0.4)"
      position={"fixed"}
      zIndex={10}
      width={"100%"}
      height={"100%"}
      left={0}
      top={0}
      overflow={"auto"}
    >
      <Box //the shoppin cart white one
        position={"fixed"}
        right={0}
        bottom={0}
        width={"max(400px,30%)"}
        height={"100%"}
        backgroundColor="white"
      >
        <Box padding={"30px"} overflow={"auto"} height={"100%"}>
          {/* header */}
          <FlexBox mb={"15px"}>
            <Typography variant="h3">Shopping Bag ({cart.length})</Typography>

            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* cart list */}
          <Box>
            {cart.map((item) => (
              item && item.atribute && item.attribute.name && (
              <Box key={`${item?.attribute?.name}-${item?.id}`}>
                <FlexBox p={"15px 0"}>
                  <Box flex={"1 1 40%"}>
                    <img
                      alt="item ?.name"
                      width={"123px"}
                      height={"164px"}
                      src={`http://localhost:1337${item?.attribute?.image?.data?.attribute?.formats?.meduim?.url}`}
                    />
                  </Box>
                  <Box flex={"1 1 60%"}>
                    <FlexBox mb={"5px"}>
                      <Typography fontWeight={"bold"}>
                        {item.attribute.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>

                    <Typography>{item.attribute.shortDescription}</Typography>
                    <FlexBox m={"15px 0"}>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() => deccreaseCount({ id: item.id })}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>

                        <IconButton
                          onClick={() => increaseCount({ id: item.id })}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* prices */}
                      <Typography fontWeight={"bold"}>
                        ₹{item.attribute.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>

                <Divider />
              </Box>

              )
              // <Box key={`${item.attribute.name}-${item.id}`}>
            ))}
          </Box>

          {/* actions */}
          <Box m={"20px 0"}>
            <FlexBox m={"20px 0"}>
              <Typography fontWeight={"bold"}>Subtotal</Typography>
              <Typography fontWeight={"bold"}>${totalPrice}</Typography>
            </FlexBox>

            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: "0",
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;