using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace FileManager.Models
{
    public class DirsAndFiles
    {
        public List<string> ChildDirs = new List<string>();
        public string CurrFilePath { get; set; } 
        public long Less { get; set; }
        public long Interval { get; set; }
        public long More { get; set; }
        public int ErrorNumber { get; set; }
        public string ErrorMessage { get; set; }
    }
}