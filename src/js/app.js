require('../css/style.css');
import $ from 'jquery'
import Mustache from 'mustache'
import events from './events'
import stats from './stats'

(function( $ ) {
  var people = ['Will', 'Steve'];

  //cache DOM
  var $el = $('#peopleModule');
  var $button = $el.find('button');
  var $input = $el.find('input');
  var $ul = $el.find('ul');
  var template = $el.find('#people-template').html();

  //bind events
  $button.on('click', addPerson);
  $ul.delegate('i.del', 'click', deletePerson);

  _render();

  function _render() {
    $ul.html(Mustache.render(template, { people: people }));
    events.emit("peopleChanged", people.length);
  }

  function addPerson() {
    var name = $input.val();
    people.push(name);
    _render();
    $input.val('');
  }

  function deletePerson(event) {
    var i;
    if (typeof event === "number") {
      i = event;
    } else {
      var $remove = $(event.target).closest('li');
      i = $ul.find('li').index($remove);
    }
    people.splice(i, 1);
    _render();
  }

  return {
    addPerson: addPerson,
    deletePerson: deletePerson
  };

})($);