import "./styles.css";
import { Link, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Buttons from "./Buttons";
import DataView from "./DataView";
import Form from "./Form";
import FormPrefill from "./FormPrefill";
import Drawers from "./Drawers";

export default function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buttons/" element={<Buttons />} />
          <Route path="/dataview/" element={<DataView />} />
          <Route path="/form/" element={<Form />} />
          <Route path="/form_prefill/" element={<FormPrefill />} />
          <Route path="/drawers/" element={<Drawers />} />
        </Routes>
      </div>
    </div>
  );
}
