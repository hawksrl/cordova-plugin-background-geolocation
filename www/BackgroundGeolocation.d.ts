// Type definitions for cordova-plugin-mauron85-background-geolocation.
// Project: https://github.com/mauron85/cordova-plugin-background-geolocation
// Definitions by: Mauron85 (@mauron85)
// Definitions: https://github.com/mauron85/cordova-plugin-background-geolocation/blob/master/www/BackgroundGeolocation.d.ts

interface BackgroundGeolocationOptions {
    /** Set location provider @see PROVIDERS.md */
    locationProvider?: number,

    /**
     * Desired accuracy in meters.
     *
     * Possible values:
     *  BackgroundGeolocation.HIGH_ACCURACY
     *  BackgroundGeolocation.MEDIUM_ACCURACY
     *  BackgroundGeolocation.LOW_ACCURACY
     *  BackgroundGeolocation.PASSIVE_ACCURACY
     *
     * Note: Accuracy has direct effect on power drain. Lower accuracy = lower power drain.
     */
    desiredAccuracy?: number,

    /**
     * Stationary radius in meters. When stopped, the minimum distance the device
     * must move beyond the stationary location for aggressive background-tracking to engage.
     */
    stationaryRadius?: number,

    /**
     * When enabled, the plugin will emit sounds for life-cycle events of background-geolocation.
     */
    debug?: boolean,

    /**
     * The minimum distance (measured in meters) a device must move horizontally
     * before an update event is generated.
     */
    distanceFilter?: number,

    /**
     * Enable this in order to force a stop() when the application terminated
     * (e.g. on iOS, double-tap home button, swipe away the app).
     */
    stopOnTerminate?: boolean,

    /** Start background service on device boot. */
    startOnBoot?: boolean,

    /** The minimum time interval between location updates in milliseconds. */
    interval?: number,

    /** Fastest rate in milliseconds at which your app can handle location updates. */
    fastestInterval?: number,

    /**
     * Rate in milliseconds at which activity recognition occurs.
     * Larger values will result in fewer activity detections while improving battery life.
     */
    activitiesInterval?: number,

    /**
     * @deprecated Stop location updates, when the STILL activity is detected.
     */
    stopOnStillActivity?: boolean,

    /**
     * Enable/disable local notifications when tracking and syncing locations.
     */
    notificationsEnabled?: boolean,

    /**
     * Allow location sync service to run in foreground state.
     * Foreground state also requires a notification to be presented to the user.
     * (android only)
     */
    startForeground?: boolean,

    /** Custom notification title in the drawer. (android only) */
    notificationTitle?: string,

    /** Custom notification text in the drawer. (android only) */
    notificationText?: string,

    /** The accent color (hex triplet) to use for notification. (android only) */
    notificationIconColor?: string,

    /** The filename of a custom notification icon. (android only) */
    notificationIconLarge?: string,

    /** The filename of a custom notification icon. (android only) */
    notificationIconSmall?: string,

    /**
     * Activity type (ios only)
     *
     * Posible values:
     * "AutomotiveNavigation", "OtherNavigation", "Fitness", "Other"
     */
    activityType?: string,

    /**
     * Pauses location updates when app is paused. (ios only)
     */
    pauseLocationUpdates?: boolean,

    /**
     * Switch to less accurate significant changes and region monitory when in background.
     * (ios only)
     */
    saveBatteryOnBackground?: boolean,

    /** Server url where to send HTTP POST with recorded locations. */
    url?: string,

    /** Server url where to send fail to post locations. */
    syncUrl?: string,

    /** Specifies how many previously failed locations will be sent to server at once. */
    syncThreshold?: string,

    /** Optional HTTP headers sent along in HTTP request. */
    httpHeaders?: object,

    /** Limit maximum number of locations stored into db. */
    maxLocations?: number,

    /** Customization post template. */
    postTemplate?: object
}

interface BackgroundGeolocationError {
    code: number,
    message: string
}

interface PositionOptions {
    /** Maximum time in milliseconds device will wait for location. */
    timeout?:  number,
    /** Maximum age in milliseconds of a possible cached location that is acceptable to return. */
    maximumAge?:  number,
    /** if true and if the device is able to provide a more accurate position, it will do so. */
    enableHighAccuracy?: boolean
}

interface Location {
    /** ID of location as stored in DB (or null). */
    id: number,

    /**
     * Native provider reponsible for location.
     *
     * Possible values: "gps", "network", "passive" or "fused" */
    provider: string,

    /** Configured location provider. */
    locationProvider: number,

    /** UTC time of this fix, in milliseconds since January 1, 1970. */
    time: number,

    /** Latitude, in degrees. */
    latitude: number,

    /** Longitude, in degrees. */
    longitude: number,

    /** Estimated accuracy of this location, in meters. */
    accuracy: number,

    /**
     * Speed if it is available, in meteBackgroundGeolocationrs/second over ground.
     *
     * Note: Not all providers are capable of providing speed.
     * Typically network providers are not able to do so.
     */
    speed?: number,

    /** Altitude if available, in meters above the WGS 84 reference ellipsoid. */
    altitude: number,

    /** Bearing, in degrees. */
    bearing: number,

    /**
     * True if location was recorded by mock provider. (android only)
     *
     * Note: this property is not enabled by default!
     * You can enable it "postTemplate" configure option
     */
    isFromMockProvider?: boolean,

    /**
     * True if device has mock locations enabled. (android only)
     *
     * Note: this property is not enabled by default!
     * You can enable it "postTemplate" configure option
     */
    mockLocationsEnabled?: boolean
}

interface StationaryLocation extends Location {
    radius: number
}

interface Activity {
    /** Percentage indicating the likelihood user is performing this activity. */
    confidence: number,
    /** Type of the activity
     *
     * Possible values:
     * "IN_VEHICLE", "ON_BICYCLE", "ON_FOOT", "RUNNING", "STILL",
     * "TILTING", "UNKNOWN", "WALKING"
     */
    type: string
}

interface ServiceStatus {
    /** (true if service is running) */
    isRunning: boolean,
    /** (true if location services are enabled) */
    locationServicesEnabled: boolean,
    /**
     * authorization status
     *
     * Posible values:
     *  BackgroundGeolocation.NOT_AUTHORIZED
     *  BackgroundGeolocation.AUTHORIZED
     *  BackgroundGeolocation.AUTHORIZED_FOREGROUND
     */
    authorization: number
}

type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";

interface LogEntry {
    /** id of log entry as stored in db */
    id: number,
    /** timestamp in milliseconds since beginning of UNIX epoch */
    timestamp: number,
    /** log level */
    level: LogLevel,
    /** log message */
    message: string,
    /** recorded stacktrace (Android only, on iOS part of message) */
    stackTrace: string
}

interface BackgroundGeolocation {
    /**
     * Configure plugin.
     *
     * @param options
     * @param success
     * @param fail
     */
    configure(
        options: BackgroundGeolocationOptions,
        success?: () => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /** Start background geolocation. */
    start(): void;

    /** Stop background geolocation. */
    stop(): void;

    /**
     * One time location check to get current location of the device.
     *
     * Error codes:
     *  1. PERMISSION_DENIED
     *  2. LOCATION_UNAVAILABLE
     *  3. TIMEOUT
     *
     * @param success
     * @param fail
     * @param options
     */
    getCurrentLocation(
        success: (location: Location) => void,
        fail?: (error: BackgroundGeolocationError) => void,
        options?: PositionOptions
    ): void;

    /**
     * Returns current stationaryLocation if available. Null if not
     *
     * @param success
     * @param fail
     */
    getStationaryLocation(
        success: (location: StationaryLocation) => void,
        fail?: (error: BackgroundGeolocationError) => void,
    ): void;

    /**
     * Check status of the service
     *
     * @param success
     * @param fail
     */
    checkStatus(
        success: (status: ServiceStatus) => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;


    /**
     * Show app settings to allow change of app location permissions.
     */
    showAppSettings(): void;

    /**
     * Show system settings to allow configuration of current location sources. (android only)
     */
    showLocationSettings(): void;

    /**
     * Return all stored locations.
     * Useful for initial rendering of user location on a map just after application launch.
     *
     * @param success
     * @param fail
     */
    getLocations(
        success: (locations: Array<Location>) => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * return locations which have not yet been posted to server.
     *
     * @param success
     * @param fail
     */
    getValidLocations(
        success: (locations: Array<Location>) => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * Delete location with locationId.
     *
     * @param locationId
     * @param success
     * @param fail
     */
    deleteLocation(
        locationId: number,
        success?: () => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * Delete all stored locations
     *
     * Note: You don't need to delete all locations.
     * The plugin manages the number of stored locations automatically and
     * the total count never exceeds the number as defined by option.maxLocations.
     *
     * @param success
     * @param fail
     */
    deleteAllLocations(
        success?: () => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * Switch plugin operation mode
     *
     * Normally the plugin will handle switching between BACKGROUND and FOREGROUND mode itself.
     * Calling switchMode you can override plugin behavior and force it to switch into other mode.
     *
     * @example
     * ```js
     * //switch to FOREGROUND mode:
     * BackgroundGeolocation.switchMode(BackgroundGeolocation.FOREGROUND_MODE);
     *
     * //switch to BACKGROUND mode
     * BackgroundGeolocation.switchMode(BackgroundGeolocation.BACKGROUND_MODE);
     * ```
     */
    switchMode(
        modeId: number,
        success?: () => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * Force sync of pending locations.
     *
     * Option syncThreshold will be ignored and all pending locations
     * will be immediately posted to "syncUrl" in a single batch.
     */
    forceSync(
        success?: () => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * Get stored configuration options.
     *
     * @param success
     * @param fail
     */
    getConfig(
        success: (options: BackgroundGeolocationOptions) => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * Return all logged events.
     *
     * @param limit
     * @param fromId
     * @param minLevel
     * @param success
     */
    getLogEntries(
        /** Limits number of returned entries. */
        limit: number,
        /** Return entries after fromId.  */
        fromId: number,
        /** Available levels: ["TRACE", "DEBUG", "INFO", "WARN", "ERROR] */
        minLevel: LogLevel,
        success: (options: Array<LogEntry>) => void,
    ): void;

    /** Unregister all event listeners for given event */
    removeAllListeners(
        event: string
    ): void;

    startTask(
        success: (taskKey: number) => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    endTask(
        taskKey: number,
        success?: () => void,
        fail?: (error: BackgroundGeolocationError) => void
    ): void;

    /**
     * A special task that gets executed when the app is terminated, but
     * the plugin was configured to continue running in the background
     * (option stopOnTerminate: false).
     *
     * In this scenario the Activity was killed by the system and all registered
     * event listeners will not be triggered until the app is relaunched.
     *
     * @example
     * ```js
     *  BackgroundGeolocation.headlessTask(function(event) {
     *      if (event.name === 'location' ||
     *      event.name === 'stationary') {
     *          var xhr = new XMLHttpRequest();
     *          xhr.open('POST', 'http://192.168.81.14:3000/headless');
     *          xhr.setRequestHeader('Content-Type', 'application/json');
     *          xhr.send(JSON.stringify(event.params));
     *      }
     *
     *      return 'Processing event: ' + event.name; // will be logged
     *  });
     * ```
    */
    headlessTask(
        task: (event: { name: string, params: object }) => void
    ): void;

    on(
        eventName: 'location',
        callback: (location: Location) => void
    ): void;

    on(
        eventName: 'stationary',
        callback: (location: StationaryLocation) => void
    ): void;

    on(
        eventName: 'activity',
        callback: (activity: Activity) => void
    ): void;

    on(
        eventName: 'start',
        callback: () => void
    ): void;

    on(
        eventName: 'stop',
        callback: () => void
    ): void;

    on(
        eventName: 'error',
        callback: (error: BackgroundGeolocationError) => void
    ): void;

    on(
        eventName: 'authorization',
        callback: (status: number) => void
    ): void;

    on(
        eventName: 'foreground',
        callback: () => void
    ): void;

    on(
        eventName: 'background',
        callback: () => void
    ): void;

    on(
        eventName: 'abort_requested',
        callback: () => void
    ): void;

    on(
        eventName: 'http_authorization',
        callback: () => void
    ): void;
}

declare var BackgroundGeolocation: BackgroundGeolocation;

declare module 'cordova-plugin-mauron85-background-geolocation' {
    export default BackgroundGeolocation;
}
