function generarEnlacesHTML(carpeta) {
    fetch(carpeta)
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, 'text/html');
        const links = Array.from(htmlDocument.querySelectorAll('a[href$=".html"]')).map(link => link.href);
        const enlacesHTML = links.map(link => `<a href="${link}">${link}</a>`).join('<br>');
        document.getElementById('enlacesHTML').innerHTML = enlacesHTML;
      })
      .catch(error => console.error('Error al obtener los archivos HTML:', error));
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    generarEnlacesHTML('./articulos/');
  });