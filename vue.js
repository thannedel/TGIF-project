/*var app = new Vue({
  el: "#app",
  data: {
    createTable: [],
    checkedParties: []
    //selected: [],
  },

  methods: {
    fetchPosts: function () {
      fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
          headers: {
            "X-API-Key": "IeE1wTU066tNtYjhtk94zacJt53Q0OTHRia9YAJw"
          }
        })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log("data", data);
          app.createTable = data.results[0].members;

          //app.posts.first_name = name;
        });
    }
  },
  created: function () {
    this.fetchPosts();
  }

});*/
/*computed: {
  filtered: function() {
    console.log(this.checkedParties);
    return this.createTable;
  }
}*/

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello all!",
    array: [1, 2, 3, 4, 5, 6],
    age: 18,
    posts: []
  },
  methods: {
    fetchPosts: function () {
      fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
          headers: {
            "X-API-Key": "IeE1wTU066tNtYjhtk94zacJt53Q0OTHRia9YAJw"
          }
        })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log("data", data);
          app.posts = data;

          //app.posts.first_name = name;
        });
    }
  },
  created: function () {
    this.fetchPosts();
  }
});

/*<div id="app">


  <input type="checkbox" value="republicans" v-model="checkedParties">
    <label for="republicans">Republicans</label>
    <input type="checkbox" value="democrats" v-model="checkedParties">
      <label for="democrats">Democrats</label>
      <input type="checkbox" value="independents" v-model="checkedParties">
        <label for="independents">Independents</label>

        <ul>
          <li v-for=check in checkedParties>{{ check }}</li>
        </ul>


        <table v-for="create in createTable">
          <tr>
            <td>{{ create.first_name + create.last_name }}</td>
            <td>{{ create.party }}</td>
            <td>{{ create.state }}</td>
            <td>{{ create.seniority }}</td>
            <td>{{ create.votes_with_party_pct }}</td>
          </tr>



        </table>*/