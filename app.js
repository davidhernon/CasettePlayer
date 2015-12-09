if(Meteor.isClient)
{
	var casette = angular.module('casette',['angular-meteor']);

	casette.controller('casetteCtrl', function ($scope) {
		// Get the Object by ID
		var key1_pressed = false;
		var key2_pressed = false;
		var key3_pressed = false;
		var key4_pressed = false;
		var isPlaying = false;

		var key1, key2, key3, key4;

		var audio_files = ['tapeloop1.mp3', 'tapeloop2.mp3', 'tapeloop3.mp3'];
		$scope.selected_audio = 'tapeloop1.mp3';
		var audio;
		tape_audio = new Audio('tape_ff.wav');

		var casette = document.getElementById("casette");
		casette.addEventListener('load', function(){

			var svgDoc = casette.contentDocument;
			key1 = svgDoc.getElementById("key1");
			key2 = svgDoc.getElementById("key2");
			key3 = svgDoc.getElementById("key3");
			key4 = svgDoc.getElementById("key4");
			
		});

		$scope.play = function(){
			if(key1_pressed == false){
				key1_pressed == true;
				$scope.setBool(true, false, false, false);
			}else{
				key1_pressed == false;
				$scope.setBool(false, false, false, false);
			}
		}
		
		$scope.pause = function(){
			if(key2_pressed == false){
				key2_pressed == true;
				$scope.setBool(false, true, false, false);
			}else{
				key2_pressed == false;
				$scope.setBool(false, false, false, false);
			}
		}

		$scope.rew = function(){
			if(key3_pressed == false){
				key3_pressed == true;
				$scope.setBool(false, false, true, false);
			}else{
				key3_pressed == false;
				$scope.setBool(false, false, false, false);
			}
		}

		$scope.ff = function(){
			if(key4_pressed == false){
				key4_pressed == true;
				$scope.setBool(false, false, false, true);
			}else{
				key4_pressed == false;
				$scope.setBool(false, false, false, false);
			}
		}

		$scope.setBool = function(b1, b2, b3, b4) {
			if(b1 == true){
				key1.setAttribute("opacity", "0");
				$scope.player('play');
			}else{
				key1.setAttribute("opacity", "100");
			}
			if(b2 == true){
				key2.setAttribute("opacity", "0");
				$scope.player('stop');
			}else{
				key2.setAttribute("opacity", "100");
			}
			if(b3 == true){
				key3.setAttribute("opacity", "0");
				$scope.player('rew');
			}else{
				key3.setAttribute("opacity", "100");
			}
			if(b4 == true){
				key4.setAttribute("opacity", "0");
				$scope.player('ff');
			}else{
				key4.setAttribute("opacity", "100");
			}
		}

		$scope.player = function(state)
		{
			if(state == 'play')
			{
				audio = new Audio($scope.selected_audio);
				tape_audio.pause();
				audio.play();
				//playback at 1.0 rate
			}else if(state == 'stop')
			{
				audio.pause();
				tape_audio.pause();

			}else if(state == 'ff')
			{
				// playback at 2.0rate
				console.log('herexxxxx');
				audio.playbackRate = 2.0;
				// audio.gain.value = 0;
				audio.pause();
				tape_audio.play();
				tape_audio.loop = true;
			}else if(state == 'rew')
			{
				//plaback at -2.0 rate
				audio.playbackRate = -2.0;
				// audio.gain.value = 0;
				tape_audio.play();
				tape_audio.loop = true;
			}
		}

		$scope.setAudio = function(audio)
		{
			$scope.selected_audio = audio_files[audio];
		}
  });
}