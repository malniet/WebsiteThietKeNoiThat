using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIServer.Models;

namespace APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
         private readonly TSContext _context;
         
        public ProductController(TSContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return await _context.Products.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetE(int id)
        {
            var todoItem = await _context.Products.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
        [HttpPost]
        public async Task<ActionResult<Product>> Post(Product item)
        {
            _context.Products.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }
        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Product item)
        {
            
            var todoItem = await _context.Products.FirstOrDefaultAsync(x => x.id.Equals(id));
            if (todoItem == null)
            {
                return NotFound();
            }
           if (id != item.id)
            {
                return BadRequest();
            }
            todoItem.tensanpham = item.tensanpham;
            todoItem.dongia = item.dongia;
            todoItem.loaisanpham = item.loaisanpham;
            todoItem.hinhanh = item.hinhanh;
            todoItem.hienthi = item.hienthi;
            todoItem.soluong = item.soluong;
            await _context.SaveChangesAsync();
            return Ok();
            
        }
        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> Delete(int id)
        {
            var todoItem = await _context.Products.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Products.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }
    }
}