import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "../../pages/homepage";
import { initiateMetamask } from "../../services/blockchain";

const Routes = () => {
  useEffect(async () => {
    await initiateMetamask();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/" component={Homepage} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
