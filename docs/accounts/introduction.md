# Accounts

Orion accounts

## Creating accounts

Orion has 3 ways to create accounts:

- **Admin account**. By default account creation is closed, but when there is no
admin (no user that has the admin role), Orion will allow you to create one account
which the ```admin``` role will be added to him.

- **Invitations**. The admin can invite users, you must navigate to the 
accounts tab and press +. This will generate a invitation link which you need to
pass to the new user. If you set a email the new user must have that email.

- **Open Registration**. You can allow the public registration.

### Public registration

To allow anyone to register to your app the only thing to do is to set this option to ```false```.

```js
Options.set('forbidClientAccountCreation', false);
```

New users will have no roles, unless you specify the default roles.

```
Options.set('defaultRoles', ['role1', 'role2']);
```