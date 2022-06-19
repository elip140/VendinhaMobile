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
        /*<div class="col">
                <div class="card">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Nome Produto</h5>
                        <p class="card-text">Preço</p>
                    </div>
                    <div class="card-footer">
                        <button onclick="myFunction()">Adicionar no Carrinho</button>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-danger" type="button">-</button>
                            </div>
                            <span class="input-group-text">1</span>
                            <div class="input-group-append">
                                <button class="btn btn-outline-success" type="button">+</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        */
        var ID = arrayObjects[i].ID;
        ListaIDs.push(ID);
        var cardProd = `<div class="col" id="divcol_`+ID+`">
                            <div class="card" id="divcard_`+ID+`">
                                <img src="`+arrayObjects[i].IMG+`" class="card-img-top" alt="..." id="img_`+ID+`">

                                <div class="card-body" id="divbody_`+ID+`">
                                    <h5 class="card-title" id="nome_`+ID+`">`+arrayObjects[i].Nome+`</h5>
                                    <p class="card-text" id="preco_`+ID+`">R$`+arrayObjects[i].Preco+`</p>
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
            url: 'Produtos/'+ProdID+'.json',
            contentType: 'application/json',
            cache: false,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var json = '{"ID": '+data.ID+', "Qtd": '+1+', "Nome":"'+data.Nome+'", "Preco":'+data.Preco+'}';
                try {
                    window.AppInventor.setWebViewString(json); 
                } catch (error) {
                    alert(error);
                    alert(json);
                }
                
            }
        });
    } catch (error) {
        console.log(error);
    }
}


function CheckCart()
{
    try {
        var Lista = window.AppInventor.getWebViewString();
        /*[
            {
                "ID": 6,
                "Nome":"Teste10",
                "Preco": 20.00,
                "Qtd":10
            },
            {
                "ID": 7,
                "Nome":"Teste3",
                "Preco": 69.69,
                "Qtd":1
            },
            {
                "ID": 100,
                "Nome":"Teste",
                "Preco": 10,
                "Qtd":1
            }
    ]*/
        alert(Lista);

        ListaIDs.forEach(item => {
            document.getElementById('divqtd_'+item).classList.add('vanish');
            document.getElementById('btncart_'+item).classList.remove('vanish');
        });
        
        Lista = eval(Lista);
        for(i=0; i<Lista.length; i++)
        {
            alert(Lista[i]);

            var qtd = document.getElementById('qtd_'+Lista[i].ID);
            var divqtd = document.getElementById('divqtd_'+Lista[i].ID);
            var btncart = document.getElementById('btncart_'+Lista[i].ID);

            alert(qtd+' - '+divqtd+' - '+btncart+' - ');
            if(qtd!=null && divqtd!=null && btncart!=null)
            {
                alert('Não Nulo');
                qtd.textContent = Lista[i].Qtd;
                divqtd.classList.remove('vanish');
                btncart.classList.add('vanish');
            }
            
        }
    } catch (error) {
        alert(error);
    }
    
}

function QtdMais(ProdID)
{
    var Qtd = document.getElementById('qtd_'+ProdID);
    Qtd.textContent = parseInt(Qtd.textContent)+1;

    if(Qtd.textContent>1)
    {
        var BtnMenus = document.getElementById('btnmenus_'+ProdID);
        BtnMenus.classList.remove("disabled");
        BtnMenus.classList.remove("btn-outline-dark");
        BtnMenus.classList.add("btn-outline-danger");
    }
    else
    {
        var BtnMenus = document.getElementById('btnmenus_'+ProdID);
        BtnMenus.classList.add("disabled");
        BtnMenus.classList.add("btn-outline-dark");
        BtnMenus.classList.remove("btn-outline-danger")
    }
    AddProduto(ProdID);
}
function QtdMenus(ProdID)
{
    var Qtd = document.getElementById('qtd_'+ProdID);
    Qtd.textContent = Qtd.textContent-1;

    if(Qtd.textContent>0)
    {
        var BtnMenus = document.getElementById('btnmenus_'+ProdID);
        BtnMenus.classList.remove("disabled");
        BtnMenus.classList.remove("btn-outline-dark");
        BtnMenus.classList.add("btn-outline-danger");
    }
    else
    {
        var BtnMenus = document.getElementById('btnmenus_'+ProdID);
        BtnMenus.classList.add("disabled");
        BtnMenus.classList.add("btn-outline-dark");
        BtnMenus.classList.remove("btn-outline-danger")
    }
    AddProduto(ProdID);
}
