using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class EndUserRepository
    {
        private readonly AppDbContext _context;

        public EndUserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EndUser>> GetEndUsersAsync()
        {
            return await _context.EndUsers.ToListAsync();
        }
        public async Task<EndUser> GetEndUserByIdAsync(int id)
        {
            var response = await _context.EndUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (response == null)
            {
                return null;
            }
            return response;

        }
        public async Task<EndUser> GetEndUserByUserNameAsync(string  username)
        {
            var response = await _context.EndUsers.FirstOrDefaultAsync(x => x.UserName == username);
            if (response == null)
            {
                return null;
            }
            return response;

        } 
        public async Task<EndUser> GetEndUserByEmailAsync(string  email)
        {
            var response = await _context.EndUsers.FirstOrDefaultAsync(x => x.Email == email);
            if (response == null)
            {
                return null;
            }
            return response;

        }
        public async Task<EndUser> CreateEndUserAsync(CreateEndUser createEndUser)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(createEndUser.PasswordHash);
            var NewUser = new EndUser
            {
                Email = createEndUser.Email,
                PasswordHash = passwordHash,    
                UserName = createEndUser.UserName,
                RoleId = createEndUser.RoleId,
                IsActive = true
            };
            _context.EndUsers.Add(NewUser);
            await _context.SaveChangesAsync();
            return NewUser;
        }
        public async Task<EndUser> UpdateEndUserAsync(CreateEndUser updateEndUser, int id)
        {
            var user = await _context.EndUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return null;
            }
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(updateEndUser.PasswordHash);

            user.Email = updateEndUser.Email;
            user.UserName = updateEndUser.UserName;
            user.RoleId = updateEndUser.RoleId;
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<EndUser> ToggleEndUserAsync(bool toggledata, int id)
        {
            var user = await _context.EndUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return null;
            }

            user.IsActive = toggledata;
            await _context.SaveChangesAsync();

            return user;
        }
        public async Task<Boolean> DeleteEndUserAsync(int id)
        {
            var user = await _context.EndUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return false;
            }
            _context.EndUsers.Remove(user);
            await _context.SaveChangesAsync();
            return true;


        }

    }
}
