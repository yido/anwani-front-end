/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil,$rootScope,addressDataFactory) {

    $scope.myAddressCount = 0;
    $scope.sharedAddressCount = 0;
    $scope.charts = [];
    addressDataFactory.getAddressForUser($rootScope.LoggedInUser.UserId).then(function (data) {
      $scope.myAddressCount = data.length;

      addressDataFactory.getSharedAddressForUser($rootScope.LoggedInUser.UserId).then(function (data) {
        $scope.sharedAddressCount = data.length;

        $scope.charts = [{
          color: pieColor,
          description: 'My addresses',
          stats: $scope.myAddressCount.toString(),
          icon: 'face',
        }, {
          color: pieColor,
          description: 'Shared addresses',
          stats: $scope.sharedAddressCount.toString(),
          icon: 'refresh',
           }
        ];

        loadPieCharts();
        updatePieCharts();
      });
    });


    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);



    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(25, 90));
      });
    }


  }
})();