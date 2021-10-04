import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "../../pages/homepage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Homepage} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
