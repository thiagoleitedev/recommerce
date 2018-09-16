import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListContainer from "./containers/ProductListContainer";
import CheckoutContainer from "./containers/CheckoutContainer";
import HeaderContainer from "./containers/HeaderContainer";
import { _products } from "./products";
import "typeface-roboto";

class App extends Component {
  state = {
    cart: [],
    products: [],
    cartQuantityByIds: {}
  };

  componentDidMount() {
    this.addProducts(_products);
  }

  addProducts = data => {
    this.setState({
      products: data
    });
  };

  getStock = item => {
    return this.state.products.find(product => product.id === item.id).stock;
  };

  canAdd = item => {
    const sumQuantity = (this.state.cartQuantityByIds[item.id] || 0) + 1;
    const hasStock = sumQuantity <= this.getStock(item);

    if (hasStock) {
      return true;
    }
    return false;
  };

  addToCart = item => {
    if (this.canAdd(item)) {
      this.setState({
        cartQuantityByIds: {
          ...this.state.cartQuantityByIds,
          [item.id]: (this.state.cartQuantityByIds[item.id] || 0) + 1
        }
      });
    }
  };

  getCartQuantity = obj => {
    if (obj) {
      return Object.keys(obj).reduce((sum, key) => {
        return sum + obj[key];
      }, 0);
    }
  };

  removeFromCart = item => {
    const removeQuantity = this.state.cartQuantityByIds[item.id] - 1;

    if (removeQuantity >= 0) {
      this.setState({
        cartQuantityByIds: {
          ...this.state.cartQuantityByIds,
          [item.id]: this.state.cartQuantityByIds[item.id] - 1
        }
      });
    }
  };

  render() {
    return (
      <div>
        <HeaderContainer
          products={this.state.products}
          cart={this.state.cart}
          addToCart={this.addToCart}
          cartQuantityByIds={this.state.cartQuantityByIds}
          getCartQuantity={this.getCartQuantity}
          removeFromCart={this.removeFromCart}
        />
        <ProductListContainer />
      </div>
      // <Provider>
      //   <HeaderContainer />
      //   <Router>
      //     <Switch>
      //       <Route path="/" exact component={ProductListContainer} />
      //       <Route path="/checkout" exact component={CheckoutContainer} />
      //     </Switch>
      //   </Router>
      // </Provider>
    );
  }
}

export default App;
