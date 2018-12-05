$(function () {
  if (!isAdmin()) {
    $('.admin').css('display', 'none');
  }
});

function adminCheck() {
  aler('a');
  if (!isAdmin()) {
    $('.admin').css('display', 'none');
  }
}

function goToURL(url) {
  window.location.href = 'http://127.0.0.1:3000' + url;
}

function isAdmin() {
  return (document.cookie == 'admin=true') || (document.cookie == 'admin=true; ');
}

function login(user, password, feedback) {
  $.ajax({
    url: '/api/login?username=' + user + '&password=' + password,
    type: 'POST',
    success: function(response) {
      if (!response.success) {
        $(feedback).html('Usuário ou senha incorretos.');
        return;
      }

      alert('Autenticado com sucesso');
      goToURL('/');
    }
  });
};

function sendRestaurant(name, address, site) {
  $.ajax({
    url: '/api/restaurants?name=' + name + '&address=' + address + '&site=' + site,
    type: 'POST',
    success: function (response) {
      if (!response.success) {
        alert('Por favor, preencha corretamente todos os campos antes de enviar.');
        return;
      }

      goToURL('/' + response.data);
    }
  });
};

function removeRestaurant(id) {
  $.ajax({
    url: '/api/restaurants?id=' + id,
    type: 'DELETE',
    success: function (response) {
      if (!response.success) {
        alert('Falha ao remover restaurante.');
        return;
      }

      goToURL('/');
    }
  });
}

function rateRestaurant(restaurant, rate, feedback) {
  $.ajax({
    url: '/api/rate?restaurant=' + restaurant + '&rate=' + rate,
    type: 'POST',
    success: function(response) {
      if (!response.success) {
        $(feedback).html('Selecione uma nota para avaliar');
        return;
      }

      alert('Avaliado com sucesso!');
      goToURL('/detalhes?i=' + restaurant);
    }
  });
}

function commentRestaurant(restaurant, author, message, feedback) {
  $.ajax({
    url: '/api/comment?restaurant=' + restaurant + '&author=' + $(author).val() + '&message=' + $(message).val(),
    type: 'POST',
    success: function(response) {
      if (!response.success) {
        $(feedback).html('Preencha todos os campos corretamente.');
        return;
      }
      goToURL('/detalhes?i=' + restaurant);
    }
  });
}

function getComments(restaurantId, target) {
  $.ajax({
    url: '/api/comment?restaurant=' + restaurantId,
    type: 'GET',
    success: function(result) {
      if (!result) {
        return;
      }

      for (var i = 0; i < result.data.length; i++) {
        var comment = result.data[i];
        $(target).html($(target).html() + '<p style="font-weight: bold;">' + comment.author + '</p><p>' + comment.message + '</p>')
      }
    }
  });

  adminCheck();
}