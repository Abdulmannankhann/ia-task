import React, { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { SpectrumData } from "types/types";
import { SpectrumLogsColumn } from "../table/tableColumns";
import { downloadCSV } from "../../utils/exportUtils";

interface SystemLogsProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: SpectrumData[];
}

const SystemLogs: React.FC<SystemLogsProps> = ({ show, setShow, data }) => {
  const [exporting, setExporting] = useState(false);

  const Export: React.FC<{ onExport: () => void }> = ({ onExport }) => (
    <Button size="sm" variant="dark" onClick={() => onExport()} disabled={exporting}>
      Export
    </Button>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(data, setExporting)} />, [data, downloadCSV]);

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
          <DataTable columns={SpectrumLogsColumn} data={data} pagination noDataComponent="There are no Logs!" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SystemLogs;
