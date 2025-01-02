using Microsoft.EntityFrameworkCore;
using UrWave.Models;

namespace UrWave.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Models.Product> Products { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
