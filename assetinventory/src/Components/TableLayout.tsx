import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import assetData from "../Resources/Asset.json";
import "../Resources/Index.css";
import CustomTable from "./CustomTable";

function TableLayout() {
  return (
    <div>
      <div className="table-card">
        <div className="table-card-title">Asset Inventory</div>
        <div className="ctable-ard-data">
          <CustomTable />
        </div>
      </div>
    </div>
  );
}

export default TableLayout;
