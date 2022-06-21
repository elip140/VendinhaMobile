var ListaIDs=[];

function ConverterJSONprod(json="", isString=false)
{
    // Recebe um JSON e gera os cards para cada os produtos
    if(!isString)
    {
        json = JSON.stringify(json);
    }

    var arrayObjects = eval(json);


    for(i=0; i<arrayObjects.length; i++)
    {
        var ID = arrayObjects[i].id;
        ListaIDs.push(ID);
        var cardProd = `<div class="col" id="divcol_`+ID+`">
                            <div class="card" id="divcard_`+ID+`">
                                <img src="`+arrayObjects[i].img+`" class="card-img-top" alt="..." id="img_`+ID+`">

                                <div class="card-body" id="divbody_`+ID+`">
                                    <h5 class="card-title" id="nome_`+ID+`">`+arrayObjects[i].nome+`</h5>
                                    <p class="card-text" id="preco_`+ID+`">R$`+arrayObjects[i].preco+`</p>
                                </div>

                                <div class="card-footer" id="divfooter_`+ID+`">
                                    <button class="btn btn-primary" onclick="AddProduto(`+ID+`)" id="btncart_`+ID+`">Adicionar no Carrinho</button>

                                    <div class="input-group mb-3 vanish" id="divqtd_`+ID+`">
                                        <div class="input-group-prepend" id="divmenus_`+ID+`">
                                            <button class="btn btn-outline-danger" type="button" onclick="QtdMenus(`+ID+`)" id="btnmenus_`+ID+`">-</button>
                                        </div>
                                        <span class="input-group-text" id="qtd_`+ID+`">1</span>
                                        <div class="input-group-append" id="divmais_`+ID+`">
                                            <button class="btn btn-outline-success" type="button" onclick="QtdMais(`+ID+`)" id="btnmais_`+ID+`">+</button>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>`;

        var Lista = document.getElementById("Lista");
        Lista.innerHTML += cardProd;
    }
    CheckCart();
}

function AddProduto(ProdID)
{
    try {
        $.ajax({
            url: '../produtos/'+ProdID,
            contentType: 'application/json',
            cache: false,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var qtd = document.getElementById('qtd_'+data.id).textContent;
                var json = '{"ID": '+data.id+', "Qtd": '+parseInt(qtd)+', "Nome":"'+data.nome+'", "Preco":'+data.preco+'}';
                try {
                    window.AppInventor.setWebViewString(json); 
                } catch (error) {
                    alert(error);
                    alert(json);
                }
                
            }
        });
    } catch (error) {
        alert("Add Produto = "+error);
        console.log(error);
    }
}


function CheckCart()
{
    try {
        var Lista = window.AppInventor.getWebViewString();

        alert(Lista);

        ListaIDs.forEach(item => {
            document.getElementById('divqtd_'+item).classList.add('vanish');
            document.getElementById('btncart_'+item).classList.remove('vanish');
            document.getElementById('qtd_'+item).textContent = 1;
        });
        
        Lista = eval(Lista);
        for(i=0; i<Lista.length; i++)
        {
            var qtd = document.getElementById('qtd_'+Lista[i].id);
            var divqtd = document.getElementById('divqtd_'+Lista[i].id);
            var btncart = document.getElementById('btncart_'+Lista[i].id);

            if(qtd!=null && divqtd!=null && btncart!=null)
            {
                qtd.textContent = Lista[i].Qtd;
                divqtd.classList.remove('vanish');
                btncart.classList.add('vanish');
            }
            
        }
    } catch (error) {
        alert("Check Cart = "+error);
    }
    
}

function QtdMais(ProdID)
{
    var Qtd = document.getElementById('qtd_'+ProdID);
    Qtd.textContent = parseInt(Qtd.textContent)+1;

    AddProduto(ProdID);
}
function QtdMenus(ProdID)
{
    var Qtd = document.getElementById('qtd_'+ProdID);
    Qtd.textContent = Qtd.textContent-1;

    AddProduto(ProdID);
}
