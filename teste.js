var dados = '';

function iniciar(cepInformado) {
    const url= `https://viacep.com.br/ws/${cepInformado}/json/`;
    console.log(url)
    $.ajax({
        url,
        dataType: 'json',
        success(retornoDaApi){
            dados = retornoDaApi;
            console.log(dados);
            endereco(dados);
        },
        error(e){            
        },
    })
}

$('#consultaCep').click(function(){
    var cepIndicado = $('#numeroCep').val();
    iniciar(cepIndicado);
});

// o codigo abaixo é um exemplo de outro projeto
    // $("#listagem").on('click', '.excluir', function(event) {
    //     const index = $(this).attr('href');
    //     $(`#pokemon-${index}`).remove();
    //     event.preventDefault();
    // });


// o bloco abaixo deu certo como link do titulo informado no html "Encontre seu CEP". Como é para teste solicitei so um console e um alert
$('.testelink').on('click', function(event){
    console.log('Esse é o cep clicado')
    event.preventDefault();
    alert("Was preventDefault() called: " + event.isDefaultPrevented());
});


// o codigo abaixo deu errado, é um button gerado junto com as opções de cep's recebidas pelo endereço indicado e como é só teste pedi só um console e um alert (trabalhei pouco nele)
$('.escolheCep').on('click', function(event){
    console.log('Esse é o cep clicado')
    event.preventDefault();
    alert("Was preventDefault() called: " + event.isDefaultPrevented());
});

// o bloco abaixo deu errado, é para clicar nos links dos cep's gerado apos informar os dados do endereço em busca do CEP e apresenta-lo detalhado na terceira coluna
$('.detalhaCep').on('click', function(event){
    var cepClicado = $(this).attr('href');
    console.log('Esse é o cep clicado'+ cepClicado)
    iniciar(cepClicado);
    event.preventDefault();
});

// AS tres opções abaixo surgiram nas pesquisas como possíveis substitutas do preventDefault, mas nao analisei nenhuma
    // return false()
    // event.stopPropagation();
    // disable;

const endereco = function(){
    $('#endereco').html(`
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


const acharCep = function(){

    const estado = $('#estado').val();
    const cidade = $('#cidade').val();
    const logradouro = $('#logradouro').val();

    $.ajax({
        url: `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`,
        dataType: 'json',
        success(retorno) {
            dados = retorno;
            opcoesDeCep(dados)
        },
        error() {

        },
    })
}

$('#procuraCep').click(function(){
    acharCep();
});

const opcoesDeCep = function() {
    var html = '';
    dados.forEach((item, index) => {
        html = html + `
            <table class="table table-hover">
                <tr>
                    <th scope="row">Cep encontrado:</th>
                    <td><a href="${item.cep}" class="detalhaCep">${item.cep}</a></td>
                    <td>${item.logradouro}</td>
                    <td>${item.bairro}</td>
                    <td><button class='escolheCep'> Consultar </button></td>
                </tr>                    
            </table>`
        
        $('#CepEncontrado').html(html);
    })
}

