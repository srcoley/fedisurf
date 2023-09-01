const init = function() {
  var inject = document.createElement('div');
  inject.id = 'fedisurf';
  inject.innerHTML = 'Injected by extension';

  document.body.prepend(inject);

  chrome.storage.local.get(["servers"]).then((result) => {
    var ul, li, a;

    ul = document.createElement('ul');
    ul.id = 'fedisurf-list';

    for(var i = 0; i < result.servers.length; i++) {
      a = document.createElement('a');
      a.href = result.servers[i].url;
      a.appendChild(document.createTextNode(result.servers[i].title));

      li = document.createElement('li');
      li.appendChild(a);
      ul.appendChild(li);
    }

    document.getElementById('fedisurf').innerHTML = "";
    document.getElementById('fedisurf').appendChild(ul);
  });
}

init();
