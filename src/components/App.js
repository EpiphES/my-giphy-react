import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavBar from "./NavBar";
import Trending from "./Trending"
import Search from "./Search";
import Gif from "./Gif"
import Random from "./Random";
import Upload from "./Upload";

function App() {
  
  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: "56px" }}>
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
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/gifs/:id">
            <Gif />          
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
