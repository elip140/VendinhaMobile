function ConverterJSONprod(json="", isString=false)
{
    if(!isString)
    {
        json = JSON.stringify(json);
    }

    var arrayObjects = eval(json);

    //alert(json);

    for(i=0; i<arrayObjects.length; i++)
    {
        /*<div class="col">
                <div class="card">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Nome Produto</h5>
                        <p class="card-text">Preço</p>
                        <button onclick="myFunction()">Click me</button>
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

        var btn_cart = document.createElement("button");
        btn_cart.classList.add("btn","btn-primary");
        btn_cart.setAttribute("onclick", "Function("+arrayObjects[i].ID+")");
        btn_cart.appendChild(document.createTextNode("Adicionar ao Carrinho"));


        cardbody.appendChild(prod_nome);
        cardbody.appendChild(prod_preco);
        cardbody.appendChild(btn_cart);

        card.appendChild(img);
        card.appendChild(cardbody);
        
        divcol.appendChild(card);

        var Lista = document.getElementById("Lista");
        Lista.appendChild(divcol);
         
        //alert(arrayObjects[i].ID);
    }

            
    //document.getElementById("DataTeste").innerHTML = obj.employees[1].firstName + " " + obj.employees[1].lastName;
}
