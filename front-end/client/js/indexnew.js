﻿var vue = new Vue({
  el: '#products',
  data: {
    connections: [],
    mode: "normal",
    addStatus: true,
    clientName: "",
    topic: "",
    messagePrefix: "",
    messageNumber: 0,
    url: "http://localhost:8080"

  },
  methods: {
    idGen: function (connectionId) {
      return 'connection' + connectionId;
    },
    jump: function (role, connectionId) {
      if (role == "producer") {
        window.location = "Producer.html?id=" + connectionId;
      } else {
        window.location = "Consumer.html?id=" + connectionId;
      }

    },
    connProducer: function () {
      console.log("add");
      var name = prompt("Please input your client name", "");

      if (name != null) {
        if (name == "") {
          alert("please input a name!");
          return;
        }
        var topicName = prompt("Please input the topic name that you want to connect", "");
        this.topic = topicName;

        if (topicName != "" && topicName != null) {

          /*var id = parseInt(sessionStorage.getItem('id'))  + 1;
          var newConnection = {
            "connectionId": id,
            "connectionName": name,
            "role": "producer",
            "topic": topicName
          }
          var connections = JSON.parse(localStorage.getItem('connections'));
          connections.push(newConnection);
          localStorage.setItem('connections', JSON.stringify(connections));*/

          console.log("This!");
          $.ajax({
            url: /*this.url +*/ '/spring/producer/connect',
            method: 'GET',
            success: function (data) {
              console.log(data);
              var id = data;
              if(data != null)
              {
                $.ajax({
                  url: /*this.url +*/ '/spring/producer/setChannelName',
                  method: 'POST',
                  data: {
                    "id":id,
                    "name": name
                  },
                  success: function (data) {
                    console.log(data);
                    this.clientName = name;
                    var newConnection = {
                      "connectionId": id,
                      "connectionName": name,
                      "role": "producer",
                      "topic": topicName
                    }
                    var connections = JSON.parse(localStorage.getItem('connections'));
                    connections.push(newConnection);
                    localStorage.setItem('connections', JSON.stringify(connections));
                    window.location = "Producer.html?id=" + id;
                  },
                  error: function (error) {
                    console.log(error);
                  }
                })
              }
             
            },
            error: function (error) {
              console.log(error);
            }
          })

        }
      }


    },
    connConsumer: function () {
      var name = prompt("Please input your client name", "");

      if (name != null) {
        if (name == "") {
          alert("please input a name!");
          return;
        }
        var topicName = prompt("Please input the topic name that you want to subscribe", "");
        this.topic = topicName;

        if (topicName != "" && topicName != null) {

          /*var id = parseInt(sessionStorage.getItem('id'))  + 1;
          var newConnection = {
            "connectionId": id,
            "connectionName": name,
            "role": "consumer",
            "topic": topicName,
          }
          console.log(newConnection)
          var connections = JSON.parse(localStorage.getItem('connections'));
          connections.push(newConnection);
          localStorage.setItem('connections', JSON.stringify(connections));*/


          $.ajax({
            url: /*this.url +*/ '/spring/consumer/setChannelName',
            method: 'POST',
            data: {
              "name": name
            },
            success: function (data) {

              console.log(data);

              this.clientName = name;

              $.ajax({
                url: /*this.url + */'/spring/consumer/connect',
                method: 'GET',
                success: function (data) {
                  console.log(data);

                  var newConnection = {
                    "connectionId": data.id,
                    "connectionName": name,
                    "connectionRole": "consumer",
                    "topic": topicName
                  }
                  var connections = JSON.parse(localStorage.getItem('connections'));
                  connections.push(newConnection);
                  localStorage.setItem('connections', JSON.stringify(connections));
                  window.location = "Consumer.html?id=" + data.id;
                },
                error: function (error) {
                  console.log(error);
                }
              })
            },
            error: function (error) {
              console.log(error);
            }
          })

        }
      }
    },
  },
  mounted: function () {
    var self = this;
    var connections = JSON.parse(localStorage.getItem('connections'));
    if (connections != null) {
      for (var i = 0; i < connections.length; i++) {
        this.$set(this.connections, i, connections[i]);
      }
    } else {
      localStorage.setItem('connections', '[]');
    }
    sessionStorage.setItem('id', 1);
    /*$.ajax({
      url: self.url+'/topics',
      method: 'GET',
      success: function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          vue.$set(vue.topics, i, data[i]);
        }
      },
      error: function (error) {
        console.log(error);
      }
    })*/
  }
});