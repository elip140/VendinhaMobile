using System.Net;
using System.IO;




// Call asynchronous network methods in a try/catch block to handle exceptions.
HttpClient client = new HttpClient();
try	
{
    HttpResponseMessage response = await client.GetAsync("https://elip140.github.io/VendinhaMobile/Data2.json");
    response.EnsureSuccessStatusCode();
    string responseBody = await response.Content.ReadAsStringAsync();
    // Above three lines can be replaced with new helper method below
    // string responseBody = await client.GetStringAsync(uri);

    Console.WriteLine(responseBody);
}
catch(HttpRequestException e)
{
    Console.WriteLine("\nException Caught!");	
    Console.WriteLine("Message :{0} ",e.Message);
}

