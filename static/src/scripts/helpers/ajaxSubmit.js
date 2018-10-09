'use strict';

function ajaxSubmit(form, callback) {
    var xhr = new XMLHttpRequest();
    var params = [].filter.call(form.elements, function (el) {return !(el.type in ['checkbox', 'radio']) || el.checked;})
    .filter(function(el) { return !!el.name; }) //Nameless elements die.
    .filter(function(el) { return !el.disabled; }) //Disabled elements die.
    .map(function(el) {
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
    }).join('&'); //Then join all the strings by &
    xhr.open("POST", form.action);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = callback.bind(xhr);
    xhr.send(params);
};

export default ajaxSubmit;
