let home_ctrl = angular.module('Home_Page', []);

const Key = {ENTER: 13};

const TimeMs = {
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000
};

home_ctrl.controller('homeCtrl', ['$scope','$http', ($scope, $http) => {

  $http.get('/loginCtrl').then((res) => {
      $scope.username = res.data;
  });

  $http.get('/avatar').then((res) => {
      $scope.hash = res.data;
  });

  $scope.keyUpFunc = () => {
    if(event.keyCode === Key.ENTER) {
     let q = $scope.input;
     search(q);
    }
  }

  $scope.click = () => {
    let q = $scope.input;
    search(q);
  }

  function search(query) {

      $.ajax({
          url: 'https://api.spotify.com/v1/search',
          method: 'GET',
          data: {
              q: query,
              type: "track"
          },
          success: function (result) {
              createList(result.tracks.items);
          },
          error: function (err) {
              $scope.message = 'Retrieving data failed!';
          }
      });
  }

  function createList(tracks) {

    if(tracks.length == 0) {
        $scope.message = 'No tracks available!';
    }
    for(track of tracks) {
      track.duration_ms = formatDuration(track.duration_ms);
    }
    $scope.tracks = tracks;
  }

  function formatDuration(duration) {
      let hours = Math.floor(duration / TimeMs.HOUR);
      let minutes = Math.floor(duration/TimeMs.MINUTE)%60;
      let seconds = Math.floor(duration/TimeMs.SECOND)%60;

      if (hours >=0 && hours < 10) {
          hours = '0' + hours;
          if(hours != '00') {
            return `${hours}:${minutes}:${seconds}`;
          }
      }

      if (minutes >=0 && minutes < 10) {
          minutes = '0' + minutes;
      }

      if (seconds >=0 && seconds < 10) {
          seconds = '0' + seconds;
      }

      return `${minutes}:${seconds}`;
  }

    $scope.clickToPlay = ($track) => {

    const $audio = $('audio')[0];
    $audio.src = $track.preview_url;

    $audio.load();
    $audio.play();
  }

}])
