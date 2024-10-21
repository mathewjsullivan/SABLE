let sableSheetInstance;

function CheckBonIverOrg() {

  let response = UrlFetchApp.fetch('https://boniver.org');

  let html = response.getContentText();

  let searchString = 'https://boniver.org/wp-content/themes/boniver_2024_V2/assets/background/';
  let index = html.search(searchString);

  if (index >= 0) {
    let pos = index + searchString.length
    let substring = html.substring(pos, pos + 10);
    let end = substring.search(".jpg");
    let image = substring.substring(0,end+4);
    if(getLastImageName() != image) { 
      addNewImage(image);
    }
  }
}

function getSableSheet() { 

  if(sableSheetInstance == null) { 
    let sableSheetId = "1CTymMsghsqvBCphcRztC533Qxr_Darr3p-jU7_CgKWg";
    sableSheetInstance = SpreadsheetApp.openById(sableSheetId);
  }
  return sableSheetInstance;
}

function getLastImageName() { 
  let sableSheet = getSableSheet();
  return sableSheet.getSheetByName("SABLE").getSheetValues(sableSheet.getLastRow(), 1, 1, 1)[0][0]
}

function addNewImage(imageName) {
  let sableSpreadSheet = getSableSheet();
  let sableSheet = sableSpreadSheet.getSheetByName("SABLE")
  let targetRow = sableSheet.getLastRow() + 1;
  let targetRange = sableSheet.getRange("A" + targetRow + ":B" + targetRow);
  targetRange.getCell(1,1).setValue(imageName);
  targetRange.getCell(1,2).setValue(new Date());
}



