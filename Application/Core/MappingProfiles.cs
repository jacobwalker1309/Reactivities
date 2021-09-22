using System.Linq;
using System.Diagnostics;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.Activity, Domain.Activity>();
            CreateMap<Domain.Activity, ActivityDTO>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee,Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}