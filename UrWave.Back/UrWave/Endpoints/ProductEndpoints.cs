using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrWave.Context;
using UrWave.DTOs;
using UrWave.Models;
using UrWave.Product;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder routes)
    {


        var group = routes.MapGroup("/products");

        //get products
        group.MapGet("/", async (ApplicationDbContext db) =>
            await db.Products.ToListAsync())
            .WithName("GetAllProducts")
            .Produces<List<ProductDto>>(StatusCodes.Status200OK);

        //get product by id
        group.MapGet("/{id:int}", async Task<Results<Ok<ProductDto>, NotFound>> (int id, ApplicationDbContext db) =>
        {
            var product = await db.Products.FindAsync(id);
            return product != null ? TypedResults.Ok(new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CreatedDate = product.CreatedDate
            }) : TypedResults.NotFound();
        })
        .WithName("GetProductById")
        .Produces<ProductDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);


        group.MapPost("/", async Task<Results<Created<ProductDto>, BadRequest<List<string>>>> (CreateProductDto createProductDto, ApplicationDbContext db, IValidator<CreateProductDto> validator) =>
        {
            var validationResult = await validator.ValidateAsync(createProductDto);  

            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return TypedResults.BadRequest(errors); // Return errors in BadRequest
            }

            var product = new Product
            {
                Name = createProductDto.Name,
                Description = createProductDto.Description,
                Price = createProductDto.Price,
                CreatedDate = DateTime.UtcNow
            };

            db.Products.Add(product);
            await db.SaveChangesAsync();

            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CreatedDate = product.CreatedDate
            };

            return TypedResults.Created($"/products/{product.Id}", productDto);
        })
        .WithName("CreateProduct")
        .Produces<ProductDto>(StatusCodes.Status201Created)
        .Produces(StatusCodes.Status400BadRequest);

        //update product
        group.MapPut("/{id:int}", async Task<Results<NotFound,Ok<string>, BadRequest<List<string>>>> (int id, UpdateProductDto updateProductDto, ApplicationDbContext db, IValidator<UpdateProductDto> validator) =>
        {
            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return TypedResults.NotFound();
            }

            var validationResult = validator.Validate(updateProductDto);
            if (!validationResult.IsValid)
            {

                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return TypedResults.BadRequest(errors);
            }

            product.Name = updateProductDto.Name;
            product.Description = updateProductDto.Description;
            product.Price = updateProductDto.Price;

            await db.SaveChangesAsync();

            return TypedResults.Ok("The Product Updated Successfully!");
        })
        .WithName("UpdateProduct")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound)
        .Produces(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status200OK);

        //delete product
        group.MapDelete("/{id:int}", async Task<Results<Ok<string>, NotFound>> (int id, ApplicationDbContext db) =>
        {
            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return TypedResults.NotFound();
            }

            db.Products.Remove(product);
            await db.SaveChangesAsync();

            return TypedResults.Ok("The Product deleted Successfully!");
        })
        .WithName("DeleteProduct")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);
    }
}
