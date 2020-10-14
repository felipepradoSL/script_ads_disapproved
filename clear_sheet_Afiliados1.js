/****************************************************************************
**
**  Sweet Leads Empreendimentos Digitais
**  https://sweetleads.com.br
**
**
**  LIMPA PLANILHA e insere cabeçalho
**  
**  Limpa a planilha com as campanhas que foram pausadas:
**  - https://docs.google.com/spreadsheets/d/1bWjdLM2PtLUvo_phxWYvN9tOdZob5vWyyOKoxoP6NBE/
**  
**   Afiliados 1
**  
** Ajustar para ser executado uma vez a cada dia
*****************************************************************************/

SPREADSHEET_ID = "1bWjdLM2PtLUvo_phxWYvN9tOdZob5vWyyOKoxoP6NBE";

// SpreadSheet header
var SHEET_REPORT_HEADER = [
"Ads ID",
"Campaign Name", 
"Campaign ID"
];

function main() {

  prepareSpreadsheet(); // prepare spreadsheet and add header

}

//prepare spreadsheet
function prepareSpreadsheet() {

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);//open google sheets by ID (URL)
  var sheet = ss.getActiveSheet(); // select sheet actived
  sheet.clear(); //remove earlies alerts
  sheet.clearConditionalFormatRules(); // clear all conditional format rules in sheet
  sheet.appendRow(SHEET_REPORT_HEADER); // append header
}

