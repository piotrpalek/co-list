import Ember from 'ember';

var computed = Ember.computed;
var keys = Ember.keys;

export default Ember.Component.extend({
  collection: null,
  meta: null,

  proxyCollection: computed.map('collection', function(item){
    var metaKeys = this.get('metaKeys');

    return { content: item, meta: this.generateMetaObject(metaKeys, item) };
  }),

  metaKeys: computed('meta', function(){
    var meta = this.get('meta') || [];

    return keys(meta);
  }),

  generateMetaObject: function(metaKeys, item) {
    var self = this;

    return metaKeys.reduce(function(accumulator, metaKey) {
      accumulator[metaKey] = self.present(metaKey, item);
      return accumulator;
    }, {});
  },

  present: function(metaKey, item) {
    var metaArray = this.get('meta.' + metaKey) || [];

    return metaArray.indexOf(item) !== -1;
  }
});
