/** @OnlyCurrentDoc */
var QUOTE_SC = "\"";
var API = 'agile';
var API_VER = '1.0';
var API_RES_ISSUE = 'issue';
var API_RES_BOARD = 'board';

function parseJson(response)
{
  var activeCell = SpreadsheetApp.getActive().getActiveCell();
  var data = JSON.parse(response);
  return data;
}

function createuri(name, ver, res)
{
  var uri = 'rest' + '/' + name + '/' + ver + '/' + res;
  return uri;
}

function getIssue(issueId)
{
  var USERNAME = 'user@company.com';
  var PASSWORD = '<yourkey>';
  var BASEURL  = 'https://<company-1>.atlassian.net/';
  var BOARD = 137;
  
  var url = BASEURL + createuri('agile', '1.0', 'board/') + BOARD + '/' + 'issue' + '?fields=summary,assignee,status,priority,comment' + '&orderBy=status';
    
  var headers = {
    'Authorization' : 'Basic ' + Utilities.base64Encode(USERNAME + ':' + PASSWORD),
    'Accept': 'application/json'
  };

  var params = {
    "method":"GET",
    "headers":headers
  };

  var response = UrlFetchApp.fetch(url, params);
  return response;
}

function updateIssue()
{
  var column = 'A';
  var ref;
  var activeSheet = SpreadsheetApp.getActive();
  var activeCell = activeSheet.getActiveCell();
  var resp = getIssue(activeCell.getValue());
  var jObj = parseJson(resp);

  var maxRow = jObj.total;
  for(var row = 2; row <= maxRow; row++) {
    ref = 'A' + row;
    activeSheet.getRange(ref).setValue(jObj.issues[row-2].key);
    ref = 'B' + row;
    activeSheet.getRange(ref).setValue(jObj.issues[row-2].fields.summary);
    ref = 'C' + row;
    try {
      activeSheet.getRange(ref).setValue(jObj.issues[row-2].fields.assignee.key);
    } catch (e) {
      console.error('myFunction() yielded an error: ' + e);
      activeSheet.getRange(ref).setValue("null");
    }
    ref = 'D' + row;
    activeSheet.getRange(ref).setValue(jObj.issues[row-2].fields.status.name);
    ref = 'E' + row;
    activeSheet.getRange(ref).setValue(jObj.issues[row-2].fields.priority.name);
    ref = 'F' + row;
    totalComments = jObj.issues[row-2].fields.comment.total;
    if (totalComments > 0) {
      activeSheet.getRange(ref).setValue(jObj.issues[row-2].fields.comment.comments[totalComments-1].body);
    } else {
      activeSheet.getRange(ref).setValue("");
    }
  }

}

function myscript()
{
  var USERNAME = 'user@company.com';
  var PASSWORD = '<yourkey>';
  var BASEURL  = 'https://company-2.atlassian.net/'
  
  var url = BASEURL + createuri('agile', '1.0', 'board');
    
  var headers = {
    'Authorization' : 'Basic ' + Utilities.base64Encode(USERNAME + ':' + PASSWORD),
    'Accept': 'application/json'
  };

  var params = {
    "method":"GET",
    "headers":headers
  };

  var response = UrlFetchApp.fetch(url, params);

  parseJson(response);
}
