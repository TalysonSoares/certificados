document.addEventListener("DOMContentLoaded", function () {
  fetch('dados.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'application/xml');
      const pessoas = xmlDoc.querySelectorAll('pessoa');

      
      function gerarCertificado(index) {
        if (index < pessoas.length) {
          const pessoa = pessoas[index];
          const nome = pessoa.querySelector('nome').textContent;
          const cpf = pessoa.querySelector('cpf').textContent;
          const serie = pessoa.querySelector('serie').textContent;

          document.getElementById('nome').textContent = nome;
          document.getElementById('cpf').textContent = cpf;
          document.getElementById('serie').textContent = serie;
          
          const element = document.getElementById('certificado');
          html2pdf(element, { margin: 0, filename: `${nome}_certificado.pdf`,})
            .then(() => {
              gerarCertificado(index + 1);
            });
        }
      }

      
      gerarCertificado(0);
    });
});
