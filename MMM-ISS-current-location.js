/* global Module */

/* Magic Mirror
 * Module: ISS-current-location
 *
 * Module for the Magic Mirror created by Michael Teeuw http://michaelteeuw.nl
 * by Corne Roozemond http://lookintomylife.com
 * MIT Licensed.
 */

Module.register("MMM-ISS-current-location",{

	// Default module config.
	defaults: {
		initialLoadDelay: 2500, // 2.5 seconds delay
		retryDelay: 2500,
		updateInterval: 10000, // every 10 seconds
		//opennotify parameters
		apiBase: "http://api.open-notify.org/iss-now.json?"
	},

/*
	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},
	// Define styles.
	getStyles: function() {
		return ["clock_styles.css"];
	},
*/

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.scheduleUpdate(this.config.initialLoadDelay);
		this.latitude = null;
		this.longitude = null;
		this.timestamp = null;
		this.message = null;
		this.updateTimer = null;
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		// create a table for each row
		//fill each row with the data
		wrapper.innerHTML = this.message;
		return wrapper;
	},



	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		var self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function() {
			self.updateISS();
		}, nextLoad);
	},

	/* updateWeather(compliments)
	 * Requests new data from openweather.org.
	 * Calls processWeather on succesfull response.
	 */
	updateISS: function() {
		var self = this;
		var url = self.apiBase;
		var opennotifyRequest = new XMLHttpRequest();
		opennotifyRequest.open("GET", url, true);
		opennotifyRequest.onreadystatechange = function() {
			self.latitude = this.iss_position.latitude;
			self.longitude = this.iss_position.longitude;
			self.timestamp = this.timestamp;
			self.message = this.message;
			self.updateDom();
		};
	opennotifyRequest.send();
	}		
});
