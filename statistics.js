var members = data.results[0].members;


var statistics = {
    "numberOfDem" : 0,
    "numberOfRep" : 0,
    "independents": 0,
    "totalNumber": 0,
    "repvotedwparty" : 0,
    "demvotedwparty" : 0,
    "totalvotedwparty" : 0,
    "leastEngaged": [],
    "mostEngaged": [],
};
attendance()
least_engaged()
most_engaged()

console.log(statistics);

/*var democrats = [];
var republicans = [];

var independents = [];

var votesWithParty = [];
var votesWithoutParty = [];

var repAver = [];
var demAver = [];*/

function attendance() {
    for (var i = 0; i < members.length; i++) {
        if (members[i].party === "D") {
            statistics.numberOfDem++;
        } 
        else if (members[i].party === "R") {
            statistics.numberOfRep++;
        } 
        else {
            statistics.independents++;
       }
}
         statistics.totalNumber = statistics.numberOfDem + statistics.numberOfRep + statistics.independents;


         var sum1 = 0 ;
         var sum2 = 0;
         for( i = 0; i < members.length; i++){
             if(members[i].party === "D"){
             sum1 += members[i].votes_with_party_pct;
         }
         
        
             if(members[i].party === "R"){
             sum2 += members[i].votes_with_party_pct;
         }
         
         
        }   
        statistics.demvotedwparty = (sum1/statistics.numberOfDem).toFixed(2);
    statistics.repvotedwparty = (sum2/statistics.numberOfRep).toFixed(2);
    statistics.totalvotedwparty = ((sum1 + sum2)/(statistics.numberOfDem + statistics.numberOfRep)).toFixed(2);
    
    //glance table
    var repnum = document.getElementById("repnum");
    var repvote = document.getElementById("repvote");
    var demnum = document.getElementById("demnum");
    var demvote = document.getElementById("demvote"); 
    var totalnum = document.getElementById("totalnum");
    var totalvote = document.getElementById("totalvote");
   
    repnum.innerHTML = statistics.numberOfRep;
    repvote.innerHTML = statistics.repvotedwparty;
    demnum.innerHTML = statistics.numberOfDem;
    demvote.innerHTML = statistics.demvotedwparty;
    
    totalnum.innerHTML = statistics.totalNumber;
    totalvote.innerHTML = statistics.totalvotedwparty;
    

   
}


   function most_engaged() {
    var listData = [];
    
    
    for (var i = 0; i < members.length; i++) {
        var obj = {
            name: ""
            , num_missed_votes: ""
            , perc_missed_votes: ""
        };
        
        obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
        obj.num_missed_votes = members[i]["missed_votes"];
        obj.perc_missed_votes = members[i]["missed_votes_pct"];
        listData.push(obj);
    }
    
    listData.sort(function (obj1, obj2) {
        return obj1.perc_missed_votes - obj2.perc_missed_votes;
    });
    
    var ptn = members.length * (10 / 100);
    var listDataFiltered = [];
    for (i = 0; i <= ptn; i++) {
        listDataFiltered.push(listData[i]);
    };
    console.log(listDataFiltered);
    statistics.mostEngaged = listDataFiltered;




    
   for( i = 0; i < listDataFiltered.length; i++){
    var row = document.createElement("tr");
    var fullName = listDataFiltered[i].name;
    var totmissedVotes = listDataFiltered[i].num_missed_votes;
    var percMissedVotes = listDataFiltered[i].perc_missed_votes;
    var cells = [fullName, totmissedVotes, percMissedVotes];
    console.log(cells)
    for(var j = 0; j < cells.length; j++ ){
        var tableColumns = document.createElement("td");
        console.log(cells[j])
        tableColumns.append(cells[j]);
        row.append(tableColumns);
    }

    document.getElementById("mostBody").append(row);
   }
  
}



function least_engaged() {
    var listData = [];
    
    
    for (var i = 0; i < members.length; i++) {
        var obj = {
            name: ""
            , num_missed_votes: ""
            , perc_missed_votes: ""
        };
        
        obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
        obj.num_missed_votes = members[i]["missed_votes"];
        obj.perc_missed_votes = members[i]["missed_votes_pct"];
        listData.push(obj);
    }
    
    listData.sort(function (obj1, obj2) {
        return obj2.perc_missed_votes - obj1.perc_missed_votes;
    });
    
    var ptn = members.length * (10 / 100);
    var listDataFiltered = [];
    for (i = 0; i <= ptn; i++) {
        listDataFiltered.push(listData[i]);
    };
    console.log(listDataFiltered);
    statistics.leastEngaged = listDataFiltered;




    
        
   for( i = 0; i < listDataFiltered.length; i++){
    var row = document.createElement("tr");
    var fullName = listDataFiltered[i].name;
    var totmissedVotes = listDataFiltered[i].num_missed_votes;
    var percMissedVotes = listDataFiltered[i].perc_missed_votes;
    var cells = [fullName, totmissedVotes, percMissedVotes];
    console.log(cells)
    for(var j = 0; j < cells.length; j++ ){
        var tableColumns = document.createElement("td");
        console.log(cells[j])
        tableColumns.append(cells[j]);
        row.append(tableColumns);
    }

    document.getElementById("leastBody").append(row);
   }
  
}






