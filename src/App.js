import React from "react";
import { render } from "react-dom";
import GithubJobs from "./Githubjobs";
const App = () => {
  return (
    <div className="githubjobs p-3">
      <GithubJobs />
    </div>
  );
};

render(<App />, document.getElementById("root"));
