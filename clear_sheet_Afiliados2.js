/****************************************************************************
**
**  Sweet Leads Empreendimentos Digitais
**  https://sweetleads.com.br
**	felipe@sweetleads.com.br
**
**	GitHub
**	https://github.com/felipepradoSL/script_ads_disapproved
**
**  LIMPA PLANILHA e insere cabeçalho
**  
**  Limpa a planilha com as campanhas que foram pausadas:
**  - https://docs.google.com/spreadsheets/d/1LYqyFyzBhrILPoD7MdQbWwD4_jPfFDOQhW4O9mxjH3I/
**  
**   Afiliados 2
**  
** Ajustar para ser executado uma vez a cada dia
*****************************************************************************/

SPREADSHEET_ID = "1LYqyFyzBhrILPoD7MdQbWwD4_jPfFDOQhW4O9mxjH3I";

// SpreadSheet header
var SHEET_REPORT_HEADER = [
"Ads ID",
"Campaign Name", 
"Campaign ID",
"Disapproval Reason"
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

