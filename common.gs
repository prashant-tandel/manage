function getProp(key)
{
  return PropertiesService.getScriptProperties().getProperty(key);
}

function setProp(key, value)
{
  PropertiesService.getScriptProperties().setProperty(key, value);
}

function setUserId(idValue)
{
  setProp("USER_ID", idValue);
}

function getUserId()
{
  return getProp("USER_ID");
}

function setApiKey(keyValue)
{
  setProp("API_KEY", keyValue);
}

function getApiKey()
{
  return getProp("API_KEY");
}

function setBaseUrl(url)
{
  setProp("BASE_URL", url);
}

function getBaseUrl()
{
  return getProp("BASE_URL");
}

function setSearchJql(jql)
{
  setProp("SEARCH_JQL", jql);
}

function getSearchJql()
{
  return getProp("SEARCH_JQL");
}

function test()
{
  var value = getProp("pht123");
  if (value == null)
  {
    value = Browser.inputBox("Please enter value");
  }
  else
  {
    Browser.msgBox(value);
  }
  SpreadsheetApp.getActiveSpreadsheet().getActiveCell().setValue(value)
}
