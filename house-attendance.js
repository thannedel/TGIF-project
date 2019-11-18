/*for(var i=0; i<members.length; i++){
    if(members[i].party ==="D"){
democrats.push("D");
    }
else {
    republicans.push("R");
}
    }

console.log(democrats.length);
console.log(republicans.length);
console.log(democrats);


//votes_with_party_pct

var sum = 0 ;
for( i = 0; i < members.length; i++){
    if(members[i].party === "D")
    sum += members[i].votes_with_party_pct;
}

console.log((sum/210).toFixed(2));

var sum = 0 ;
for( i = 0; i < members.length; i++){
    if(members[i].party === "R")
    sum += members[i].votes_with_party_pct;
}

console.log((sum/republicans.length).toFixed(2));

var engaged =[];

for(i = 0; i<members.length; i++){
    engaged.push(members[i].missed_votes);
}
function tenPctFounder(){
    var temp;
    for(i = 0; i<engaged.length; i++){
for( var j = i+1; j< engaged.length; j++){
    if( engaged[i]<engaged[j]){
    temp = engaged[i];
    engaged[i] = engaged[j];
    engaged[j] = temp;
    }
}
    
}
console.log(engaged);
}
*/

/*members.forEach(function(top){
    var row = document.createElement("tr");
    var firstName = table.first_name;
    var lastName = table.last_name;
    var middleName = table.middle_name;
    
    if (top.party === D) {
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
    })*/