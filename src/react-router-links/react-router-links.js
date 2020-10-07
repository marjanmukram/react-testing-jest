import React from "react";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

const Home = () => <h1>Home</h1>;
const AboutUs = () => <h1>About Us</h1>;
const NoMatch = () => <h1>No Match</h1>;

const ReactRouterLinks = () => {
  return (
    <BrowserRouter>
      <Link to='/'>Home</Link>
      <Link to='/about'>About Us</Link>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={AboutUs} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};

export default ReactRouterLinks;
