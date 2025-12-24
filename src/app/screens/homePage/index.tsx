import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";

import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";
import { ProductCollection } from "../../../lib/enums/product.enum";

import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";

import "../../../css/home.css";

/** REDUX ACTIONS */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    const productService = new ProductService();

    productService
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
      })
      .then(setPopularDishes)
      .catch(console.error);

    productService
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
      })
      .then(setNewDishes)
      .catch(console.error);

    const memberService = new MemberService();
    memberService.getTopUsers().then(setTopUsers).catch(console.error);
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
