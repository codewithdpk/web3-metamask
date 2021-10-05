import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "../../pages/homepage";
import TransferPage from "../../pages/transfer";
import { initiateMetamask } from "../../services/blockchain";
import Header from "../header";

const Routes = () => {
  useEffect(async () => {
    await initiateMetamask();
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/transfer" component={TransferPage} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
