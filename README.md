# Co-list

Co-list is a very simple list component for Ember-cli. This is still under development and neither the API or features are finished or stable.

## Installation

`npm install --save-dev ember-cli-co-list`

## Intended use

### Simple looping

```js
// assuming someCollection = [1, 2, 3]
<ul>
{{#co-list collection=someColletion as |item|}}
  <li>{{item}}</li>
{{/co-list}}
</ul>
```
This should produce three `<li>` tags with the numbers 1, 2 and 3.

### Meta property

The meta property allows us to associate some additional information with an item from the collection property without having to use `ObjectProxy` or similiar. For now this works by adding a `meta` property to the component. 

The only supported use-case (as for now) is shown in the example below.

```js
// assuming:
// someCollection = [1, 2, 3]
// metaObject = {
//   selected: [1, 2],
//   somethingElse: [2, 3]
// }

<ul>
  {{#co-list meta=metaObject collection=someColletion as |item|}}
    <li {{bind-attr class="meta.selected:selected"}}>{{item}} - {{somethingElse}}</li>
  {{/co-list}}
</ul>
```
In short, if an item from the provided collection is in the `selected` array, the `meta` property (used in the template) will be true. So for example if we assume the current `item` is the number 1, then the `meta` property will look like this:

```js
{
  selected: true,
  somethingElse: false
}
```

The thought behind this is that we can use simple array methods to add an item to the selected, active, etc., list and have a way of accessing that information while looping through the list. Additionally we don't have to use proxy objects so there's no special behavior for the items inside the loop, they are exactly the same thing that the user provides to the component.
