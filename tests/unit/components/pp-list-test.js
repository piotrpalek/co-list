import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

var compile = Ember.Handlebars.compile;
var View = Ember.View;
var run = Ember.run;

var wrapperView;

moduleForComponent('pp-list', 'pp-list component', {
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
      '{{#pp-list collection=view.list as |item|}}' +
        '<span>{{item}}</span>' +
      '{{/pp-list}}'
    )
  });

  run(function(){
    wrapperView.appendTo('#ember-testing-container');
  });

  var text = wrapperView.$('span').text();

  equal(text, '123');
});

test('it renders the passed items', function(){
  wrapperView = View.create({
    container: this.container,
    list: [1, 2, 3],
    meta: {
      selected: [1, 2]
    },
    template: compile(
      '{{#pp-list meta=view.meta collection=view.list as |item meta|}}' +
        '<span>[{{meta.selected}}]</span>' +
      '{{/pp-list}}'
    )
  });

  run(function(){
    wrapperView.appendTo('#ember-testing-container');
  });

  var text = wrapperView.$('span').text();

  equal(text, '[true][true][false]');
});
