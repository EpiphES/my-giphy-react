import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavBar from "./NavBar";
import Trending from "./Trending"
import Search from "./Search";
import Random from "./Random";

function App() {
  
  return (
    <div className="App">
      <NavBar />
      <Container style={{ paddingTop: "56px",minHeight:"100vh"}}>
        <Switch>
          <Route path="/trending">
            <Trending />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/random">
            <Random />
          </Route>
          <Route path="*">
            <Redirect to="/trending" />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
