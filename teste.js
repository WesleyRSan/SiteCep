var dados = '';

function iniciar(cepInformado) {
    const url= `https://viacep.com.br/ws/${cepInformado}/json/`;
    console.log(url)
    $.ajax({
        url,
        dataType: "json",
        success(retornoDaApi){
            dados = retornoDaApi;
            console.log(dados);
            if (dados.erro == true) {
                alert("CEP Inexistente")
            } else {
            endereco(dados)
        }
    },
        error(e){
        }
    })
}

// $("#numeroCep").on('blur', function(evt) {
//     if(this.value == '') {alert("Informe seu CEP"),
//     evt.preventDefault()
// }
//     })

/*{ <input value="digite aqui" type="text"
onblur="if(this.value == '') {this.value = 'digite aqui';}" 
onfocus="if(this.value == 'digite aqui') {this.value = '';}" /> }*/

// function validaCep(evento) {
//     if (evento == '') {
//         alert('Informe o Cep'),
//         console.log(evento)
//     }
//     onblur="validaCep(this.value)"
    // else if !(e == ) {
    //     alert('Informe apenas os numeros')
    // }    else (this.value < 8) {
    //     alert('O Cep deve conter 8 números')
    // }



// $("#numeroCep").on("onblur", alert("this.value"));


$("#consultaCep").click(function(){
    var cepIndicado = $("#numeroCep").val();
    if(cepIndicado == '') {
        alert("Informe seu CEP")
    } else if(cepIndicado.length < 8) {
        alert("Informe o CEP com 8 numeros")
    } else if(isNaN(cepIndicado)) {
        alert("Informe apenas os numeros")    
    } else {
    iniciar(cepIndicado)};
});

// o codigo abaixo deu errado, é um button gerado junto com as opções de cep's recebidas pelo endereço indicado e como é só teste pedi só um console e um alert (trabalhei pouco nele)
$(".escolheCep").on("click", function(event){
    console.log("Esse é o cep clicado")
    event.preventDefault();
    alert("Was preventDefault() called: " + event.isDefaultPrevented());
});

// Clicar nos links dos cep's gerados e apresenta-lo detalhado na terceira coluna
$("#cepEncontrado").on("click", ".detalhaCep", function(event){
    var cepClicado = $(this).attr("href");
    console.log("Esse é o cep clicado"+ cepClicado)
    iniciar(cepClicado);
    event.preventDefault();
});

const endereco = function(){
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


const acharCep = function(){

    const estado = $("#estado").val();
    const cidade = $("#cidade").val();
    const logradouro = $("#logradouro").val();

    $.ajax({
        url: `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`,
        dataType: "json",
        success(retorno) {
            dados = retorno;
            opcoesDeCep(dados)
        },
        error() {

        },
    })
}

$("#procuraCep").click(function(){
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
                    <td>${item.bairro}</td>
                    <td><button class="escolheCep"> Consultar </button></td>
                </tr>                    
            </table>`
        
        $("#cepEncontrado").html(html);
    })
}

