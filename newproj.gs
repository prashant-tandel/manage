function isCurrentUser(ss, name, status)
{
  if ((name == ss.getActiveCell().getValue()) && 
      (status != "In Review"))
  {
    return true;
  }
  return false;
}

/**
  Check this for color codes:
  https://www.color-hex.com/color/c3cafb
**/
function setBgColor(tmp, bgcolor)
{
  if (bgcolor == true)
  {
    tmp.setBackgroundRGB(41,211,235);
    tmp.setFontColor("black")
  }
  else
  {
    tmp.setBackgroundRGB(235,179,41);
    tmp.setFontColor("black")
  }
}

function updateTimelineExt()
{
  /////////// CONSTANTS /////////////
  var REF_SHEET = "gva_nov_4";
  
  var COL_NAME_IDX = 6;
  var COL_ID_IDX   = 1;
  var COL_EST_IDX  = 5;
  var COL_STS_IDX  = 10;
  var COL_TTL_IDX  = 4;
  var COL_PRI_IDX  = 8;
  var MAX_ROW_CNT  = 100;
  var ROW_START_OFFSET = 2;

  var START_ROW = 1;
  var START_COL = 1;
  var ROW_COUNT = MAX_ROW_CNT;
  var COL_COUNT = 15;
  ///////////////////////////////////
  var useHyperLink = true;
  var includeTitle = false;
  var includePriority = true;
  ///////////////////////////////////
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(REF_SHEET);
  var values = sheet.getSheetValues(START_ROW, START_COL, ROW_COUNT, COL_COUNT);
  var count = 0;
  var bgcolor = true;
  var statusFilter = [COL_STS_IDX, "In Review"];
  
  var baselink = "https://<yourcompany>.atlassian.net/browse/";

  ROW_START_OFFSET = ss.getActiveCell().getRow() + 1;
  ss.getActiveSheet().getRange(ROW_START_OFFSET, ss.getActiveCell().getColumn(), MAX_ROW_CNT).clear();
  
  for (var i = 0; i < MAX_ROW_CNT; i++)
  {
    if (isCurrentUser(ss, values[i][COL_NAME_IDX], values[i][COL_STS_IDX]) == true)
    {
      for (var j = 0; j < values[i][COL_EST_IDX]; j++)
      {
        var tmp = ss.getActiveSheet().getRange(count + ROW_START_OFFSET, ss.getActiveCell().getColumn());
        var issueTitle = "";
        var priority = "";
        
        if (includePriority == true)
        {
          priority = " (" + values[i][COL_PRI_IDX].slice(0, 1) + ")";
        }
        if (includeTitle == true)
        {
          issueTitle = ": " + values[i][COL_TTL_IDX];
        }

        if (useHyperLink == true)
        {
          var formula = "=HYPERLINK(" + "\"" + baselink + values[i][COL_ID_IDX] + "\"" + "," + "\"" + values[i][COL_ID_IDX] + priority + issueTitle + "\"" + ")";
          tmp.setFormula(formula);
        }
        else
        {
          tmp.setValue(values[i][COL_ID_IDX] + priority + issueTitle);
        }

        setBgColor(tmp, bgcolor);
        
        count++;
      }
      if (j != 0)
      {
        if (bgcolor == true)
        {
          bgcolor = false;
        }
        else
        {
          bgcolor = true;
        }
      }
    }
  }
}

function updateAll() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('C6').activate();
  updateTimelineExt();
  spreadsheet.getRange('D6').activate();
  updateTimelineExt();
  spreadsheet.getRange('E6').activate();
  updateTimelineExt();
  spreadsheet.getRange('F6').activate();
  updateTimelineExt();
  spreadsheet.getRange('G6').activate();
  updateTimelineExt();
  spreadsheet.getRange('H6').activate();
  updateTimelineExt();
  spreadsheet.getRange('I6').activate();
  updateTimelineExt();
  spreadsheet.getRange('J6').activate();
  updateTimelineExt();
  spreadsheet.getRange('K6').activate();
  updateTimelineExt();
  spreadsheet.getRange('L6').activate();
  updateTimelineExt();

};
