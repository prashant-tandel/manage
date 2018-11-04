
function updateTimeline()
{
  /////////// CONSTANTS /////////////
  var REFSHEET = "Sheet18";
  var COL_NAME_IDX = 2;
  var COL_ID_IDX   = 0;
  var COL_EST_IDX  = 3;
  var MAX_ROW_CNT  = 30;
  var ROW_START_OFFSET = 2;
  ///////////////////////////////////
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(REFSHEET);
  var values = sheet.getSheetValues(1, 1, MAX_ROW_CNT, 4);
  var count = 0;
  var bgcolor = true;
  
  ss.getActiveSheet().getRange(2, ss.getActiveCell().getColumn(), MAX_ROW_CNT).clear();
  
  for (var i = 0; i < MAX_ROW_CNT; i++)
  {
    if (values[i][COL_NAME_IDX] == ss.getActiveCell().getValue())
    {
      for (var j = 0; j < values[i][COL_EST_IDX]; j++)
      {
        var tmp = ss.getActiveSheet().getRange(count + ROW_START_OFFSET, ss.getActiveCell().getColumn());
        
        tmp.setValue(values[i][COL_ID_IDX]);
        
        if (bgcolor == true)
        {
          tmp.setBackgroundRGB(150, 100, 100);
        }
        else
        {
          tmp.setBackgroundRGB(200, 200, 200);
        }
        count++;
      }
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
