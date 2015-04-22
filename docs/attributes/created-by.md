# Created By

You can simply add a field that saves the id of the user that
created the document using the created by attribute.
This only works on **collections**.

This will not show a form, it will only set the id of the user without
any notice.

> This attribute comes with ```orionjs:accounts```

Example: 

```js
Posts = new orion.collection('posts', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('createdBy', 'createdBy', 'Created By')
    ]
  }
});

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  createdBy: orion.attribute('createdBy')
}));
```
