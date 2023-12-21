module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/webhook-strava',
            handler: 'event.createFromStrava',
        },
    ]
}
