import "./styles.css";
import { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Buttons from "./Buttons";
import DataView from "./DataView";
import Form from "./Form";
import FormPrefill from "./FormPrefill";
import Drawers from "./Drawers";
import Summary from "./Summary";
import Dialog from "./Dialog";

import { db } from "./db";

import localStorageDB from "localstoragedb";
const database = new localStorageDB("new_docs", localStorage);

export default function App() {
  useEffect(() => {
    if (database.isNew()) {
      database.createTableWithData("data", db);
      database.commit();
    }
  }, []);

  return (
    <div className="App">
      <Link to="/">Home</Link>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buttons/" element={<Buttons />} />
          <Route path="/dataview/" element={<DataView />} />
          <Route path="/dialog/" element={<Dialog />} />
          <Route path="/form/" element={<Form />} />
          <Route path="/form_prefill/" element={<FormPrefill />} />
          <Route path="/drawers/" element={<Drawers />} />
          <Route path="/summary/" element={<Summary />} />
        </Routes>
      </div>
    </div>
  );
}
