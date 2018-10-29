
// Recebe o CEP informado, Pega os dados na Api e envia para a função endereço() 
function iniciar(cepInformado) {
    const url = `https://viacep.com.br/ws/${cepInformado}/json/`;
    console.log(url)
    $.ajax({
        url,
        dataType: "json",
        success(retornoDaApi) {
            if (retornoDaApi.erro) {
                alert("CEP Inexistente");
                return;
            }
            endereco(retornoDaApi);
        }
    })
}

// Repassa o CEP informado pelo usuario para a função iniciar()
$("#consultaCep").click(function () {
    const cepIndicado = $("#numeroCep").val();

    if (!cepIndicado.length) {
        alert("Informe seu CEP");
    } else if (cepIndicado.length < 8) {
        alert("Informe o CEP com 8 numeros");
    } else if (isNaN(cepIndicado)) {
        alert("Informe apenas os numeros");
    } else {
        iniciar(cepIndicado)
    };
});


// Clicar nos links dos cep's gerados e informa-lo para a função iniciar()
$("#cepEncontrado").on("click", ".detalhaCep", function (event) {
    var cepClicado = $(this).attr("href");
    console.log("Esse é o cep clicado" + cepClicado)
    iniciar(cepClicado);
    event.preventDefault();
});

// o codigo abaixo esta incompleto, é um button gerado junto com as opções de cep's recebidas pelo endereço indicado e falta conseguir pegar o valor do cep ja indicado no link 
$("#cepEncontrado").on("click", ".escolhe-cep", function (event) {
    var cep = $(this).data('cep');
    iniciar(cep);
});

// Recebe os dados da função iniciar() e apresenta-os ao usuario
const endereco = function (dados) {
    $("#endereco").html(`
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col" colspan="2"><h2>Endereço Relacionado</h2></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Cep indicado:</th>
                    <td>${dados.cep}</td>
                </tr>
                <tr>
                    <th scope="row">Logradouro:</th>
                    <td>${dados.logradouro}</td>
                </tr>
                <tr>
                    <th scope="row">Bairro:</th>
                    <td>${dados.bairro}</td>
                </tr>
                <tr>
                    <th scope="row">Cidade:</th>
                    <td>${dados.localidade}</td>
                </tr>
                <tr>
                    <th scope="row">Estado:</th>
                    <td>${dados.uf}</td>
                </tr>
            </tbody>
        </table>
    `);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Pega dos dados do endereço fornecido pelo usuario, bate na API e entrega os dados para a função opcoesDeCep()
const acharCep = function () {
    const estado = $("#estado").val();
    const cidade = $("#cidade").val();
    const logradouro = $("#logradouro").val();

    $.ajax({
        url: `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`,
        dataType: "json",
        success(retorno) {
            if (!retorno.length) {
                alert('Cep não encontrado!');
                return;
            }
            opcoesDeCep(retorno)
        }
    })
}

$("#procuraCep").click(function () {
    const estado = $("#estado").val();
    const cidade = $("#cidade").val();
    const logradouro = $("#logradouro").val();

    const isEmpty = estado.length && cidade.length && logradouro.length;

    if (!isEmpty) {
        alert('Preencha todos os campos da pesquisa');
        return false;
    }
    acharCep();
});

const opcoesDeCep = function (dados) {
    var html = '';
    dados.forEach((item, index) => {
        html = html + `
            <table class="table table-hover">
                <tr>
                    <th scope="row">Cep:</th>
                    <td><a href="${item.cep}" class="detalhaCep">${item.cep}</a></td>
                    <td>${item.bairro}</td>
                    <td><button class="escolhe-cep" data-cep="${item.cep}"> Consultar </button></td>
                </tr>                    
            </table>`

        $("#cepEncontrado").html(html);
    })
}
