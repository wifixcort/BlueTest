angular.module('app.controllers', ['ngCordovaBluetoothLE'])

	.controller('blueTestCtrl', function($scope, $state, $rootScope, $cordovaBluetoothLE) {
		$rootScope.devices = {};
		$scope.errors_list = [];

		$scope.goToDevice = function(device) {
			$state.go("device", {address:device.address});
		};

		$scope.isEmpty = function() {
			if (Object.keys($rootScope.devices).length === 0) {
				return true;
			}
			return false;
		};

		$rootScope.initialize = function() {
			var params = {request:true};

			console.log("Initialize : " + JSON.stringify(params));

			$cordovaBluetoothLE.initialize(params).then(null, null, function(obj) {
				console.log("Initialize Success : " + JSON.stringify(obj));

			});
		};

		$rootScope.isInitialized = function() {
			console.log("Is Initialized");


			$cordovaBluetoothLE.isInitialized().then(function(obj) {
				console.log("Is Initialized Success : " + JSON.stringify(obj));
			});
		};

		$rootScope.enable = function() {
			console.log("Enable");

			$cordovaBluetoothLE.enable().then(null, function(obj) {
				console.log("Enable Error : " + JSON.stringify(obj));
			});
		};

		$rootScope.isEnabled = function() {
			console.log("Is Enabled");

			$cordovaBluetoothLE.isEnabled().then(function(obj) {
				console.log("Is Enabled Success : " + JSON.stringify(obj));
			});
		};

		$rootScope.disable = function() {
			console.log("Disable");


			$cordovaBluetoothLE.disable().then(null, function(obj) {
				console.log("Disable Error : " + JSON.stringify(obj));
			});
		};

		$rootScope.startScan = function() {
			console.log("Initialising Scan");
			var params = {
				services:[],
				allowDuplicates: false,
				scanMode: bluetoothle.SCAN_MODE_LOW_POWER,
				matchMode: bluetoothle.MATCH_MODE_STICKY,
				matchNum: bluetoothle.MATCH_NUM_ONE_ADVERTISEMENT,
				//callbackType: bluetoothle.CALLBACK_TYPE_FIRST_MATCH,
				//scanTimeout: 15000,
			};

			console.log("Start Scan : " + JSON.stringify(params));

			$cordovaBluetoothLE.startScan(params).then(function(obj) {
				console.log("Start Scan Auto Stop : " + JSON.stringify(obj));
			}, function(obj) {
				console.log("Start Scan Error : " + JSON.stringify(obj));
			}, function(obj) {
				console.log("Start Scan Success : " + JSON.stringify(obj));

				addDevice(obj);
			});
		};

		$rootScope.isScanning = function() {
			console.log("Is Scanning");

			$cordovaBluetoothLE.isScanning().then(function(obj) {
				console.log("Is Scanning Success : " + JSON.stringify(obj));
			});
		};

		
		$rootScope.stopScan = function() {
			console.log("Stop Scan");
			$cordovaBluetoothLE.stopScan().then(function(obj) {
				console.log("Stop Scan Success : " + JSON.stringify(obj));
			}, function(obj) {
				console.log("Stop Scan Error : " + JSON.stringify(obj));
			});
		};

		function addDevice(obj) {
			if (obj.status == "scanStarted") {
				return;
			}
			if ($rootScope.devices[obj.address] !== undefined) {
				return;
			}
			obj.services = {};
			$rootScope.devices[obj.address] = obj;
		}


	})
