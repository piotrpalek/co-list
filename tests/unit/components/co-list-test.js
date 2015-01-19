import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

var compile = Ember.Handlebars.compile;
var View = Ember.View;
var run = Ember.run;
var get = Ember.get;

var wrapperView;

moduleForComponent('co-list', 'co-list component', {
  teardown: function() {
    if(wrapperView) {
      run(function(){
        wrapperView.destroy();
      });
    }

    wrapperView = null;
  }
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it renders the passed items', function(){
  wrapperView = View.create({
    container: this.container,
    list: [1, 2, 3],
    template: compile(
      '{{#co-list collection=view.list as |item|}}' +
        '<span>{{item}}</span>' +
      '{{/co-list}}'
    )
  });

  run(function(){
    wrapperView.appendTo('#ember-testing-container');
  });

  var text = wrapperView.$('span').text();

  equal(text, '123');
});

test('meta information is working properly', function(){
  wrapperView = View.create({
    container: this.container,
    list: [1, 2, 3],
    meta: {
      selected: [1, 2]
    },
    template: compile(
      '{{#co-list meta=view.meta collection=view.list as |item meta|}}' +
        '<span>[{{meta.selected}}]</span>' +
      '{{/co-list}}'
    )
  });

  run(function(){
    wrapperView.appendTo('#ember-testing-container');
  });

  var text = wrapperView.$('span').text();

  equal(text, '[true][true][false]');
});

test('#metaKeys', function() {
  var component = this.subject({meta: { test: '1', other: '2' }});
  deepEqual(component.get('metaKeys'), ['test', 'other']);

  run(function(){
    component.set('meta', { foo: 'bar', bar: 'foo' });
  });

  deepEqual(component.get('metaKeys'), ['foo', 'bar']);
});

test('#generateMetaObject', function() {
  var component = this.subject({meta: { foo: [1, 2], bar: [2, 3], baz: [1, 3] }});
  var metaKeys = component.get('metaKeys');
  var item = 1;
  var metaObject = component.generateMetaObject(metaKeys, item);

  ok(get(metaObject, 'foo'));
  ok(get(metaObject, 'baz'));
  equal(get(metaObject, 'bar'), false);
});
