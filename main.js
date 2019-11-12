var members = data.results[0].members;

 members.forEach(function(table){
var row = document.createElement("tr");
var firstName = table.first_name;
var lastName = table.last_name;
var middleName = table.middle_name;

if (table.middle_name === null) {
  middleName = "";
}

var party = table.party;
var seniority = table.seniority;
var link = document.createElement("a");
         link.setAttribute("href", table.url);
link.innerHTML =  firstName + " " + middleName + " " + lastName;
var state = table.state;
var votes =  table.votes_with_party_pct + "% " ;
var columns = [link, party, state, seniority, votes];
 
columns.forEach(function(cells){
var tableColumns = document.createElement("td");
tableColumns.append(cells);
row.append(tableColumns);
});
document.getElementById("tableBody").append(row);
})
