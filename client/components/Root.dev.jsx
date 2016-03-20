import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import DevTools from './DevTools.jsx'

export default class Root extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <App />
          {/* <DevTools /> */}
        </div>
      </Provider>
    );
  }
}
