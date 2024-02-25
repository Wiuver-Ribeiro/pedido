document.addEventListener("DOMContentLoaded", function() {
    // Pasta onde as fotos estão localizadas
    const photoFolder = "assets/";
    
    // Array para armazenar o nome de todas as fotos
    const photoNames = [];
  
    // Carregar todas as fotos da pasta "assets"
    fetch(photoFolder)
      .then(response => response.text())
      .then(text => {
        // Extrair nomes de arquivos de texto HTML
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, 'text/html');
        const links = Array.from(htmlDoc.querySelectorAll('a'));
        links.forEach(link => {
          if (link.href.endsWith('.jpg') || link.href.endsWith('.jpeg') || link.href.endsWith('.png')) {
            photoNames.push(link.href.split('/').pop());
          }
        });
      })
      .then(() => {
        // Exibir as fotos na página
        const photosContainer = document.getElementById('photos-container');
        photoNames.forEach(photoName => {
          const col = document.createElement('div');
          col.classList.add('col');
          const card = document.createElement('div');
          card.classList.add('card', 'animate__animated', 'animate__fadeIn');
          const img = document.createElement('img');
          img.src = photoFolder + photoName;
          img.classList.add('card-img-top');
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          const cardText = document.createElement('p');
          cardText.classList.add('card-text');
        //   cardText.textContent = 'Legenda da ' + photoName;
          
          cardBody.appendChild(cardText);
          card.appendChild(img);
          card.appendChild(cardBody);
          col.appendChild(card);
          photosContainer.appendChild(col);
        });
      })
      .catch(error => console.error('Erro ao carregar fotos:', error));
  });
  