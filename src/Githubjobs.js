import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";

import View from "./View";
import Job from "./Job";
const Githubjobs = function Githubjobs() {
  return (
    <div className="githubContainer container mx-auto">
      <header>
        <h1>
          <Link to="/">
            <span className="font-bold">GitHub</span> Jobs
          </Link>
        </h1>
      </header>
      <Router>
        <View path="/" />
        <Job path="/job/:id" />
      </Router>
    </div>
  );
};
export default Githubjobs;
