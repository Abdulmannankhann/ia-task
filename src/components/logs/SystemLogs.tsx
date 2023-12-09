import React, { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { SpectrumData } from "types/types";
import moment from "moment";

interface SystemLogsProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: SpectrumData[];
}

const SystemLogs: React.FC<SystemLogsProps> = ({ show, setShow, data }) => {
  const [exporting, setExporting] = useState(false);
  const columns = [
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

  const downloadCSV = (data: SpectrumData[]) => {
    if (!exporting) {
      setExporting(true);
      const formattedData = data.map((item) => ({
        "Event Time": moment(item.timestamp).format("D MMM YY, HH:mm:ss"),
        Altitude: item.Altitude ? item.Altitude.toFixed(2) : "",
        Temperature: item.Temperature ? item.Temperature.toFixed(2) : "",
        Velocity: item.Velocity ? item.Velocity.toFixed(2) : "",
        "Status Message": item.StatusMessage || "",
        "Is Ascending": item.IsAscending ? "True" : "False",
        "Is Action Required": item.IsActionRequired ? "True" : "False",
      }));
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

      XLSX.writeFile(workbook, `SpectrumLogs_${moment().format("DDMMMYYYY_HH:mm:ss")}.xlsx`, { bookSST: true });

      setExporting(false);
    }
  };

  const Export: React.FC<{ onExport: () => void }> = ({ onExport }) => (
    <Button size="sm" variant="dark" onClick={() => onExport()} disabled={exporting}>
      Export
    </Button>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(data)} />, [data, downloadCSV]);

  return (
    <>
      <Modal size="xl" show={show} onHide={() => setShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton className="d-flex justify-content-between">
          <Modal.Title className="flex-grow-1" id="example-modal-sizes-title-lg">
            <div>Spectrum Logs</div>
          </Modal.Title>
          {actionsMemo}
        </Modal.Header>
        <Modal.Body>
          <DataTable columns={columns} data={data} pagination noDataComponent="There are no Logs!" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SystemLogs;
