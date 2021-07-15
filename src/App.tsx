import React, { Component } from 'react';
// import { ProductList } from './productList';
// import { Product, Order } from './entities';
import { dataStore } from './dataStore';
import { Provider } from 'react-redux';
import { HttpHandler } from './httpHandler';
import { addProduct } from './actionCreators';
import { ConnectedProductList } from './productListConnector';
import './App.css';

interface Props {
  // none required
}

export default class App extends Component<Props> {
  private httpHandler = new HttpHandler();
  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     order: new Order(),
  //   };
  // }

  componentDidMount = () =>
    this.httpHandler.loadProducts((data) => {
      dataStore.dispatch(addProduct(...data));
    });

  render = () => (
    <div className="App">
      <Provider store={dataStore}>
        <ConnectedProductList />
      </Provider>
    </div>
  );

  submitCallback = () => {
    console.log('Submit order');
  };

  // get categories(): string[] {
  //   return [...new Set(testData.map((p) => p.category))];
  // }
  // addToOrder = (product: Product, quantity: number) => {
  //   this.setState((state) => {
  //     state.order.addProduct(product, quantity);
  //     return state;
  //   });
  // };
}
