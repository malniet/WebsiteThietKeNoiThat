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
    public class CategoryController : ControllerBase
    {
         private readonly TSContext _context;
         
        public CategoryController(TSContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> Get()
        {
            return await _context.Categories.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetE(int id)
        {
            var todoItem = await _context.Categories.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
        [HttpPost]
        public async Task<ActionResult<Category>> Post(Category item)
        {
            _context.Categories.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }
        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Category item)
        {
            
            var todoItem = await _context.Categories.FirstOrDefaultAsync(x => x.id.Equals(id));
            if (todoItem == null)
            {
                return NotFound();
            }
           if (id != item.id)
            {
                return BadRequest();
            }
            todoItem.tendanhmuc = item.tendanhmuc;
            await _context.SaveChangesAsync();
            return Ok();
            
        }
        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> Delete(int id)
        {
            var todoItem = await _context.Categories.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }
    }
}