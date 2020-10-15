/****************************************************************************
**
**  Sweet Leads Empreendimentos Digitais
**  https://sweetleads.com.br
**	felipe@sweetleads.com.br
**
**	GitHub
**	https://github.com/felipepradoSL/script_ads_disapproved
**
**  Insere nova aba na planilha de acordo com o mês
**  
**  Planilha com as campanhas que foram pausadas:
**  - https://docs.google.com/spreadsheets/d/1lL4sTacQFtlGS2vwpjmKSy6j4ppLvl84f5UfGkQywI4/
**  
**   SL Eduzz
**  
**  Ajustar para ser executado uma vez a cada mês
**
*****************************************************************************/

SPREADSHEET_ID = "1lL4sTacQFtlGS2vwpjmKSy6j4ppLvl84f5UfGkQywI4";

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

	var date = new Date();
	var mes = ["janeiro","fevereiro","março","abril","maio", "junho","julho","agosto","setembro","outubro", "novembro", "dezembro"];

	var activeSpreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);//open google sheets by ID (URL)
  var yourNewSheet = activeSpreadsheet.insertSheet(); // insert new sheet 
  yourNewSheet.setName(mes[date.getMonth()] + "/" + date.getFullYear()); //set name with current month and yeah 
  activeSpreadsheet.appendRow(SHEET_REPORT_HEADER); // append header
  activeSpreadsheet.moveActiveSheet(1); // move the new sheet to first position in the spreadsheet
  activeSpreadsheet.setActiveSheet(activeSpreadsheet.getSheets()[0]); // set new sheet as active
}
