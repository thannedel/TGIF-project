var members = data.results[0].members;



var statistics = {
    "numberOfDem" : 0,
    "numberOfRep" : 0,
    "independents": 0,
    "totalNumber": 0,
    "repvotedwparty" : 0,
    "demvotedwparty" : 0,
    "indvotedwparty" : 0,
    "totalvotedwparty" : 0,
    "mostLoyal": [],
    "leastLoyal": [],
};


attendance()
most_loyal()
least_loyal()
glance()
//console.log(statistics);

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


         var sum1 = 0;
         var sum2 = 0;
         var sum3 = 0;
         for( i = 0; i < members.length; i++){
             if(members[i].party === "D"){
             sum1 += members[i].votes_with_party_pct;
         }
         
        
             if(members[i].party === "R"){
             sum2 += members[i].votes_with_party_pct;
         }
          if(members[i].party === "I"){
            sum3 += members[i].votes_with_party_pct;
        }
         
        }   
        statistics.demvotedwparty = (sum1/statistics.numberOfDem).toFixed(2);
    statistics.repvotedwparty = (sum2/statistics.numberOfRep).toFixed(2);
    if(statistics.independents===0){
        statistics.Indvotedwparty = 0;
    }
    else{
    statistics.Indvotedwparty = (sum3/statistics.independents).toFixed(2);
    }
    statistics.totalvotedwparty = ((sum1 + sum2 +sum3)/(statistics.numberOfDem + statistics.numberOfRep + statistics.independents )).toFixed(2);
    }
    function glance(){
    //glance table
    var repnum = document.getElementById("repnum");
    var repvote = document.getElementById("repvote");
    var demnum = document.getElementById("demnum");
    var demvote = document.getElementById("demvote"); 
    var Indnum = document.getElementById("Indnum");
    var Indvote = document.getElementById("Indvote");
    var totalnum = document.getElementById("totalnum");
    var totalvote = document.getElementById("totalvote");
   
    repnum.innerHTML = statistics.numberOfRep;
    repvote.innerHTML = statistics.repvotedwparty;
    demnum.innerHTML = statistics.numberOfDem;
    demvote.innerHTML = statistics.demvotedwparty;
    Indnum.innerHTML = statistics.independents;
    Indvote.innerHTML = statistics.Indvotedwparty;
    totalnum.innerHTML = statistics.totalNumber;
    totalvote.innerHTML = statistics.totalvotedwparty;
    }

   


   
   function least_loyal() {
    var listData = [];
    var listDataFiltered = [];
    
    for (var i = 0; i < members.length; i++) {
        var obj = {
            name: ""
            , num_total_votes: ""
            , perc_vote_wparty_pct: ""
        };
        
        obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
        obj.num_total_votes = members[i]["total_votes"];
        obj.perc_vote_wparty_pct = members[i]["votes_with_party_pct"];
        listData.push(obj);
    }
    
    listData.sort(function (obj1, obj2) {
        return obj1.perc_vote_wparty_pct - obj2.perc_vote_wparty_pct;
    });
    
    var ptn = members.length * (10 / 100);
    
    for (i = 0; i <= ptn; i++) {
        listDataFiltered.push(listData[i]);
    };
    console.log(listDataFiltered);
    statistics.leastLoyal = listDataFiltered;
}


bottomLoyalTable()
  function bottomLoyalTable(){
    for( i = 0; i < statistics.leastLoyal.length; i++){
    var row = document.createElement("tr");
    var fullName = statistics.leastLoyal[i].name;
    var totmissedVotes = statistics.leastLoyal[i].num_total_votes;
    var percMissedVotes = statistics.leastLoyal[i].perc_vote_wparty_pct;
    var cells = [fullName, totmissedVotes, percMissedVotes];
    console.log(cells)
    for(var j = 0; j < cells.length; j++ ){
        var tableColumns = document.createElement("td");
        console.log(cells[j])
        tableColumns.append(cells[j]);
        row.append(tableColumns);
    }

    document.getElementById("bottomLoyalBody").append(row);
   }
  
}

   



function most_loyal(){
    var listData = [];
    var listDataFiltered = [];
    
    for (var i = 0; i < members.length; i++) {
        var obj = {
            name: ""
            , num_total_votes: ""
            , perc_vote_wparty_pct: ""
        };
        
        obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
        obj.num_total_votes = members[i]["total_votes"];
        obj.perc_vote_wparty_pct = members[i]["votes_with_party_pct"];
        listData.push(obj);
    }
    
    listData.sort(function (obj1, obj2) {
        return obj2.perc_vote_wparty_pct - obj1.perc_vote_with_party_pct;
    });
    
    var ptn = members.length * (10 / 100);
    
    for (i = 0; i <= ptn; i++) {
        listDataFiltered.push(listData[i]);
    };
    console.log(statistics.mostLoyal);
    statistics.mostLoyal = listDataFiltered;

}


topLoyalTable()
    function topLoyalTable(){
    for( i = 0; i < statistics.mostLoyal.length; i++){
    var row = document.createElement("tr");
    var fullName =statistics.mostLoyal[i].name;
    var totmissedVotes =statistics.mostLoyal[i].num_total_votes;
    var percMissedVotes =statistics.mostLoyal[i].perc_vote_wparty_pct;
    var cells = [fullName, totmissedVotes, percMissedVotes];
    console.log(cells)
    for(var j = 0; j < cells.length; j++ ){
        var tableColumns = document.createElement("td");
        console.log(cells[j])
        tableColumns.append(cells[j]);
        row.append(tableColumns);
    }

    document.getElementById("topLoyalBody").append(row);
   }
  
}