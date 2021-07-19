import React, { Component } from 'react';
import { dataStore } from './dataStore';
import { Provider } from 'react-redux';
import { HttpHandler } from './httpHandler';
import { addProduct } from './actionCreators';
import { ConnectedProductList } from './productListConnector';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { OrderDetails } from './OrderDetail';
import { Summary } from './Summary';
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
        <BrowserRouter>
          <Switch>
            <Route path="/products" component={ConnectedProductList} />
            <Route
              path="/order"
              render={(props) => (
                <OrderDetails
                  {...props}
                  submitCallback={() => this.submitCallback(props)}
                />
              )}
            />
            <Route path="/Summary/:id" component={Summary} />
            <Redirect to="products" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );

  submitCallback = (routeProps: RouteComponentProps) => {
    this.httpHandler.storeOrder(dataStore.getState().order, (id) =>
      routeProps.history.push(`/Summary/${id}`),
    );
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
