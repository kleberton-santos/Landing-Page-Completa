$(document).ready(function() {
  const isbnContos = '9788595085701'; 
  const isbnSilmarillion = '8595084378'; 
  const isbnSenhorDosAneis = '8595086354'; 

  function loadBookInCard(isbn, cardIndex, coverUrl) {
    $.ajax({
      url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      method: 'GET',
      success: function(data) {
        console.log(`Dados recebidos para ISBN: ${isbn}`, data); 
        if (data.items && data.items.length > 0) {
          const bookData = data.items[0].volumeInfo;

          const description = bookData.description || 'Descrição indisponível.';

          const card = $(`.servicos .content-servicos .card:eq(${cardIndex})`);
          card.find('img').attr('src', coverUrl || bookData.imageLinks?.large || 'https://via.placeholder.com/150'); 
          card.find('.card-body .card-text').text(description); 
        } else {
          console.error(`Livro não encontrado na Google Books API para ISBN: ${isbn}`);
          const card = $(`.servicos .content-servicos .card:eq(${cardIndex})`);
          card.find('img').attr('src', coverUrl || 'https://via.placeholder.com/150'); 
          card.find('.card-body .card-text').text('Livro não encontrado.');
        }
      },
      error: function(xhr, status, error) {
        console.error('Erro ao buscar dados da Google Books API:', error);
        alert('Erro ao buscar dados do livro. Verifique o console para mais informações.');
      }
    });
  }

  const contosCoverUrl = 'https://img.bertrand.pt/images/contos-inacabados-de-numenor-e-da-terra-media-j-r-r-tolkien/NDV8MzAxMTg0NzN8MjY2MDUwMzB8MTcxOTM5MDk4NzAwMHx3ZWJw/250x';
  loadBookInCard(isbnContos, 0, contosCoverUrl); 
  
  const silmarillionCoverUrl = 'https://m.media-amazon.com/images/I/71mWHFvaZ5L._AC_UF1000,1000_QL80_.jpg';
  loadBookInCard(isbnSilmarillion, 1, silmarillionCoverUrl); 

  const lotrCoverUrl = 'https://m.media-amazon.com/images/I/81KGUQ+PMgL._AC_UF1000,1000_QL80_.jpg';
  loadBookInCard(isbnSenhorDosAneis, 2, lotrCoverUrl); 
});


var form = document.getElementById("my-form");
  
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)



  
