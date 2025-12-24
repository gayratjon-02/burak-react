import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import ChosenProduct from "./ChosenProduct";
import Products from "./Products";

import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onAdd }) => {
  const { path } = useRouteMatch();

  return (
    <div className="products-page">
      <Switch>
        <Route path={`${path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>

        <Route exact path={path}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
};

export default ProductsPage;
