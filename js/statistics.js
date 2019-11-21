if (window.location.href.includes("senate")) {
  site = "https://api.propublica.org/congress/v1/113/senate/members.json";
}
if (window.location.href.includes("house")) {
  site = "https://api.propublica.org/congress/v1/113/house/members.json";
}
fetching();

var members;

function fetching() {
  var fetchConfig = fetch(this.site, {
      method: "GET",
      headers: new Headers({
        "X-API-Key": "IeE1wTU066tNtYjhtk94zacJt53Q0OTHRia9YAJw"
      })
    })
    .then(function (res) {
      if (res.ok) return res.json();
    })
    .then(function (json) {
      data = json;

      members = data.results[0].members;
      var spin = document.getElementById("loader").style.display = "none"
      attendance();
      glance();
      if (window.location.href.includes("attendance")) {
        least_engaged();
        most_engaged();
        mostEngagedTable();
        leastEngagedTable();
      }
      if (window.location.href.includes("loyalty")) {
        most_loyal();
        least_loyal();
        bottomLoyalTable();
        topLoyalTable();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

var statistics = {
  numberOfDem: 0,
  numberOfRep: 0,
  independents: 0,
  totalNumber: 0,
  repvotedwparty: 0,
  demvotedwparty: 0,
  totalvotedwparty: 0,
  leastEngaged: [],
  mostEngaged: [],
  mostLoyal: [],
  leastLoyal: []
};

//console.log(statistics);

function attendance() {
  for (var i = 0; i < members.length; i++) {
    if (members[i].party === "D") {
      statistics.numberOfDem++;
    } else if (members[i].party === "R") {
      statistics.numberOfRep++;
    } else {
      statistics.independents++;
    }
  }
  statistics.totalNumber =
    statistics.numberOfDem + statistics.numberOfRep + statistics.independents;

  var sum1 = 0;
  var sum2 = 0;
  var sum3 = 0;
  for (i = 0; i < members.length; i++) {
    if (members[i].party === "D") {
      sum1 += members[i].votes_with_party_pct;
    }

    if (members[i].party === "R") {
      sum2 += members[i].votes_with_party_pct;
    }
    if (members[i].party === "I") {
      sum3 += members[i].votes_with_party_pct;
    }
  }
  statistics.demvotedwparty = (sum1 / statistics.numberOfDem).toFixed(2);
  statistics.repvotedwparty = (sum2 / statistics.numberOfRep).toFixed(2);
  if (statistics.independents === 0) {
    statistics.Indvotedwparty = 0;
  } else {
    statistics.Indvotedwparty = (sum3 / statistics.independents).toFixed(2);
  }
  statistics.totalvotedwparty = (
    (sum1 + sum2 + sum3) /
    (statistics.numberOfDem + statistics.numberOfRep + statistics.independents)
  ).toFixed(2);
}

function glance() {
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

function most_engaged() {
  var listData = [];

  for (var i = 0; i < members.length; i++) {
    var obj = {
      name: "",
      num_missed_votes: "",
      perc_missed_votes: ""
    };

    obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
    obj.num_missed_votes = members[i]["missed_votes"];
    obj.perc_missed_votes = members[i]["missed_votes_pct"];
    obj.links = members[i].url;
    listData.push(obj);
  }

  listData.sort(function (obj1, obj2) {
    return obj1.perc_missed_votes - obj2.perc_missed_votes;
  });

  var ptn = members.length * (10 / 100);
  var listDataFiltered = [];
  for (i = 0; i <= ptn; i++) {
    listDataFiltered.push(listData[i]);
  }
  console.log(listDataFiltered);
  statistics.mostEngaged = listDataFiltered;
}

function mostEngagedTable() {
  var listDataFiltered = statistics.mostEngaged;
  for (i = 0; i < listDataFiltered.length; i++) {
    var row = document.createElement("tr");
    var fullName = listDataFiltered[i].name;
    var link = document.createElement("a");
    link.setAttribute("href", listDataFiltered[i].links);
    link.innerHTML = fullName;
    var totmissedVotes = listDataFiltered[i].num_missed_votes;
    var percMissedVotes = listDataFiltered[i].perc_missed_votes;
    var cells = [link, totmissedVotes, percMissedVotes];
    console.log(cells);
    for (var j = 0; j < cells.length; j++) {
      var tableColumns = document.createElement("td");
      console.log(cells[j]);
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
      name: "",
      num_missed_votes: "",
      perc_missed_votes: ""
    };

    obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
    obj.num_missed_votes = members[i]["missed_votes"];
    obj.perc_missed_votes = members[i]["missed_votes_pct"];
    obj.links = members[i].url;
    listData.push(obj);
  }

  listData.sort(function (obj1, obj2) {
    return obj2.perc_missed_votes - obj1.perc_missed_votes;
  });

  var ptn = members.length * (10 / 100);
  var listDataFiltered = [];
  for (i = 0; i <= ptn; i++) {
    listDataFiltered.push(listData[i]);
  }
  console.log(listDataFiltered);
  statistics.leastEngaged = listDataFiltered;
}

function leastEngagedTable() {
  var listDataFiltered = statistics.leastEngaged;
  for (i = 0; i < listDataFiltered.length; i++) {
    var row = document.createElement("tr");
    var fullName = listDataFiltered[i].name;
    var link = document.createElement("a");
    link.setAttribute("href", listDataFiltered[i].links);
    link.innerHTML = fullName;
    var totmissedVotes = listDataFiltered[i].num_missed_votes;
    var percMissedVotes = listDataFiltered[i].perc_missed_votes;
    var cells = [link, totmissedVotes, percMissedVotes];
    console.log(cells);
    for (var j = 0; j < cells.length; j++) {
      var tableColumns = document.createElement("td");
      console.log(cells[j]);
      tableColumns.append(cells[j]);
      row.append(tableColumns);
    }

    document.getElementById("leastBody").append(row);
  }
}

function least_loyal() {
  var listData = [];
  var listDataFiltered = [];

  for (var i = 0; i < members.length; i++) {
    var obj = {
      name: "",
      num_total_votes: "",
      perc_vote_wparty_pct: ""
    };

    obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
    obj.num_total_votes = members[i]["total_votes"];
    obj.perc_vote_wparty_pct = members[i]["votes_with_party_pct"];
    obj.links = members[i].url;
    listData.push(obj);
  }

  listData.sort(function (obj1, obj2) {
    return obj1.perc_vote_wparty_pct - obj2.perc_vote_wparty_pct;
  });

  var ptn = members.length * (10 / 100);

  for (i = 0; i <= ptn; i++) {
    listDataFiltered.push(listData[i]);
  }
  console.log(listDataFiltered);
  statistics.leastLoyal = listDataFiltered;
}

function bottomLoyalTable() {
  var listDataFiltered = statistics.leastLoyal;
  for (i = 0; i < listDataFiltered.length; i++) {
    var row = document.createElement("tr");
    var fullName = listDataFiltered[i].name;
    var link = document.createElement("a");
    link.setAttribute("href", listDataFiltered[i].links);
    link.innerHTML = fullName;
    var totmissedVotes = listDataFiltered[i].num_total_votes;
    var percMissedVotes = listDataFiltered[i].perc_vote_wparty_pct;
    var cells = [link, totmissedVotes, percMissedVotes];
    console.log(cells);
    for (var j = 0; j < cells.length; j++) {
      var tableColumns = document.createElement("td");
      console.log(cells[j]);
      tableColumns.append(cells[j]);
      row.append(tableColumns);
    }

    document.getElementById("bottomLoyalBody").append(row);
  }
}

function most_loyal() {
  var listData = [];
  var listDataFiltered = [];

  for (var i = 0; i < members.length; i++) {
    var obj = {
      name: "",
      num_total_votes: "",
      perc_vote_wparty_pct: ""
    };

    obj.name = members[i]["first_name"] + " " + members[i]["last_name"];
    obj.num_total_votes = members[i]["total_votes"];
    obj.perc_vote_wparty_pct = members[i]["votes_with_party_pct"];
    obj.links = members[i].url;
    listData.push(obj);
  }

  listData.sort(function (obj1, obj2) {
    return obj2.perc_vote_wparty_pct - obj1.perc_vote_wparty_pct;
  });

  var ptn = members.length * (10 / 100);

  for (i = 0; i <= ptn; i++) {
    listDataFiltered.push(listData[i]);
  }
  console.log(listDataFiltered);
  statistics.mostLoyal = listDataFiltered;
}

function topLoyalTable() {
  var listDataFiltered = statistics.mostLoyal;
  for (i = 0; i < listDataFiltered.length; i++) {
    var row = document.createElement("tr");
    var fullName = listDataFiltered[i].name;
    var link = document.createElement("a");
    link.setAttribute("href", listDataFiltered[i].links);
    link.innerHTML = fullName;
    var totmissedVotes = listDataFiltered[i].num_total_votes;
    var percMissedVotes = listDataFiltered[i].perc_vote_wparty_pct;
    var cells = [link, totmissedVotes, percMissedVotes];
    console.log(cells);
    for (var j = 0; j < cells.length; j++) {
      var tableColumns = document.createElement("td");
      console.log(cells[j]);
      tableColumns.append(cells[j]);
      row.append(tableColumns);
    }

    document.getElementById("topLoyalBody").append(row);
  }
}