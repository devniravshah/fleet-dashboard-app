import { useState } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const PivotView = () => {
  const data = useSelector((state) => state.table.data);
  const [pivotState, setPivotState] = useState({
    sorters: {},
    derivedAttributes: {},
    rows: ["entity_type"],
    cols: ["drivers"],
    vals: ["power_units"],
    aggregatorName: "Sum",
    rendererName: "Table",
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <PivotTableUI
          data={data}
          {...pivotState}
          onChange={(s) => setPivotState(s)}
        />
      </Paper>
    </Box>
  );
};

export default PivotView;
