import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";

const CommonLineChart = ({ name = "", data = [], currentData = null, currentIndex = 0, buffer = 100, steps = 100, units = "" }) => {
  const getInitialVisiblePoints = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      return 6;
    } else if (screenWidth >= 768) {
      return 3;
    } else {
      return 3;
    }
  };
  const [initialVisiblePoints, setInitialVisiblePoints] = useState(getInitialVisiblePoints());

  useEffect(() => {
    const handleResize = () => {
      setInitialVisiblePoints(getInitialVisiblePoints());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateYAxisDomain = () => {
    if (currentData !== null) {
      const minDomain = currentData - buffer;
      const maxDomain = currentData + buffer;
      return [minDomain, maxDomain];
    }
    return undefined;
  };

  const calculateYAxisTicks = () => {
    if (currentData !== null) {
      const minTick = Math.floor((currentData - buffer) / steps) * steps;
      const maxTick = Math.ceil((currentData + buffer) / steps) * steps;
      return Array.from({ length: (maxTick - minTick) / steps + 1 }, (_, index) => minTick + index * steps);
    }
    return undefined;
  };

  return (
    <div>
      <div style={{ width: "85%", height: "30vh", margin: "20px" }}>
        <h6 className="custom-mt">Real-time Spectrum {name}</h6>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data?.slice(Math.max(0, currentIndex - initialVisiblePoints), currentIndex + 1)} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              label={{
                value: `• Live (Recent ${initialVisiblePoints} Samples)`,
                position: "insideRight",
                offset: 15,
                dy: 15,
                fill: "red",
                fontWeight: "bold",
              }}
              tickFormatter={(timestamp) => moment(timestamp).format("HH:mm:ss")}
            />
            <YAxis
              interval={0}
              domain={calculateYAxisDomain()}
              ticks={calculateYAxisTicks()}
              label={{
                value: `${name} (${units})`,
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { fontWeight: "bold" },
              }}
            />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const altitude = payload[0].payload.value;
                  const timestamp = moment(payload[0].payload.timestamp).format("D MMM YY, HH:mm:ss");

                  return (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "5px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <div>
                        Value:{" "}
                        <strong>
                          {altitude?.toFixed(2)} {units}
                        </strong>
                      </div>
                      <div>
                        Sample time: <strong>{timestamp}</strong>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
          {currentData && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#8884d8",
                  marginRight: "5px",
                }}
              />
              <span>
                Current {name}:{" "}
                <strong>
                  &nbsp;{currentData.toFixed(2)} {units}
                </strong>
              </span>
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CommonLineChart;
