function isKeyExists(keyVal)
{
  var row = 1;
  var key_col = 2;
  do
  {
    var cell = SpreadsheetApp.getActiveSheet().getRange(row, key_col);
    
    if (cell.getValue() == keyVal)
    {
      return {found: true, row_num: row};
    }
    row++;
  }
  while(cell.isBlank() == false);
  
  return {found: false, row_num: row-1};
}

function updateTicketRow(j_issues, row_num, is_new)
{
  var i;
  var colData = [
    j_issues.fields.issuetype.name,
    j_issues.key,
    j_issues.id,
    null,
    j_issues.fields.summary,
    null,
    null,
    j_issues.fields.assignee.name,
    null,
    j_issues.fields.priority.name,
    null,
    j_issues.fields.status.name,
    null,
    null,
    null,
    null,
    null,
    null
  ];
  
  for (i = 0; i <= colData.length; i++)
  {
    if (colData[i] != null)
    {
      SpreadsheetApp.getActiveSheet().getRange(row_num, i+1).setValue(colData[i]);
      if (is_new == false)
      {
        SpreadsheetApp.getActiveSheet().getRange(row_num, i+1).setBackgroundRGB(10, 150, 10);
      }
      else
      {
        SpreadsheetApp.getActiveSheet().getRange(row_num, i+1).setBackgroundRGB(10, 10, 150);
      }
    }
  } 
}

function updateSheetFromData(resp)
{
  var jobj = JSON.parse(resp);
  var j_startat = jobj.startAt;
  var j_maxresults = jobj.maxResults;
  var j_total = jobj.total;
  var j_issues = jobj.issues;
  var i;
  var ret;
  
  for (i = 0; i < j_total; i++)
  {
    ret = isKeyExists(j_issues[i].key);
    if (ret.found == true)
    {
      updateTicketRow(j_issues[i], ret.row_num, false);
    }
    else
    {
      //Browser.msgBox("Did not find the key " + j_issues[i].key);
      updateTicketRow(j_issues[i], ret.row_num, true);
    }
  }
}

function fetchJiraTickets()
{
  
  initJiraParameters(false);

  var base_url = getBaseUrl();
  var user_id  = getUserId();
  var api_key  = getApiKey();
  var jql      = "?jql=" + getSearchJql();
  var rest_url = "rest/api/latest/search";
  var fields_query = "?fields=issuetype,fixVersions,priority,assignee,status,summary";
  
  var final_url = base_url + rest_url + jql;
    
  var headers = {
    'Authorization' : 'Basic ' + Utilities.base64Encode(user_id + ':' + api_key),
    'Accept': 'application/json'
  };

  var params = {
    "method":"GET",
    "headers":headers
  };

  var response = UrlFetchApp.fetch(final_url, params);
  
  updateSheetFromData(response);
  
  Browser.msgBox("Script Completed");
}

function initJiraParameters(reInitAll)
{
  var BASE_URL;
  var USER_ID;
  var API_KEY;
  var JQL;
  
  BASE_URL = getBaseUrl();
  if ((BASE_URL == null) || (reInitAll == true))
  {
    BASE_URL = Browser.inputBox("Please enter base url");
    setBaseUrl(BASE_URL);
  }
  
  USER_ID = getUserId();
  if ((USER_ID == null) || (reInitAll == true))
  {
    USER_ID = Browser.inputBox("Please enter the user id");
    setUserId(USER_ID);
  }
  
  API_KEY = getApiKey();
  if ((API_KEY == null) || (reInitAll == true))
  {
    API_KEY = Browser.inputBox("Plase enter the API Token");
    setApiKey(API_KEY);
  }
  
  JQL = getSearchJql();
  if ((JQL == null) || (reInitAll == true))
  {
    JQL = Browser.inputBox("Please enter the jql string");
    setSearchJql(JQL);
  }
}

function updateJiraParams()
{
  initJiraParameters(true);
}

function userGetSearchJql()
{
  var jql = Browser.inputBox("Please enter the jql string");
  setSearchJql(jql);
}
