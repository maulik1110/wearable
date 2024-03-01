// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import {
//   Box,
//   IconButton,
//   Typography,
//   isMuiElement,
//   useMediaQuery,
// } from "@mui/material";
// import { shades } from "../../theme";

// //all imgs
// const importAll = (r) => {
//   r.keys().reduce((acc, item) => {
//     acc[item.replace("./", "")] = r(item).default;
//     return acc;
//   }, {});
// };
// const heroTextureImports = importAll(
//   require.context("../../Assetsimage", false, /\.(png|jpe?g|svg)$/)
// );

// const MainCarousel = () => {
//   const isNonMobile = useMediaQuery("min-width:600px");
//   return (
//     <Carousel
//       infiniteLoop={true}
//       showThumbs={false}
//       showIndicators={false}
//       showStatus={false}
//       renderArrowPrev={(onClickHandler, hasPrev, label) => (
//         <IconButton
//           onClick={onClickHandler}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "0",
//             color: "white",
//             padding: "5px",
//             zIndex: "10",
//           }}
//         >
//           <NavigateBeforeIcon sx={{ fontSize: 40 }} />
//         </IconButton>
//       )}
//       renderArrowNext={(onClickHandler, hasNext, label) => (
//         <IconButton
//           onClick={onClickHandler}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             right: "0",
//             color: "white",
//             padding: "5px",
//             zIndex: "10",
//           }}
//         >
//           <NavigateNextIcon sx={{ fontSize: 40 }} />
//         </IconButton>
//       )}
//     >
//       {heroTextureImports && Object.values(heroTextureImports).map((texture, index) => (
//         <Box key={`carousel-image-${index}`}>
//           <img
//             src={texture}
//             alt={`carousel-${index}`}
//             style={{
//               width: "100%",
//               height: "700px",
//               objectFit: "cover",
//               backgroundAttachment: "fixed",
//             }}
//           />

//           <Box
//             color={"white"}
//             padding={"20px"}
//             borderRadius={"2px"}
//             textAlign={"left"}
//             position={"absolute"}
//             top={"46%"}
//             backgroundColor="rgba(0,0,0,0.4)"
//             left={isNonMobile ? "10%" : "0"}
//             right={isMuiElement ? undefined : "0"}
//             margin={isMuiElement ? undefined : "0 auto"}
//             maxWidth={isMuiElement ? undefined : "240px"}
//           >
//             <Typography color={shades.secondary[200]}>--New Items</Typography>
//             <Typography variant="h1">Summer Sale</Typography>
//             <Typography fontWeight={"bold"} color={shades.secondary[300]} sx={{
//                 textDecoration:"underline"
//             }}>Discover More</Typography>
//           </Box>
//         </Box>
//       ))}
//     </Carousel>
//   );
// };

// export default MainCarousel;














import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";

const importAll = (r) => {
  return r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item).default;
    return acc;
  }, {});
};

const imgarray = ["https://images.unsplash.com/photo-1707345512638-997d31a10eaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]

const heroTextureImports = importAll(
  require.context("../../Assetsimage", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  console.log(heroTextureImports);
    
  
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {imgarray.map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
            
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
            
            />
          <Box
            color={"white"}
            padding={"20px"}
            borderRadius={"2px"}
            textAlign={"left"}
            position={"absolute"}
            top={"46%"}
            backgroundColor="rgba(0,0,0,0.4)"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
            >
            <Typography color={shades.secondary[200]}>-- New Items</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography fontWeight={"bold"} color={shades.secondary[300]} sx={{
                textDecoration:"underline"
            }}>Discover More</Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
