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
