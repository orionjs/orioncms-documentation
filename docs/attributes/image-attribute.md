# Image Attribute

The image attribute is perfect to save images in entities or the dictionary.
It's integrated with ```orionjs:filesystem```

The image attribute is a **object**. It has the following attributes:

- ```url``` **String**. The url of the uploaded file.

- ```fileId``` **String**. The id of the ```orionjs:filesystem``` file.

- ```info``` **Object**. Information about the image.

**Info**

- ```width``` **Number**. The width of the image.

- ```height``` **Number**. The height of the image.

- ```primaryColor``` **Color**. The primary color of the image, in rgb.

- ```pallete``` **[Color]**. A color pallete of the image.

**Color**

- ```r``` **Number**. Red color, from 0 to 255.

- ```g``` **Number**. Green color, from 0 to 255.

- ```b``` **Number**. Blue color, from 0 to 255.

## Getting Started

```sh
meteor add orionjs:image-attribute
```

## Examples

Adding to the dictionary

```js
orion.dictionary.addDefinition('logo', 'site', 
  orion.attribute('image', {
      label: 'Site Logo',
      optional: true
  })
);
```

Using in templates

```html
<template name="example">
  <img src="{{ dict 'site.logo.url' }}" width="{{ dict 'site.logo.info.width' }}">
</template >
```

Adding to entities

```js
Posts = new orion.collection('posts', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('image', 'image', 'Image'),
    ]
  }
});

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  image: orion.attribute('image', {
    label: 'Image',
    optional: true
  })
}));
```
