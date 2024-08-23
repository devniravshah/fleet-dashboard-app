import axios from "axios";
import Papa from "papaparse";

export const fetchData = async () => {
  const result = await axios.get(
    "https://docs.google.com/spreadsheets/d/1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE/gviz/tq?tqx=out:csv"
  );
  const parsedData = Papa.parse(result.data, {
    header: true,
    skipEmptyLines: true,
  }).data;
  return parsedData.splice(0, 100);
};
