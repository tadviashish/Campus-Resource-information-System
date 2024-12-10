function doGet(e) {
    // Check if 'e' is defined and has parameters
    if (!e || !e.parameter) {
        // Handle the case when 'e' is undefined
        return HtmlService.createHtmlOutput("Error: No parameters provided.");
    }
    
    let page = e.parameter.page;         
    if (page == null) page = "main";     
    var output = HtmlService.createTemplateFromFile(page); 
    return output.evaluate();  
}

function includeHeader() {
    return HtmlService.createTemplateFromFile("header.html").evaluate().getContent();
}

function myURL() {
    return ScriptApp.getService().getUrl();
}


function submitDT(obj) {
  try {
    var ss = SpreadsheetApp.openById("1blFPpzy3JZFyWU7V7hot-AL3Qp__USv-5E01LzZDGYE");
    var sheet6 = ss.getSheetByName("students");

    // Debug log
    Logger.log("Sheet6 found: " + sheet6);

    if (!sheet6) {
      Logger.log("Sheet6 not found!");
      return "Sheet 'sheet6' not found!";
    }

    var flag = 1;
    var lr = sheet6.getLastRow();

    // Loop through each row in sheet6 to search for student
    for (var i = 1; i <= lr; i++) {
      var name = sheet6.getRange(i, 1).getValue();
      var enrollment = sheet6.getRange(i, 2).getValue();
      var studentClass = sheet6.getRange(i, 5).getValue(); // Assuming class is in the 5th column

      if (name.toString().toLowerCase() === obj.toString().toLowerCase() || 
          enrollment.toString().toLowerCase() === obj.toString().toLowerCase()) {
        
        flag = 0;

        // Fetch the data from sheet6 columns
        var b0 = name;  
        var b1 = enrollment;      
        var b2 = sheet6.getRange(i, 3).getValue(); 
        var b3 = sheet6.getRange(i, 4).getValue(); 
        var b4 = sheet6.getRange(i, 5).getValue(); 
        var b5 = sheet6.getRange(i, 6).getValue(); 
        var b6 = sheet6.getRange(i, 7).getValue(); 
        var b7 = sheet6.getRange(i, 8).getValue(); 
        var b8 = sheet6.getRange(i, 9).getValue(); 

        // Construct the response table for student info
        var data = "<table>" +
                   "<tr><th colspan=2>Student Data Fetched.</th></tr>" +
                   "<tr><td>Name</td><td>" + b0 + "</td></tr>" +
                   "<tr><td>Enrollment No : </td><td>" + b1 + "</td></tr>" +
                   "<tr><td>Branch:</td><td>" + b2 + "</td></tr>" +
                   "<tr><td>Mobile : </td><td>" + b3 + "</td></tr>" +
                   "<tr><td>Class : </td><td>" + b4 + "</td></tr>" +
                   "<tr><td>Batch : </td><td>" + b5 + "</td></tr>" +
                   "<tr><td>Parent's Mobile : </td><td>" + b6 + "</td></tr>" +
                   "<tr><td>Email ID : </td><td>" + b7 + "</td></tr>" +
                   "<tr><td>GNU ID : </td><td>" + b8 + "</td></tr>" +
                   "</table><br>";

        var timetableSheet = ss.getSheetByName(studentClass);

        // Check if a matching timetable sheet exists
        if (timetableSheet) {
          var timetableData = timetableSheet.getDataRange().getValues();
          var timetable = "<h3>Timetable for " + studentClass + ":</h3><table border='1' style='border-collapse:collapse; width:100%;'>";

          // Loop through the timetable data and construct a table using a for loop
          for (var row = 0; row < timetableData.length; row++) { // Loop through all rows
            timetable += "<tr>";

            // Loop through each column (starting from 1 to skip the time column)
            for (var col = 0; col < timetableData[row].length; col++) {
              // Style for the timetable cells
              timetable += "<td style='border:1px solid black; padding:8px; text-align:center;'>" + timetableData[row][col] + "</td>";
            }

            timetable += "</tr>";
          }

          timetable += "</table>";
          data += timetable;
        } else {
          data += "<p>No timetable found for class " + studentClass + ".</p>";
        }

        return data;
      }
    }

    if (flag === 1) {
      Logger.log("No matching record found for: " + obj);
      return "No matching record found.";
    }
  } catch (e) {
    Logger.log("Error: " + e.toString());
    return "An error occurred: " + e.toString();
  }
}

function submitFData(obj) {
  try {
    var ss = SpreadsheetApp.openById("1blFPpzy3JZFyWU7V7hot-AL3Qp__USv-5E01LzZDGYE");
    var sheet = ss.getSheetByName("faculty");

    // Debug log
    Logger.log("Sheet found: " + sheet);

    if (!sheet) {
      Logger.log("Sheet 'sheet6' not found!");
      return "Sheet 'sheet6' does not exist.";
    }

    var flag = 1;
    var lr = sheet.getLastRow();

    // Loop through each row to search
    for (var i = 1; i <= lr; i++) {
      var enrollment = sheet.getRange(i, 1).getValue(); 
      var name = sheet.getRange(i, 2).getValue(); 

      if (name.toString().toLowerCase() === obj.toString().toLowerCase() || 
          enrollment.toString().toLowerCase() === obj.toString().toLowerCase()) {
        flag = 0;

        // Fetch the data from columns
        var b0 = sheet.getRange(i, 1).getValue(); 
        var b1 = sheet.getRange(i, 2).getValue();   
        var b2 = sheet.getRange(i, 3).getValue(); 
        var b3 = sheet.getRange(i, 4).getValue(); 
        var b4 = sheet.getRange(i, 5).getValue(); 
        var b5 = sheet.getRange(i, 6).getValue(); 
        var b6 = sheet.getRange(i, 7).getValue(); 
        // Construct the response table
        var data = "<table> <tr><th colspan=2>Data Fetched.</th></tr>" +
                   "<tr><td>ID</td><td>" + b0 + "</td></tr>" +
                   "<tr><td>Name : </td><td>" + b1 + "</td></tr>" +
                   "<tr><td>Department :</td><td>" + b2 + "</td></tr>" +
                   "<tr><td>Short Name : </td><td>" + b3 + "</td></tr>" +
                   "<tr><td>Email : </td><td>" + b4 + "</td></tr>" +
                   "<tr><td>Mobile No : </td><td>" + b5 + "</td></tr>" +
                   "<tr><td>Subject : </td><td>" + b6 + "</td></tr>" +
                   "</table>";
        return data;
      }
    }

    if (flag === 1) {
      Logger.log("No matching record found for: " + obj);
      return "No matching record found.";
    }
  } catch (e) {
    Logger.log("Error: " + e.toString());
    return "An error occurred: " + e.toString();
  }
}



// Fetch data for a specific floor and time slot
function getFloorData(timeSlot) {
  // const sheetName = "7IOT"; // Replace with your sheet name
  // const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
 
  var ss = SpreadsheetApp.openById("1blFPpzy3JZFyWU7V7hot-AL3Qp__USv-5E01LzZDGYE");
  var sheet = ss.getSheetByName("7IOT");
   const data = sheet.getDataRange().getValues();
  //  Logger.log(data);
  const groundFloorPrefix = "1NB0";
  const result = {
    classes: [],
    labs: []
  };

  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[today.getDay()];

  // Find the column for today's day
  const dayIndex = data[0].indexOf(currentDay);
  if (dayIndex === -1) return result; // Return empty if the day is not found

  // Find the row for the given time slot
  const timeRowIndex = data.findIndex(row => row[0] === timeSlot);
  if (timeRowIndex === -1) return result; // Return empty if time slot is not found

  const classData = data[timeRowIndex][dayIndex];
 Logger.log(classData);
  // Split multiple entries (if separated by commas) and categorize
  const entries = classData ? classData.split(',') : [];
  entries.forEach(entry => {
    if (entry.trim().startsWith(groundFloorPrefix)) {
      if (entry[5] === '0') {
        result.classes.push(entry.trim());
      } else {
        result.labs.push(entry.trim());
      }
    }
  });
 
  return result;

}

// Fetch students for a specific class
function getStudents(className) {
  const sheetName = "Students"; // Replace with the name of your student sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  const students = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === className) { // Class column
      students.push(data[i][0]); // Student name column
    }
  }

  return students;
}














