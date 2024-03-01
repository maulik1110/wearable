import React, { useEffect, useState } from "react";
// import Tabs from "@mui/material/Tabs"
// import Tab from "@mui/material/Tab"
import { Box, Typography, Tab, Tabs, useMediaQuery, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import Items from "../../component/Items";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  console.log("items", items);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); //eslint-disable

  // const topRatedItems = items.filter(
  //     (item)=>item.attribute.category==="topRated"
  // )
  // const newArrivalsItems = items.filter(
  //     (item)=>item.attribute.category==="newArrivals"
  // )
  // const bestSellersItems = items.filter(
  //     (item)=>item.attribute.category==="bestSellers"
  // )
  const topRatedItems = items.filter(
    (item) => item && item.attribute && item.attribute.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) =>
      item && item.attribute && item.attribute.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) =>
      item && item.attribute && item.attribute.category === "bestSellers"
  );

  return (
    <Box width={"80%"} margin={"50px auto"}>
      <Typography variant="h3" textAlign={"center"}>
        Our Featured <b>Products</b>
      </Typography>

      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{ margin: "25px", "&.MuiTabs-flexcontainer": { flexWrap: "wrap" } }}
      >
        <Tab label="ALL" value={"all"} />
        <Tab label="NEW ARRIVALS" value={"newArrivals"} />
        <Tab label="BEST SELLERS" value={"bestSellers"} />
        <Tab label="TOP RATED" value={"topRated"} />
      </Tabs>

      <Box
        margin={"0 auto"}
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fill,300px)"}
        justifyContent={"space-around"}
        rowGap={"20px"}
        columnGap={"1.33%"}
      >
        {value==="all" && items.map((item)=>(
            <Items item={item} key={`${item.name}-${item.id}`}/>
        ))}
        {value==="newArrivals" && newArrivalsItems.map((item)=>(
            <Items item={item} key={`${item.name}-${item.id}`}/>
        ))}
        {value==="bestSellers" && bestSellersItems.map((item)=>(
            <Items item={item} key={`${item.name}-${item.id}`}/>
        ))}
        {value==="topRated" && topRatedItems.map((item)=>(
            <Items item={item} key={`${item.name}-${item.id}`}/>
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
