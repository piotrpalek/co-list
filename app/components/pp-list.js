import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  collection: null,
  meta: null,

  proxyCollection: computed.map('collection', function(item){
    return { content: item, meta: { selected: this.inSelected(item) } };
  }),

  inSelected: function(item) {
    var selected = this.get('meta.selected');
    if(selected) {
      return selected.indexOf(item) !== -1
    }
  }
});
