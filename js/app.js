document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const cidadeInput = document.getElementById("cidade");
  const ufInput = document.getElementById("uf");
  const logradouroInput = document.getElementById("logradouro");
  const bairroInput = document.getElementById("bairro");
  const btnPesquisar = document.getElementById("btn");
  const btnLimpar = document.getElementById("btn-clear");

  // Função para limpar os campos
  const limparCampos = () => {
    cepInput.value = "";
    cidadeInput.value = "";
    ufInput.value = "";
    logradouroInput.value = "";
    bairroInput.value = "";
    cepInput.focus();
  };

  // Função para validar o CEP
  const validarCEP = (cep) => {
    const regexCEP = /^[0-9]{8}$/; // Apenas números, com exatamente 8 dígitos
    return regexCEP.test(cep);
  };

  // Função para buscar o CEP na API
  const buscarCEP = async (cep) => {
    if (!validarCEP(cep)) {
      alert("Por favor, insira um CEP válido (8 dígitos numéricos).");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Verifique e tente novamente.");
        limparCampos();
        return;
      }

      // Preencher os campos com os dados da API
      cidadeInput.value = data.localidade || "";
      ufInput.value = data.uf || "";
      logradouroInput.value = data.logradouro || "";
      bairroInput.value = data.bairro || "";
    } catch (error) {
      alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
    }
  };

  // Event listener para o botão "Pesquisar"
  btnPesquisar.addEventListener("click", () => {
    const cep = cepInput.value.trim();
    buscarCEP(cep);
  });

  // Event listener para o botão "Limpar"
  btnLimpar.addEventListener("click", limparCampos);

  // Event listener para a tecla "Enter"
  cepInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evitar comportamento padrão de envio de formulário
      const cep = cepInput.value.trim();
      buscarCEP(cep);
    }
  });
});
