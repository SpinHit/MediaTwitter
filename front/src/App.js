import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TwitterHead from "./TwitterHead";
import MediaApp from "./MediaApp";
import CerfiaApp from "./CerfiaApp";
import Footer from "./Footer";
import MailNous from "./MailNous";

function App() {
  return (
    <>
      <Router>
        <TwitterHead />
        <Switch>
          <Route exact path="/">
            <div className="midleZone">
            <CerfiaApp />
            <MediaApp />
            </div>
            <MailNous />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
