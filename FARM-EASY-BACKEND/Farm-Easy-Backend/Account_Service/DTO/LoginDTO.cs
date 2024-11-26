﻿using System.ComponentModel.DataAnnotations;

namespace Account_Service.DTO
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

    }
}
