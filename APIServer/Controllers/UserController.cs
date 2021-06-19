using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIServer.Models;
using System;
using MailKit;
using MailKit.Net.Smtp;
using MimeKit;

namespace APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TSContext _context;

        public UserController(TSContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await _context.Users.ToListAsync();
        }
        [HttpGet("{taikhoan}")]
        public async Task<ActionResult<User>> GetE(string taikhoan)
        {
            var todoItem = await _context.Users.FindAsync(taikhoan);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
        [HttpPost]
        public async Task<ActionResult<User>> Post(User item)
        {
            _context.Users.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }
        // PUT: api/TodoItems/5
        [HttpPut("{taikhoan}")]
        public async Task<IActionResult> Put(string taikhoan, User item)
        {

            var todoItem = await _context.Users.FirstOrDefaultAsync(x => x.taikhoan.Equals(taikhoan));
            if (todoItem == null)
            {
                return NotFound();
            }
            if (taikhoan != item.taikhoan)
            {
                return BadRequest();
            }
            todoItem.hovaten = item.hovaten;
            todoItem.email = item.email;
            todoItem.diachi = item.diachi;
            todoItem.sdt = item.sdt;
            await _context.SaveChangesAsync();
            return Ok();

        }
        // DELETE: api/TodoItems/5
        [HttpDelete("{username}")]
        public async Task<ActionResult<User>> Delete(string username)
        {
            var todoItem = await _context.Users.FindAsync(username);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Users.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }
        [Route("dangnhap")]
        [HttpPost]
        public async Task<ActionResult<User>> Login(User item)
        {
            User todoItem = await _context.Users.Where(x => x.taikhoan.Equals(item.taikhoan) && x.matkhau.Equals(item.matkhau)).FirstOrDefaultAsync();
            if (todoItem == null)
            {
                return NotFound();
            }
            return todoItem;
        }
        [Route("doimatkhau/{matkhaumoi}")]
        [HttpPost]
        public async Task<ActionResult<User>> dmk(User item, string mkm)
        {
            var todoItem1 = await _context.Users.FindAsync(item.taikhoan);
            if (todoItem1 == null)
            {
                return NotFound();
            }
            var todoItem = await _context.Users.FirstOrDefaultAsync(x => x.taikhoan.Equals(item.taikhoan) && x.matkhau.Equals(item.matkhau));
            if (todoItem == null)
            {
                return NotFound();
            }
            todoItem.matkhau = item.matkhau;
            await _context.SaveChangesAsync();
            return todoItem;
        }
        [Route("sendmail/{email}")]
        [HttpPost]
        public async Task<ActionResult> SendEmail(string email, Email mail)
        {
            // Khởi tạo minemessage
            var message1 = new MimeMessage();
            // From address
            message1.From.Add(new MailboxAddress("No reply", "tienlama2xxii1@gmail.com"));

            //To address
            message1.To.Add(new MailboxAddress("Malniet", email));
            //Subject
            message1.Subject = mail.subject;
            //Body
            message1.Body = new TextPart("plain")
            {
                Text = mail.noidung,
            };
            // Config và gửi mail
            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate("tienlama2xxii1@gmail.com", "Thanhtien123");
                client.Send(message1);
                client.Disconnect(true);
                return Ok();
            }
        }
    }
}