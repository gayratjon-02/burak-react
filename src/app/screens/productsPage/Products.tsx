import { Box, Button, Container, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Input } from "@mui/base/Input";

import { setProducts } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useEffect } from "react";
import { serverApi } from "../../../lib/config";

/**  REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box" flexDirection={"row"}>
            <Box className="avatar-title">Burak Restaurant</Box>
            <Box className="main-input-search">
              <Button className="search-inp">
                <Input placeholder="Type here" />
              </Button>
              <Button className="search-icon">
                Search <SearchIcon />
              </Button>
            </Box>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack
              className="dishes-filter-box"
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Button variant="contained" color="primary" className="order">
                New
              </Button>

              <Button variant="contained" color="secondary" className="order">
                Price
              </Button>

              <Button variant="contained" color="secondary" className="order">
                Views
              </Button>
            </Stack>
          </Stack>
          {/*  */}
          <Stack className="list-category-section" flexDirection={"row"}>
            <Stack className="product-category">
              <div className="category-main">
                <Button variant="contained" color="secondary">
                  Other
                </Button>
                <Button variant="contained" color="secondary">
                  Dessert
                </Button>
                <Button variant="contained" color="secondary">
                  Drink
                </Button>
                <Button variant="contained" color="secondary">
                  Salad
                </Button>
                <Button variant="contained" color="primary">
                  Dish
                </Button>
              </div>
            </Stack>

            {/*  */}
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litre"
                      : product.productSize + " size";
                  return (
                    <Stack key={product._id} className="product-card">
                      <Stack
                        className="product-image"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        {/* back-eye-wrapper */}
                        <Stack className="back-eye-wrapper">
                          <Button className="shop-btn">
                            <img
                              src="/icons/shopping-cart.svg"
                              style={{ display: "flex" }}
                              alt="savatcha"
                            />
                          </Button>

                          <Button className="view-btn" sx={{ right: "36px" }}>
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                              slotProps={{
                                badge: {
                                  sx: {
                                    color: "rgb(255, 255, 255)",
                                    fontFamily: " Roboto",
                                    fontSize: "9px",
                                    fontWeight: "700",
                                    lineHeight: "11px",
                                    letterSpacing: " 0%",
                                    textAlign: "left",
                                  },
                                },
                              }}
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  width: "24px",
                                  height: "18px",

                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                      </Stack>

                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc-price">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available</Box>
              )}
            </Stack>
          </Stack>

          {/* Pagination */}
          <Stack className="pagination-section">
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      {/* brand-logo */}

      <div className="brands-logo">
        <Container className="family-brands">
          <Box className="category-title">Our Family Brands</Box>
          <Stack className="brand-list">
            <Box className="review-box">
              <img src="/img/gurme.webp" width={"100px"} alt="Burak img" />
            </Box>

            <Box className="review-box">
              <img src="/img/gurme.webp" width={"100px"} alt="Burak img" />
            </Box>

            <Box className="review-box">
              <img src="/img/gurme.webp" width={"100px"} alt="Burak img" />
            </Box>

            <Box className="review-box">
              <img src="/img/gurme.webp" width={"100px"} alt="Burak img" />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our Address</Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019241152424!2d-122.41941548468153!3d37.77492977975912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b4f5e6d3%3A0x99d4940703e68e9e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616444987631!5m2!1sen!2sus"
              style={{ marginTop: "60px" }}
              width={"1320"}
              height={500}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
