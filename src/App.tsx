import "./styles.css";
import { Link, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Buttons from "./Buttons";
import Chips from "./Chips";
import DataView from "./DataView";
import Form from "./form/Form";
import FormPrefill from "./form/FormPrefill";
import Drawers from "./drawers/Drawers";
import Summary from "./Summary";
import Dialog from "./Dialog";
import useDb from "./useDb";
import Spinner from "./Spinner";

export default function App() {
  useDb();

  return (
    <div className="App">
      <Link to="/">Home</Link>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buttons/" element={<Buttons />} />
          <Route path="/chips/" element={<Chips />} />
          <Route path="/dataview/" element={<DataView />} />
          <Route path="/dialog/" element={<Dialog />} />
          <Route path="/form/" element={<Form />} />
          <Route path="/form_prefill/" element={<FormPrefill />} />
          <Route path="/drawers/" element={<Drawers />} />
          <Route path="/summary/" element={<Summary />} />
          <Route path="/spinner/" element={<Spinner />} />
        </Routes>
      </div>
    </div>
  );
}
