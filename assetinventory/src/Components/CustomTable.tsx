import React, { useEffect, useState } from "react";
import assetData from "../Resources/Asset.json";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import "../Resources/Index.css";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ClipLoader } from "react-spinners";
import SubAssestTable from "./SubAssestTable";
import PropertyPanel from "./PropertyPanel";

type AssetData = {
  assetId: string;
  assetName: string;
  assetType: string;
  assetConnectedStatus: string;
  assetHealthStatus: string;
  assetSecurityStatus: string;
  subAsset: any[] | null;
  isExpanded?: boolean;
};

type ColumnSort = {
  id: string;
  desc: boolean;
};

type SortingState = ColumnSort[];

function CustomTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<AssetData[]>([]);
  const [showPropertyPanel,setshowPropertyPanel ] = useState(false);

  const columnHelper = createColumnHelper<AssetData>();

  const toggleExpand = (index: number) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  const columns = [
    columnHelper.accessor("assetName", {
      header: "Asset Name",
      cell: (info) =>
        info.row.original.subAsset && info.row.original.subAsset.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {info.getValue()}{" "}
            <div
              onClick={() => {toggleExpand(info.row.index),setshowPropertyPanel(false)}}

              style={{ cursor: "pointer" }}
            >
              {info.row.original.isExpanded ? "▲" : "▼"}
            </div>
          </div>
        ) : (
          <div> {info.getValue()}</div>
        ),
    }),
    columnHelper.accessor("assetId", {
      header: "Asset ID",
      cell: (info) => (
        <div
          onClick={() => setshowPropertyPanel(true)}
          style={{ cursor: "pointer" }}
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("assetType", {
      header: "Asset Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("assetConnectedStatus", {
      header: "Connected Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("assetHealthStatus", {
      header: "Health Status",
      cell: (info) => <div style={{ color: info.getValue() === 'Good' ? 'rgb(21, 203, 54)': 'red'}}>{info.getValue()}</div>,
    }),
    columnHelper.accessor("assetSecurityStatus", {
      header: "Security Status",
      cell: (info) => (info.getValue() === "Secured" ? <>{info.getValue()} <CiLock size={20}  /></> : <>{info.getValue()} <CiUnlock size={20} /></> ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      sorting: [
        {
          id: "assetName",
          desc: false,
        },
      ],
    },
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    setTimeout(() => {
      setData(assetData.assetData);
    }, 3000);
  }, []);

  return (
    <table>
      {data.length > 0 ? (
        <>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th>Sr .No</th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ width: header.index === 1 ? 200 : "auto" }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() === false
                      ? null
                      : header.column.getIsSorted() === "asc"
                      ? "▲"
                      : "▼"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr
                  style={{
                    backgroundColor: row.original.isExpanded ? "#f7f7f7" : "",
                  }}
                >
                  <td>{index + 1}</td>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
                {row.original.isExpanded &&
                  row.original.subAsset &&
                  row.original.subAsset.length > 0 && (
                    <SubAssestTable data={row.original.subAsset} index={index} />
                  )}
              </React.Fragment>
            ))}
          </tbody>
          {showPropertyPanel && (
            <PropertyPanel setshowPropertyPanel={setshowPropertyPanel} />
          )}
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "500px",
            }}
          >
            <ClipLoader
              color={"#3dcd58"}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      )}
    </table>
  );
}

export default CustomTable;
