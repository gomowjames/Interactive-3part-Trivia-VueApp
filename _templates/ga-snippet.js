Vue.use( VueAnalytics, {
  // [Required] The name of your app as specified in Google Analytics.
  appName: 'AT&T Friends',
  // [Required] The version of your app.
  appVersion: '1.2.0',
  // [Required] Your Google Analytics tracking ID.
//   trackingId: 'UA-36950697-12',
  trackingId: 'UA-36950697-10',
	debug: true,	
/*
	debug: {
		sendHitTask: process.env.NODE_ENV === 'production'
	},
*/

/*   vueRouter: router, */ // Pass the router instance to automatically sync with router (optional)
  
  trackPage: true, // Whether you want page changes to be recorded as pageviews (website) or screenviews (app), default: false
  
  createOptions: { // Optional, Option when creating GA tracker, ref: https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
    siteSpeedSampleRate: 10,
    queueTime: 500,
	},
	
  // Global Dimensions and Metrics can optionally be specified.
  globalDimensions: [
/*
    { dimension: 1, value: 'FirstDimension' },
    { dimension: 2, value: 'SecondDimension' }
*/
    // Because websites are only 2D, obviously. WebGL? What's that?
  ],

  globalMetrics: [
/*
    { metric: 1, value: 'MyMetricValue' },
    { metric: 2, value: 'AnotherMetricValue' }
*/
  ]
})