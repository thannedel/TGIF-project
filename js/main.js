if (window.location.href.includes("senate")) {
  site = 'https://api.propublica.org/congress/v1/113/senate/members.json';
}
if (window.location.href.includes("house")) {
  site = 'https://api.propublica.org/congress/v1/113/house/members.json';
}


fetching()

var members;

function fetching() {

  var fetchConfig =
    fetch(this.site, {
      method: "GET",
      headers: new Headers({
        "X-API-Key": 'IeE1wTU066tNtYjhtk94zacJt53Q0OTHRia9YAJw'
      })
    }).then(function (res) {
      if (res.ok)
        return res.json();
    }).then(function (json) {

      data = json;
      var spin = document.getElementById("loader").style.display = "none"




      //document.getElementById("tableBody").style.display = "none"
      members = data.results[0].members;

      createTable()

      statesbox()


    })
    .catch(function (error) {
      console.log(error);
    })
}

var mybutton = document.getElementById("myBtn");


window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
  /*document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;*/
}
var selectedState = 'All';
var selectedParties = [];



function createTable() {
  var filter1members = [];
  var finalmembers = [];

  //Περναμε πρωτο φιλτρο για parties
  members.forEach(function (member) {
    if (selectedParties.indexOf(member.party) != -1 || selectedParties.length == 0) { //[] selectedParties.length==0
      filter1members.push(member);
    }
  });
  //filter1members ειναι το αποτελεσμα του πρώτου φιλτρου
  //περνάμε 2 φιλτρο τα state.
  filter1members.forEach(function (member) {
    if (member.state == selectedState || selectedState == 'All') {
      finalmembers.push(member);
    }
  });
  //το αποτελεσμα είναι το finalmembers και με αυτό φτιάχνουμε τον πίνακα

  document.getElementById("tableBody").innerHTML = "";

  finalmembers.forEach(function (member) {
    var row = document.createElement("tr");
    var firstName = member.first_name;
    var lastName = member.last_name;
    var middleName = member.middle_name;

    if (member.middle_name === null) {
      middleName = "";
    }

    var party = member.party;
    var seniority = member.seniority;
    var link = document.createElement("a");
    link.setAttribute("href", member.url);
    link.innerHTML = firstName + " " + middleName + " " + lastName;
    var state = member.state;
    var votes = member.votes_with_party_pct + "% ";
    var columns = [link, party, state, seniority, votes];

    columns.forEach(function (cells) {

      var tableColumns = document.createElement("td");

      tableColumns.append(cells);
      row.append(tableColumns);

    });
    document.getElementById("tableBody").append(row);
  });

}


const hideBox = document.querySelector('#hide');
const hideBox2 = document.querySelector('#hideR');
const hideBox3 = document.querySelector('#hideI');


//Στα checkbox προσθέτουμε ή αφαιρούμε από το selectedParties το γράμμα που αντιστοιχεί στα κόμματα
//και κάθε φορά ξαναπερνάμε τα φιλτρα και φτιάχνουμε τον πίνακα

hideBox.addEventListener('change', function (e) {
  if (hideBox.checked) {
    selectedParties.push('D');
  } else {
    var index = selectedParties.indexOf('D');
    if (index != -1) selectedParties.splice(index, 1);

  }
  createTable();
  console.log(selectedParties);
});

hideBox2.addEventListener('change', function (e) {
  if (hideBox2.checked) {
    selectedParties.push('R');

  } else {
    var index = selectedParties.indexOf('R');
    if (index != -1) selectedParties.splice(index, 1);

  }
  createTable();
  console.log(selectedParties);
});

hideBox3.addEventListener('change', function () {
  if (hideBox3.checked) {
    selectedParties.push('I');
  } else {
    var index = selectedParties.indexOf('I');
    if (index != -1) selectedParties.splice(index, 1);
  }
  createTable();
});


function statesbox() {
  var statesArray = [];

  //console.log(statesArray);
  for (i = 0; i < members.length; i++) {
    if (statesArray.indexOf(members[i].state) == -1) {
      statesArray.push(members[i].state);

    }
  }
  statesArray.sort();
  for (var j = 0; j < statesArray.length; j++) {
    var option = document.createElement("option");
    option.classList.add("stateOptions");
    option.setAttribute("value", statesArray[j]);
    option.innerHTML = statesArray[j];
    var dropDownOptions = document.getElementById("dropDownBody")
    dropDownOptions.appendChild(option);
  }

}

const checkBox = document.querySelector('#dropDownBody');
checkBox.addEventListener("change", function () {
  //console.log(checkBox.value);
  selectedState = checkBox.value;
  createTable();
});
