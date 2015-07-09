
Data = new Mongo.Collection("data");
State = new Mongo.Collection("state");

var newestRecord = {};

  // This code only runs on the client
var currentState = function () {
        return State.findOne({}) || {};
    };

Template.body.helpers({
    data: function() {
        return Data.find({});
    },
    
    lightState: function () {
        return currentState().light;
    },
    waterState: function () {
        return currentState().water;
    },
    tempState: function () {
        return currentState().temp;
    },
    humidityState: function () {
        return currentState().hum;
    }
});
  Template.body.events({
    "click #lightOn": function (event) {
    // This function is called when the new task form is submitted
    Meteor.call('lightOn', function (error, result) {
        if (!result[0]) {
            alert(result[1]);
        }
    });
},
"click #lightOff": function (event) {
    // This function is called when the new task form is submitted
    Meteor.call('lightOff', function (error, result) {
        if (!result[0]) {
            alert(result[1]);
        }
    });
},
"click #waterOn": function (event) {
    // This function is called when the new task form is submitted
    Meteor.call('waterOn', function (error, result) {
        if (!result[0]) {
            alert(result[1]);
        }
    });
}

});

  Template.body.rendered = function() {
        var chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "none",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "dataDateFormat": "YYYY-MM-DD",
            "valueAxes": [{
                "id":"v1",
                "axisAlpha": 0,
                "position": "left"
            }, {
                "id":"light",
                "axisAlpha": 0,
                "position": "right",
                "minimum" : 0,
                "maximum": 1
            }],
            "graphs": [{
                "id": "light",
                 "balloonText": "Licht: [[y]]",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "fillToAxis" : "dateAxis",
                "fillAlphas": 0.3,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": "#FCD202",
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "light",
                "valueAxis" : "light"
            },{
                "id": "temp",
                 "balloonText": "Temperatur: [[y]]°",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor" : '#C9610C',
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "temp"
            },{
                "id": "hum",
                 "balloonText": "Luftfeuchtigkeit: [[y]]%",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor" : "#34A7E0",
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "hum"
            }],
            "categoryField": "createdAt",
            "categoryAxis": {
                "id":"dateAxis",
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true,
                "position": "top",
                "minPeriod" :"ss"
            },
            "export": {
                "enabled": true,
                "libs": {
                    "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                }
            },
            "dataProvider": []
            
        });

      var cursor = Data.find({});
      lastDraw = 0;
      cursor.observe({
        'added': function () {
//            if (!DataSubscription.ready()) return
                chart.dataProvider = cursor.map(function(item) {
                    return {
                        createdAt: item.createdAt,
                        light: item.light,
                        water: item.water,
                        temp: item.temp,
                        hum: item.hum

                    };
                });
            if (lastDraw !== Math.floor(Date.now() / 1000)) {
                chart.validateData();
            }
            lastDraw = Math.floor(Date.now() / 1000);
            return true;
        }
    })

};
