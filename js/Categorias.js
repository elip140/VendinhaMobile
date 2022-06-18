function ConverterJSONcat(json="", isString=false)
{
    // Recebe um JSON e gera os cards para cada os categorias
    if(!isString)
    {
        json = JSON.stringify(json);
    }

    var arrayObjects = eval(json);


    for(i=0; i<arrayObjects.length; i++)
    {
        /*<div class="col">
                <div class="card" onclick="myFunction()">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Categoria</h5>
                    </div>
                </div>
            </div>
        */ 
        var divcol = document.createElement("div");
        divcol.classList.add("col");

        var card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("onclick", 'ShowProdutos("'+arrayObjects[i].Nome+'")');


        var img = document.createElement("img");
        img.setAttribute("src", arrayObjects[i].IMG);
        img.classList.add("card-img-top");

        var cardbody = document.createElement("div");
        cardbody.classList.add("card-body");

        var prod_nome = document.createElement("h5");
        prod_nome.classList.add("card-title");
        prod_nome.appendChild(document.createTextNode(arrayObjects[i].Nome));

        var btn_cart = document.createElement("button");
        btn_cart.classList.add("btn","btn-primary");
        btn_cart.setAttribute("onclick", 'ShowProdutos("'+arrayObjects[i].Nome+'")');
        btn_cart.appendChild(document.createTextNode("Adicionar ao Carrinho"));



        cardbody.appendChild(prod_nome);
        cardbody.appendChild(btn_cart);

        card.appendChild(img);
        card.appendChild(cardbody);
        
        divcol.appendChild(card);

        var Lista = document.getElementById("Lista");
        Lista.appendChild(divcol);
    }
}

function ShowProdutos(cat)
{
    try {
        window.AppInventor.getWebViewString(cat);
    } catch (error) {
        alert(error);
    }

    sessionStorage.setItem('GlobalCategoria', cat);
    
    window.location.assign("Produtos.html");
}

