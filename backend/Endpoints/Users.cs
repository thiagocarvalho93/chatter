using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Msn.Api.Data;
using Msn.Api.DTOs;
using Msn.Api.Filters;
using Msn.Api.Models;
using Msn.Api.Services;

namespace Msn.Api.Endpoints;

public static class Users
{
    public static void RegisterUserEndpoints(this IEndpointRouteBuilder routes)
    {
        var users = routes.MapGroup("api/v1/users");

        users.MapGet("login-temp", ([FromQuery] string name, TokenService tokenService, DataContext db) =>
        {
            if (name == null)
            {
                return Results.BadRequest("Invalid name");
            }

            var token = tokenService.GenerateToken(name);

            return Results.Ok(token);
        });

        //     users.MapGet("", async (DataContext db) => await db.Users.ToListAsync())
        //         .CacheOutput();

        //     users.MapGet("/{id}", async (int id, DataContext db) =>
        //     {
        //         var user = await db.Users.FindAsync(id);

        //         return user is not null ? Results.Ok(user) : Results.NotFound();
        //     })
        //     .CacheOutput(x => x.SetVaryByQuery("id"));

        //     users.MapPost("", async (UserRegisterDTO dto, DataContext db) =>
        //     {
        //         User user = new()
        //         {
        //             Email = dto.Email,
        //             HashedPassword = dto.Password,
        //             Nickname = dto.Email
        //         };
        //         db.Users.Add(user);
        //         await db.SaveChangesAsync();

        //         return Results.Created($"api/v1/users/{user.Id}", user);
        //     })
        //     .AddEndpointFilter<ValidationFilter<UserRegisterDTO>>();

        //     users.MapPost("login", async (UserRegisterDTO dto, DataContext db) =>
        //     {
        //         var user = await db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.HashedPassword == dto.Password);
        //         if (user != null)
        //         {
        //             return Results.Ok("Authentication successful");
        //         }
        //         else
        //         {
        //             return Results.NotFound("User not found or password incorrect");
        //         }
        //     });


        //     users.MapPatch("/{id}", async (int id, UserUpdateDTO dto, DataContext db) =>
        //     {
        //         var user = await db.Users.FindAsync(id);
        //         if (user != null)
        //         {
        //             user.HashedPassword = dto.Password ?? user.HashedPassword;
        //             user.Nickname = dto.Nickname ?? user.Nickname;
        //             user.Subnick = dto.Subnick ?? user.Subnick;
        //             user.ImageUrl = dto.ImageUrl ?? user.ImageUrl;

        //             await db.SaveChangesAsync();
        //             return Results.Ok(user);
        //         }
        //         else
        //         {
        //             return Results.NotFound();
        //         }
        //     });

        //     users.MapDelete("/{id}", async (int id, DataContext db) =>
        //     {
        //         if (await db.Users.FindAsync(id) is User user)
        //         {
        //             db.Users.Remove(user);
        //             await db.SaveChangesAsync();
        //             return Results.NoContent();
        //         }

        //         return Results.NotFound();
        //     });
    }
}