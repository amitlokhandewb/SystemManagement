﻿using System.ComponentModel.DataAnnotations.Schema;
using SystemManagementApp.Model;

namespace SystemManagementApp.DTOs
{
    public class CreateEventDTO
    {
        public int id { get; set; }
        public int eventDescription { get; set; }
        public int priority { get; set; }
        public string dateTime { get; set; }
        public int eventid { get; set; }
        public int eventType { get; set; }
        public int deviceTypeId { get; set; }
        public int actionBy { get; set; }
        public int plantId { get; set; }
    }
}