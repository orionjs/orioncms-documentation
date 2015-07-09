# Customization

Orion is very flexible and you can customize almost any aspect of the admin.

## Adding links

All the links that you see in the admin panel are saved in a local collection.

To add links call this function:

```js
orion.links.add(options);
```

**options**

- ```index``` **Number**. Optinal. Orion will order the links by this key. If not set, it will not appear on the list.

- ```identifier``` **String**. The identifier of the link. Only letters, numbers, ```-``` and ```_```.

- ```parent``` **String**. Optional. The identifier of the parent link.

- ```title``` **String** or **Function**. The title of the link.

- ```routeName``` **String**. Optional. The name of the route where the link points.

- ```activeRouteRegex``` **String**. Optional. The prefix that indicates if the link is active.

- ```permission``` **String**. Optional. The name of the Roles action that is needed to be showed.
