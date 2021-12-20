/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils',
        'knockout',
        'jquery',
        'ojs/ojarraydataprovider',
        'ojs/ojlabel',
        'ojs/ojselectsingle',
        'ojs/ojchart',
        'ojs/ojlistview'


      ],

//parametros de define y funciton deben match
 function(accUtils, ko,$, ArrayDataProvider) {
   
    function DashboardViewModel() {

      var graficos = this
      var url = "js/store_data.json";  //defines link to local data file

      graficos.val = ko.observable("pie");
      graficos.val = ko.observable("bar"); //dejamos el <> por defecto
      

         // chart type values array and ArrayDataProvider observable   
         //tipos
      var types = [
          { value: 'pie', label: 'Pie' },
          { value: 'bar', label: 'Bar' }
        ];
      
       graficos.chartTypes = new ArrayDataProvider(types, { keyAttributes: 'value' });

      // chart data array and  ArrayDataProvider observable
      //datos

      var chartData = [
        { "id": 0, "series": "Baseball", "group": "Group A", "value": 42 },
        { "id": 1, "series": "Baseball", "group": "Group B", "value": 34 },
        { "id": 2, "series": "Bicycling", "group": "Group A", "value": 55 },
        { "id": 3, "series": "Bicycling", "group": "Group B", "value": 30 },
        { "id": 4, "series": "Skiing", "group": "Group A", "value": 36 },
        { "id": 5, "series": "Skiing", "group": "Group B", "value": 50 },
        { "id": 6, "series": "Soccer", "group": "Group A", "value": 22 },
        { "id": 7, "series": "Soccer", "group": "Group B", "value": 46 }
      ];

      graficos.chartDataProvider = new ArrayDataProvider(chartData, { keyAttributes: 'id' });  


      graficos.activityDataProvider = ko.observable();
      // Get Activities objects from file using jQuery method and a method to return a Promise
      
      //metodo que recibe una variable url y metodo then para leer 
      $.getJSON(url).then(function(data) {

        // Create variable for Activities list and populate using key attribute fetch
    var activitiesArray = data;
            graficos.activityDataProvider(new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));
      }
); 









      

      //-----------------------------------------------------------
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
