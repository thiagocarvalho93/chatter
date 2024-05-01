using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Msn.Api.DTOs;
public record UserUpdateDTO(string? Password, string? Nickname, string? Subnick, string? ImageUrl);
