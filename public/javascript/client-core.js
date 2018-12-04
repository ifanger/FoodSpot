$(function () {
  if (!isAdmin()) {
    $('.admin').css('display', 'none');
  }
});

var isAdmin = function() {
  return (document.cookie == 'admin=true');
}

var login = function(user, password, feedback) {
  $.ajax({
    url: '/api/login?username=' + user + '&password=' + password,
    type: 'POST',
    success: function(response) {
      if (!response.success) {
        $(feedback).html('Usuário ou senha incorretos.');
        return;
      }

      alert('Autenticado com sucesso');
      document.location = '/';
    }
  });
};

var sendRestaurant = function(name, address, site) {
  $.ajax({
    url: '/api/restaurants?name=' + name + '&address=' + address + '&site=' + site,
    type: 'POST',
    success: function (response) {
      if (!response.success) {
        alert('Por favor, preencha corretamente todos os campos antes de enviar.');
        return;
      }

      document.location = '/' + response.data;
    }
  });
};

var removeRestaurant = function(id) {
  $.ajax({
    url: '/api/restaurants?id=' + id,
    type: 'DELETE',
    success: function (response) {
      if (!response.success) {
        alert('Falha ao remover restaurante.');
        return;
      }

      document.location = '/';
    }
  });
};

var getComments = function(restaurantId) {
  $.ajax({
    url: '/api/comment?restaurant=' + restaurantId,
    type: 'GET',
    success: function(result) {
      alert(JSON.stringify(result))
    }
  });
};