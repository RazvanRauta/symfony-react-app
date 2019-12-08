import React, {Component} from 'react';
import'./App.scss';
import HomePage from './pages/homepage.component';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HomePage/>
      </div>
    )
  }


}

export default App;