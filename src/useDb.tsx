import { useEffect } from "react";
import { db } from "./db";
import localStorageDB from "localstoragedb";
const database = new localStorageDB("new_docs", localStorage);

export const useDb = () => {
  useEffect(() => {
    if (!database.tableExists("data")) {
      database.createTableWithData("data", db);
      database.commit();
    }
  }, []);

  return db;
};

export default useDb;
