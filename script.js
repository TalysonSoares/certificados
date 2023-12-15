document.addEventListener("DOMContentLoaded", function () {
    fetch('dados.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const pessoas = xmlDoc.querySelectorAll('pessoa');
  
        // Função recursiva para gerar certificados de forma assíncrona
        function gerarCertificado(index) {
          if (index < pessoas.length) {
            const pessoa = pessoas[index];
            const nome = pessoa.querySelector('nome').textContent;
            const cpf = pessoa.querySelector('cpf').textContent;
  
            // Atualiza o conteúdo da tela com os dados da pessoa
            document.getElementById('nome').textContent = nome;
            document.getElementById('cpf').textContent = cpf;
  
            //Gera e salva o pdf
            const element = document.getElementById('certificado');
            html2pdf(element, { margin: 20, filename: `${nome}_certificado.pdf` })
              .then(() => {
                //Passa para a proxima pessoa
                gerarCertificado(index + 1);
              });
          }
        }
  
        //Da inicio ao processo
        gerarCertificado(0);
      });
  });
  