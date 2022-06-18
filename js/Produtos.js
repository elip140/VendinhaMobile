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
                    </div>
                </div>
            </div>
        */ 
        var divcol = document.createElement("div");
        divcol.classList.add("col");

        var card = document.createElement("div");
        card.classList.add("card");



        var img = document.createElement("img");
        img.setAttribute("src", arrayObjects[i].IMG);
        img.classList.add("card-img-top");



        var cardbody = document.createElement("div");
        cardbody.classList.add("card-body");

        var prod_nome = document.createElement("h5");
        prod_nome.classList.add("card-title");
        prod_nome.appendChild(document.createTextNode(arrayObjects[i].Nome));

        var prod_preco = document.createElement("p");
        prod_preco.classList.add("card-text");
        prod_preco.appendChild(document.createTextNode(arrayObjects[i].Descricao));



        var divfooter = document.createElement("div");
        divfooter.classList.add("card-footer");

        var btn_cart = document.createElement("button");
        btn_cart.classList.add("btn","btn-primary");
        btn_cart.setAttribute("onclick", "AddProduto("+arrayObjects[i].ID+")");
        btn_cart.appendChild(document.createTextNode("Adicionar ao Carrinho"));


        cardbody.appendChild(prod_nome);
        cardbody.appendChild(prod_preco);
        cardbody.appendChild(btn_cart);

        card.appendChild(img);
        card.appendChild(cardbody);
        
        divcol.appendChild(card);

        var Lista = document.getElementById("Lista");
        Lista.appendChild(divcol);
    }
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
                var json = '{"ID": '+data.ID+', "Qtd": '+1+', "Nome":"'+data.Nome+'", "Preco":'+data.Preco+'}'
                window.AppInventor.setWebViewString(json);
            }
        });
    } catch (error) {
        console.log(error);
    }


}
