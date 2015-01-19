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
    var meta = this.get('meta');

    if(!meta) {
      return [];
    }

    return keys(meta);
  }),

  generateMetaObject: function(metaKeys, item) {
    return metaKeys.reduce((accumulator, metaKey) => {
      accumulator[metaKey] = this.present(metaKey, item);
      return accumulator;
    }, {});
  },

  present: function(metaKey, item) {
    var metaArray = this.get('meta.' + metaKey);
    if(metaArray) {
      return metaArray.indexOf(item) !== -1
    }
  }
});
