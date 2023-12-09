// src/components/table/tableColumns.ts
import { Button } from "react-bootstrap";
import moment from "moment";

export const ActonSpectrumColumn = (handleAction) => [
  {
    name: "Event Time",
    selector: (row) => row.timestamp,
    format: function (cell) {
      return <div className="text-danger">{moment(cell?.timestamp).format("D MMM YY, HH:mm:ss")}</div>;
    },
  },
  {
    name: "Is Ascending",
    selector: (row) => row.IsAscending,
    format: function (cell) {
      return <div className="text-danger">{cell?.IsAscending ? "True" : "False"}</div>;
    },
  },
  {
    name: "Status Message",
    selector: (row) => row.StatusMessage,
    format: function (cell) {
      return (
        <div className="text-danger" data-toggle="tooltip" title={cell?.StatusMessage}>
          {cell.StatusMessage}
        </div>
      );
    },
    wrap: true,
  },
  {
    name: "Action Required",
    selector: (row) => row.IsActionRequired,
    format: function (cell) {
      return <div className="text-danger">{cell.IsActionRequired ? "True" : "False"}</div>;
    },
  },
  {
    name: "Action",
    cell: (row) => (
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          handleAction(row);
        }}
      >
        Action
      </Button>
    ),
  },
];

export const SpectrumLogsColumn = [
  {
    name: "Event Time",
    selector: (row) => row.timestamp,
    format: function (cell) {
      return <div className={cell?.IsActionRequired ? "text-danger" : ""}>{moment(cell.timestamp).format("D MMM YY, HH:mm:ss")}</div>;
    },
  },
  {
    name: "Altitude (km)",
    selector: (row) => row?.Altitude,
    format: function (cell) {
      return <div className={cell?.IsActionRequired ? "text-danger" : ""}>{cell?.Altitude?.toFixed(2)}</div>;
    },
  },
  {
    name: "Temperature (°C)",
    selector: (row) => row?.Temperature,
    format: function (cell) {
      return <div className={cell?.IsActionRequired ? "text-danger" : ""}>{cell?.Temperature?.toFixed(2)}</div>;
    },
  },
  {
    name: "Velocity (m/s)",
    selector: (row) => row?.Velocity,
    format: function (cell) {
      return <div className={cell?.IsActionRequired ? "text-danger" : ""}>{cell?.Velocity?.toFixed(2)}</div>;
    },
  },
  {
    name: "Status Message",
    selector: (row) => row.StatusMessage,
    format: function (cell) {
      return (
        <div className={cell?.IsActionRequired ? "text-danger" : ""} data-toggle="tooltip" title={cell.StatusMessage}>
          {cell.StatusMessage}
        </div>
      );
    },
    wrap: true,
  },
  {
    name: "Is Ascending",
    selector: (row) => row.IsAscending,
    format: function (cell) {
      return <div className={cell?.IsActionRequired ? "text-danger" : ""}>{cell.IsAscending ? "True" : "False"}</div>;
    },
  },
  {
    name: "Action Required",
    selector: (row) => row.IsActionRequired,
    format: function (cell) {
      return <div className={cell?.IsActionRequired ? "text-danger" : ""}>{cell.IsActionRequired ? "True" : "False"}</div>;
    },
  },
];
