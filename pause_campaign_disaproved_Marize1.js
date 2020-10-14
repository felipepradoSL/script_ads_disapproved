/****************************************************************************
**
**  Sweet Leads Empreendimentos Digitais
**  https://sweetleads.com.br
**
**
**  Script verifica todos os anuncios que foram reprovados, pausa a campanha 
**  e insere as campanhas na planilha, após isso é enviado um email de alerta
**
**  
**  Planilha com as campanhas que foram pausadas:
**  - https://docs.google.com/spreadsheets/d/1WeF3988cGUVTDsEExxf2WOG8mS6gzcT-dTMEYZPocHY/
**  
**   MARIZE 1
**  
**
*****************************************************************************/


//arguments
ADS_CONDITIONS =
["CampaignStatus = ENABLED"
,"AdGroupStatus = ENABLED"
,"Status = ENABLED"
,"CombinedApprovalStatus = DISAPPROVED"
];

// change values
NOTIF_EMAIL = "afiliados@sweetleads.com.br" // email 
EMAIL_SUBJECT = "[GOOGLE ADS] - Anúncios REPROVADOS pausados" //subject

SPREADSHEET_ID = "1WeF3988cGUVTDsEExxf2WOG8mS6gzcT-dTMEYZPocHY";  //insert a new blank spreadsheet url 


// SpreadSheet header

var SHEET_REPORT_HEADER = [
"Ads ID",
"Campaign Name", 
"Campaign ID"
];


function main() {

  //prepareSpreadsheet(); // prepare spreadsheet and add header

  var results = getAds(ADS_CONDITIONS).map(pauseCampaign).map(saveSpreadsheet); //get campaings with ads disapproved, pause it and save in spreadsheet
  
  Logger.log("*************results****************");
  Logger.log(JSON.stringify(results))
  Logger.log("*************results****************");

  var shouldNotify = notNil(results) ? true : false; //check if exists campaing disapproved
  
  if(shouldNotify){//send email case exists campaign disapproved
    var emailBody = composeEmail(results)
    MailApp.sendEmail(NOTIF_EMAIL, EMAIL_SUBJECT, emailBody, { noReply: true });
  }

}

//check is not null
function notNil(xs){
  return xs.length && xs.length !== 0;
}


//get campaigns with ads disapproved
function getAds(conds) {

  var ads = [];
  
  var rawAdsIt = AdsApp.ads();
  
  var adsIt = conds
  .reduce(function(acc,cond){ return acc.withCondition(cond) }, rawAdsIt)
  .get();
  
  
  while(adsIt.hasNext()) {

    var current = adsIt.next();
    var campaign = current.getCampaign();
    var adsId = current.getId();

    var adData = { campaign: campaign }//objeto com a campanha
    adData['adsId'] = adsId;

    ads.push(adData);   

  }  

  return ads
}


// pause campaign
function pauseCampaign(obj){
  obj.campaign.pause();
  Utilities.sleep(2000);
  
  return obj;
}



function composeEmail(results){

  var currentAccount = AdsApp.currentAccount();
  var accountName = currentAccount.getName();
  var accountId = currentAccount.getCustomerId();

  var firstLine = "Conta: "+ accountName + " - " + accountId + " \n" + "\n" + "As seguintes campanhas tiveram anúncio REPROVADO e foram pausadas: "+ "\n";
  
  var body = results.reduce(function(acc,obj){
    var campaignName = obj.campaign.getName();

    //Logger.log(acc); 
    //Logger.log(campaignName); 
    
    return acc += "Campanha: " + campaignName + "\n"    
    
  }, firstLine);  
  
   var footer = "\n\nAlgumas informações da campanha: https://docs.google.com/spreadsheets/d/"+ SPREADSHEET_ID + "/ \n\n";

  
  return body + "" + footer;
}


//prepare spreadsheet
function prepareSpreadsheet() {

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);//open google sheets by ID (URL)
  var sheet = ss.getActiveSheet(); // select sheet actived
  sheet.clear(); //remove earlies alerts
  sheet.clearConditionalFormatRules(); // clear all conditional format rules in sheet
  sheet.appendRow(SHEET_REPORT_HEADER); // append header
}


// save spreadsheet
function saveSpreadsheet(results) {

var ss = SpreadsheetApp.openById(SPREADSHEET_ID);//open google sheets by ID (URL)
var sheet = ss.getActiveSheet(); // select sheet actived


var issues = [];

//push ads in array 
var campaignName = results.campaign.getName();
var campaignId = results.campaign.getId();
var adsId = results.adsId;

issues.push([
  adsId,
  campaignName,
  campaignId
  ]);  

var lastRow = sheet.getLastRow();

// write issues to sheet
var range = sheet.getRange(lastRow+1, 1, issues.length, SHEET_REPORT_HEADER.length);
range.setValues(issues);

return results
}

