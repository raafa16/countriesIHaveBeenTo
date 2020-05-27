// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";

function App() {
  const [content, setContent] = useState("");
  const [condition, setCondition] = useState("");

  return (
    <div>
      <MapChart
        setTooltipContent={setContent}
        setTooltipCondition={setCondition}
      />
      {condition ? (
        <ReactTooltip
          clickable={true}
          place="right"
          type="dark"
          effect="float"
          delayHide={500}
          delayUpdate={500}
        >
          {content}
        </ReactTooltip>
      ) : (
        <ReactTooltip place="right" type="dark" effect="float">
          {content}
        </ReactTooltip>
      )}
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
