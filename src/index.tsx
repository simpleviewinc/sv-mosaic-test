import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

// react.StrictMode was removed due to an issue with react-beautiful-dnd
// Error: Unable to find draggable with id: 0
// https://github.com/atlassian/react-beautiful-dnd/issues/2393
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
