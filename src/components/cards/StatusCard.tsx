import React from "react";
import { Card } from "react-bootstrap";
import { SpectrumDatas } from "types/types";

interface StatusCardProps {
  data: SpectrumDatas[];
}

const StatusCard: React.FC<StatusCardProps> = ({ data }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="">Spectrum Status</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status Message: <strong>{data.length > 0 ? data[data.length - 1]?.statusMessage : ""}</strong>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Is Ascending: <strong>{data.length > 0 ? (data[data.length - 1]?.isAscending ? "True" : "False") : ""}</strong>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Is Action Required: <strong>{data.length > 0 ? (data[data.length - 1]?.isActionRequired ? "True" : "False") : ""}</strong>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default StatusCard;
