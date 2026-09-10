var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();

var movies = new Movie[]
{
    new(1, "Avengers EndGame"),
    new(2, "Avengers DoomsDag"),
    new(3, "Lord of the Dicks"),
    new(4, "The Dark Knight")
};


app.MapGet("/getMovies", () => movies)
   .WithName("Movies");

app.Run();

record Movie(int Id, string Title);


