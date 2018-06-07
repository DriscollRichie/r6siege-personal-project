import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Forums from "./components/Forums/Forums";
import Account from "./components/Account/Account";
import Auth from "./components/Auth/Auth";
import Thread from "./components/Thread/Thread";
import newThread from "./components/newThread/newThread";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/forums" component={Forums} />
    <Route path="/account" component={Account} />
    <Route path="/auth" component={Auth} />
    <Route path="/forums/thread/:id" component={Thread} />
    <Route path="/forums/new/thread" component={newThread} />
  </Switch>
);
