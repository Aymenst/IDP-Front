import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const exportAsExcel = (csvData, fileName, columns) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  csvData.forEach(el => {
    Object.keys(el).forEach(key => {
      if(key.includes("id") || key.includes("Id")) delete el[key]
    })
  });
  const ws = XLSX.utils.json_to_sheet(csvData);
  if(csvData.length === 0) return;
  const headers = columns ? Object.keys(csvData[0]).map(key => {
    const existingColumn = columns.find(el => el.name === key);
    if(!existingColumn) return key;
    return existingColumn.label;
  }) : Object.keys(csvData[0]);
  XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
