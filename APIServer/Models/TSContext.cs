
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using APIServer.Models;
public class TSContext:DbContext  
{  
    public TSContext(DbContextOptions<TSContext> options):base(options)  
    {  
              
    }  
    public DbSet<User> Users { get; set; }
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<BillDetail> BillDetails { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BillDetail>()
            .HasKey(e => new { e.idBill, e.idP });
    }
}  