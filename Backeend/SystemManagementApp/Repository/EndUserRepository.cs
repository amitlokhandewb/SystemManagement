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
            var updatedUser = new EndUser
            {
                Id = id,
                Email = updateEndUser.Email,
                PasswordHash = passwordHash,
                UserName = updateEndUser.UserName,
                RoleId = updateEndUser.RoleId,
            };
            _context.EndUsers.Update(updatedUser);
            await _context.SaveChangesAsync();
            return updatedUser;
        }
        public async Task<Boolean> DeleteEndUserAsync(int id)
        {
            var user = await _context.EndUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return false;
            }
            var updatedUser = new EndUser
            {
                Id = id,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                UserName = user.UserName,
                RoleId = user.RoleId,
                IsActive = false,
            };
            _context.EndUsers.Update(updatedUser);
            await _context.SaveChangesAsync();
            return true;


        }

    }
}
