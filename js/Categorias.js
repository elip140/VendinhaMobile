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
        var cardCat = `<div class="col">
                            <div class="card" onClick="ShowProdutos('`+arrayObjects[i].nome+`')">
                                <img src="`+arrayObjects[i].img+`" class="card-img-top" alt="..." style="width: 200px;">

                                <div class="card-body">
                                    <h5 class="card-title">`+arrayObjects[i].nome+`</h5>
                                </div>
                            </div>
                        </div>`;

        var Lista = document.getElementById("Lista");
        Lista.innerHTML += cardCat;
    }
}

function ShowProdutos(cat)
{
    sessionStorage.setItem('GlobalCategoria', cat);
    
    window.location.assign("produtos.html");
}

