# Relationships

Define and use relationships between meteor collections and the dictionary.
Relationships work as orion attributes. There are 2 types of relationships.

## Getting Started

```sh
meteor add orionjs:relationships
```

## Has One

The "has one" attribute is a **String** that contains the selected id of the selected item.

```
orion.attribute('hasOne', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```titleField``` **String**. The name of the field you want to show.

- ```publicationName``` **String**. The name of the publication, it doesn't 
affect anything. Just set a unique string.

- ```collection``` **Collection**. The meteor collection. This is not the name of the collection, is the variable.

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the mongo filter. Remember to add to ```aditionalFields``` all the fields that you use in the ```filter``` function.

- ```aditionalFields``` **Array**. Optional. Search with more fields in the select. If you want to fetch other fields than the ```titleField``` you must add them here.

- ```create``` **Function**. Optional. Allows the user to create a new items that aren't in the list of options. This option can be any of the following: "true", "false" (disabled), or a function that accepts two arguments: "input" and "callback". The callback should be invoked with the final data for the option.

- ```createFilter``` **Function**. Optional. Specifies a RegExp or String containing a regular expression that the current search filter must match to be allowed to be created. May also be a predicate function that takes the filter text and returns whether it is allowed.

- ```render``` **Object**. Optional. Custom render functions for the select. Check [here](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#rendering). You must set ```option``` and ```item```.

## Examples

Adding to entities

```js
Groups = new orion.collection('groups');
Stores = new orion.collection('stores');

Stores.attachSchema(new SimpleSchema({
  group: orion.attribute('hasOne', {
    label: 'Group'
  }, {
    entity: Groups,
    titleField: 'name',
    publicationName: 'youCanPutAnyStringYouWantHere',
  })
}))
```

## Has Many

The "has one" attribute is a **Array** that contains the selected ids of the selected items.

```
orion.attribute('hasMany', schema, options)
```

- ```schema``` **Object**. The definition of the attribute.

***Options***

- ```titleField``` **String**. The name of the field you want to show.

- ```publicationName``` **String**. The name of the publication, it doesn't 
affect anything. Just set a unique string.

- ```pluralName``` **String**. Optional. The name of more than one items. When ```entity``` is used, 
this is automatically set.

- ```singularName``` **String**. Optional. The name of more one items. When ```entity``` is used, 
this is automatically set.

- ```collection``` **Collection**. The meteor collection. This is not the name of the collection, is the variable.

- ```filter``` **Function**. Optional. A function that takes the ```userId``` and returns the mongo filter. Remember to add to ```aditionalFields``` all the fields that you use in the ```filter``` function.

- ```aditionalFields``` **Array**. Optional. Search with more fields in the select. If you want to fetch other fields than the ```titleField``` you must add them here.

- ```create``` **Function**. Optional. Allows the user to create a new items that aren't in the list of options. This option can be any of the following: "true", "false" (disabled), or a function that accepts two arguments: "input" and "callback". The callback should be invoked with the final data for the option.

- ```createFilter``` **Function**. Optional. Specifies a RegExp or String containing a regular expression that the current search filter must match to be allowed to be created. May also be a predicate function that takes the filter text and returns whether it is allowed.

- ```render``` **Object**. Optional. Custom render functions for the select. Check [here](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#rendering). You must set ```option``` and ```item```.`

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('topProducts', 'home', 
  orion.attribute('hasMany', {
    label: 'Top Products'
  }, {
    collection: Products,
    titleField: 'name',
    aditionalFields: ['active'], // we must add the active field because we use it in the filter
    publicationName: 'youCanPutAnyStringYouWantHere2',
    /**
     * To return only the active products
     */
    filter: function(userId) {
      return { active: true };
    }
  })
);
```
