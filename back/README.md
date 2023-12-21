# Backend

## Strava 

### Post webhook

```
 curl -X POST https://www.strava.com/api/v3/push_subscriptions \
      -F client_id=98761 \
      -F client_secret=ffb6b765529573fa2b7f37a4145fba62262c5531 \
      -F callback_url=https://api.400m.coach/api/webhook-strava \
      -F verify_token=400MCOACH 
```
