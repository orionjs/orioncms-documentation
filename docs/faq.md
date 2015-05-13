# Orion - FAQ
## Security and Browser polycies
For protecting your server against script injection
and your clients against XSS attacks, we recommend
the following packages modifications:
```bash
meteor remove insecure autopublish
meteor add audit-arguments-check browser-policy matteodem:easy-security
```
* `audit-arguments-check` checks the correctness of your development ensuring you that you've carefully checked user's inputs.
* `browser-policy` constraints modern users in not using anything else except what is precisely specified.
* `matteodem:easy-security` is a rate limiting user's entry to avoid attacks 'à la` DDOS.
