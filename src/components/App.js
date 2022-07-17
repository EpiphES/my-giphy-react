import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tabs from './Tabs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Tabs />
        <Switch>
          <Route path="/trending">
            <Random />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/random">
            <Random />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
