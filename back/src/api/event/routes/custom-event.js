module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/webhook-strava',
            handler: 'event.createFromStrava',
        },
        {
            method: 'GET',
            path: '/webhook-strava',
            handler: 'event.createFromStrava',
        },
    ]
}
