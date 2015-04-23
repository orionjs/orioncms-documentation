# Roles

Orion uses ```nicolaslopezj:roles``` for roles. 
Basically this package let us define actions and later assign 
allow/deny rules for that action.

You can check the full documentation of ```nicolaslopezj:roles``` [here](http://github.com/nicolaslopezj/roles).

## Creating roles

```js
myRole = new Roles.Role('my-role');
```

Then you can set custom roles for that specific role

```js
myRole.allow(action, rule);
myRole.deny(action, rule);
```

- ```action``` **String**. The name of the action.

- ```rule``` **Function**. Must return true/false. The input of the function depends of the context.
To get the userId in the function you can call ```this.userId```.

Example:

```js
myRole.allow('collection.posts.update', function(userId, doc, fields, modifier) {
  return doc.createdBy === userId; // Will be allowed to edit his own posts
});
myRole.deny('collection.posts.update', function(userId, doc, fields, modifier) {
  return !_.contains(fields, 'userId'); // Can't change the userId field
});
```

You can also set helpers for your role

```js
myRole.helper(name, func);
```

- ```name``` **String**. The name of the helper.

- ```func``` **Function**. The function that will be called when the helper is called.

Example:

```js
myRole.helper('dictionary.allowedCategories', function() {
  return ['public'];
});
```

## Actions

Here is a list of the available actions.

**Accounts**

- ```accounts.index``` View the list of users in the admin panel.
- ```accounts.update.roles``` Change a user roles.
- ```accounts.invite``` Create invitations.

**Collections**

```myCollection``` is the name of the collection.

- ```collection.myCollection.index``` View the list of items of the collection in the admin.
- ```collection.myCollection.insert``` Create documents of that collection. Input: ```userId, doc```.
- ```collection.myCollection.update``` Update a document of a collection. Input: ```userId, doc, fields, modifier```.
- ```collection.myCollection.remove``` Remove a document. Input: ```userId, doc```.
- ```collection.myCollection.showCreate``` Show the create button in the admin.
- ```collection.myCollection.showUpdate``` Show the update button/sends the user to the update form. Input: ```doc```.
- ```collection.myCollection.showUpdate``` Show the remove button. Input: ```doc```.

**App Configuration**

- ```config.update``` Update the app configuration.

**Dictionary**

- ```dictionary.update``` Update the dictionary. Input: ```userId, doc, fields, modifier```.

## Helpers

Here is a list of the helpers that orion use.

**Collections**

```myCollection``` is the name of the collection.

- ```collection.myCollection.indexFilter``` The filter of the results that the user can view in the admin. 
Example: ```{ createdBy: this.userId }```. Filters will be joined with $or comparator.


**Dictionary**

- ```dictionary.allowedCategories``` The categories that the user can edit in the admin. 
The union of all the allowedCategories will be the result.


