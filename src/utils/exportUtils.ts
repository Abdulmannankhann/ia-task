import * as XLSX from "xlsx";
import moment from "moment";
import { SpectrumData } from "types/types";

export const downloadCSV = (data: SpectrumData[], setExporting: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (setExporting) {
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
