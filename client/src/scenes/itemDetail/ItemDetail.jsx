import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
// import { FavoriteBorderOutlinedIcon } from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Items from "../../component/Items";

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);

  const handleChange = (event, nwewValue) => {
    setValue(nwewValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );

    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    setItem(itemsJson.data);
  }

  useEffect(() => {
    getItems();
    getItem();
  }, [itemId]);

  return (
    <Box width={"80%"} margin={"80px auto"}>
      <Box display={"flex"} flexWrap={"wrap"} columnGap={"40px"}>
        {/* images */}
        <Box flex={"1 1 40%"} mb={"40px"}>
          <img
            alt={item?.name}
            width={"100%"}
            height={"100%"}
            src="http://localhost:2000${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}"
            style={{ objectFit: "contain" }}
          />
        </Box>
        {/* actions */}
        <Box flex={"1 1 50%"} mb={"40px"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m={"65px 0 25px 0"}>
            <Typography variant="h3">{item?.attribute?.name}</Typography>
            <Typography>{item?.attribute?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attribute?.longDescription}
            </Typography>
          </Box>
          {/* count and button */}
          <Box display={"flex"} alignItems={"center"} minHeight={"50px"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>

              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add To Cart
            </Button>
          </Box>

          <Box>
            <Box m={"20px 0 5px 0"} display={"flex"}>
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>Add to wishlist</Typography>
            </Box>
            <Typography>Categories: {item?.attribute?.category}</Typography>
          </Box>
        </Box>
      </Box>


      
      {/* infromation */}
      <Box m={"20px 0"}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Description" value={"description"} />
          <Tab label="Reviews" value={"reviews"} />
        </Tabs>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"15px"}>
        {value === "description" && (
          <div>{item?.attribute?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* related  */}
      {/* <Box mt={"50px"} width={"100%"}>
        <Typography variant="h3" fontWeight={"bold"}>
          Related Products
        </Typography>
        <Box
          mt={"20px"}
          display={"flex"}
          flexWrap={"Wrap"}
          columnGap={"1.33%"}
          justifyContent={"space-between"}
        >
          {item.slice(0,4).map((item,i)=>(
            <Items key={`${item.name}-${i}`} item={item}/>
          ))}
          {item && item.slice(0, 4).map((relatedItem, i) => (
      <Items key={`${relatedItem.name}-${i}`} item={relatedItem} />
    ))}
        </Box>
      </Box> */}
      <Box mt={"50px"} width={"100%"}>
        <Typography variant="h3" fontWeight={"bold"}>
          Related Products
        </Typography>
        <Box
          mt={"20px"}
          display={"flex"}
          flexWrap={"Wrap"}
          columnGap={"1.33%"}
          justifyContent={"space-between"}
        >
          {Array.isArray(item) &&
            item
              .slice(0, 4)
              .map((relatedItem, i) => (
                <Items key={`${relatedItem.name}-${i}`} item={relatedItem} />
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetail;
