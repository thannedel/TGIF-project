if (window.location.href.includes("senate")) {
  site = "https://api.propublica.org/congress/v1/113/senate/members.json";
}
if (window.location.href.includes("house")) {
  site = "https://api.propublica.org/congress/v1/113/house/members.json";
}
fetching();
function fetching() {
  const fetchConfig = fetch(this.site, {
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
      const members = data.results[0].members;
      let ptn = Math.round((members.length * (10 / 100)));
      statistics.ptn = ptn;
      createMembersObject(members)
      attendance(members);
      let spin = document.getElementById("loader").style.display = "none"
    })
    .catch(function (error) {
      console.log(error);
    });
}
var mybutton = document.getElementById("myBtn");


window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

const statistics = {
  demGlance: {
    numberOfDem: 0,
     demvotedwparty: 0,
  },
  repGlance: {
    numberOfRep: 0,
    repvotedwparty: 0,
  },
  indGlance:{
    independents: 0,
    indvotedwparty:0
  },
  totalGlance: {
    totalPoliticiansNumber: 0,
    totalvotedwparty: 0,
  },
  ptn: "",             // 10% of members
  membersObj: [],
  leastEngagedMostLoyal: [],
  mostEngagedLeastLoyal:[]
};


function attendance(members) {
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  for (let i = 0; i < members.length; i++) {
    if (members[i].party === "D") {
      statistics.demGlance.numberOfDem++;
      sum1 += members[i].votes_with_party_pct;
    } else if (members[i].party === "R") {
      statistics.repGlance.numberOfRep++;
      sum2 += members[i].votes_with_party_pct;
    } else {
      statistics.indGlance.independents++;
      sum3 += members[i].votes_with_party_pct;
    }
  }
  statistics.totalGlance.totalPoliticiansNumber = members.length;
  statistics.demGlance.demvotedwparty = (sum1 / statistics.demGlance.numberOfDem).toFixed(2);
  statistics.repGlance.repvotedwparty = (sum2 / statistics.repGlance.numberOfRep).toFixed(2);
  // check for undefined
  if (statistics.indGlance.independents === 0) {
    statistics.indGlance.indvotedwparty = 0;
    statistics.totalGlance.totalvotedwparty =
      ((statistics.demGlance.demvotedwparty * statistics.demGlance.numberOfDem +
        statistics.repGlance.repvotedwparty * statistics.repGlance.numberOfRep)
        / (statistics.totalGlance.totalPoliticiansNumber)).toFixed(2);   // weight average
   } else {
    statistics.indGlance.indvotedwparty = (sum3 / statistics.indGlance.independents).toFixed(2);
    statistics.totalGlance.totalvotedwparty =
      ((statistics.demGlance.demvotedwparty * statistics.demGlance.numberOfDem +
        statistics.repGlance.repvotedwparty * statistics.repGlance.numberOfRep
        + statistics.indGlance.indvotedwparty * statistics.indGlance.independents)
        / (statistics.totalGlance.totalPoliticiansNumber)).toFixed(2);  // weight average
  }
  
  glance();
}

function glance() {           //glance table
  document.getElementById("repnum").innerHTML = statistics.repGlance.numberOfRep;
  document.getElementById("repvote").innerHTML = statistics.repGlance.repvotedwparty;
  document.getElementById("demnum").innerHTML = statistics.demGlance.numberOfDem;
  document.getElementById("demvote").innerHTML = statistics.demGlance.demvotedwparty;
  document.getElementById("Indnum").innerHTML = statistics.indGlance.independents;
  document.getElementById("Indvote").innerHTML = statistics.indGlance.indvotedwparty;
  document.getElementById("totalnum").innerHTML = statistics.totalGlance.totalPoliticiansNumber;
  document.getElementById("totalvote").innerHTML = statistics.totalGlance.totalvotedwparty;
}

const createMembersObject = (members) => {
    const membersObj = members.map(member => {
        const obj = {};

        obj.name = member.first_name + " " + member.last_name;
        obj.num_missed_votes = member.missed_votes;
        obj.perc_missed_votes = member.missed_votes_pct;
        obj.num_total_votes = member.total_votes;
        obj.perc_vote_wparty_pct = member.votes_with_party_pct;
        obj.links = member.url;
        return obj;
        })
    statistics.membersObj = membersObj;
     if (window.location.href.includes("attendance")){
       leastEngagedFiltered(descendingOrder);
       mostEngagedFiltered(ascendingOrder);
     } else if (window.location.href.includes("loyalty")) {
       mostLoyalFiltered(descendingOrder);
       leastLoyalFiltered(ascendingOrder);
     }
  }

const descendingOrder = (membersObj, x) => {                             // descending order for leastEngaged and mostLoyal
   
    const sortedDescending = membersObj.slice().sort((a, b) => {      //use slice method, so that we keep the statistics.membersObj array unaffected
     return b[x] - a[x];                                    
    })
  
     let listDataFiltered = [];
  
  for (i = 0; i < sortedDescending.length; i++) {
    if (sortedDescending[i][x] >= sortedDescending[statistics.ptn][x]) {
      listDataFiltered.push(sortedDescending[i]);
    }
  }
  statistics.leastEngagedMostLoyal = listDataFiltered;
}

const ascendingOrder = (membersObj, x) => {
  const sortedAscending = membersObj.slice().sort((a, b) => {      //use slice method, so that we keep the statistics.membersObj array unaffected
     return a[x] - b[x];                                    
   })
    
  let listDataFiltered = [];
  
  for (i = 0; i < sortedAscending.length; i++) {
    if (sortedAscending[i][x] <= sortedAscending[statistics.ptn][x]) {
      listDataFiltered.push(sortedAscending[i]);
    }
  }
  statistics.mostEngagedLeastLoyal = listDataFiltered;
}

const createTable = (array,id, arg1, arg2) => {
   statistics[array].forEach(member => {
    let row = document.createElement('tr');
     row.innerHTML =
       `<td><a href=${member.links}>${member.name}</a></td>
        <td>${member[arg1]}</td>
        <td>${member[arg2]}</td>`;
    document.querySelector(id).appendChild(row);
  })
}

const leastEngagedFiltered = (callback) => {
   
  callback(statistics.membersObj, 'perc_missed_votes')
  createTable('leastEngagedMostLoyal','#leastEngagedBody','num_missed_votes','perc_missed_votes')
}
const mostLoyalFiltered = (callback) => {
 
    callback(statistics.membersObj,'perc_vote_wparty_pct')
    createTable('leastEngagedMostLoyal','#mostLoyalBody','num_total_votes','perc_vote_wparty_pct')
}

const mostEngagedFiltered = (callback) => {
   
  callback(statistics.membersObj, 'perc_missed_votes')
  createTable('mostEngagedLeastLoyal','#mostEngagedBody','num_missed_votes','perc_missed_votes')
}
const leastLoyalFiltered = (callback) => {
 
    callback(statistics.membersObj,'perc_vote_wparty_pct')
    createTable('mostEngagedLeastLoyal','#leastLoyalBody','num_total_votes','perc_vote_wparty_pct')
}
