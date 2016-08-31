using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using FileManager.Models;

namespace FileManager.Controllers
{
    public class DirsAndFilesController : ApiController
    {
        DirsAndFiles dirsInfo = new DirsAndFiles();

        [System.Web.Http.HttpPost]
        public DirsAndFiles GetDirsByDir([FromUri]string path)
        {
            string[] filePaths;
            string[] dirsPaths;
            try
            {
                //A way to get the right path for path with /..
                dirsInfo.CurrFilePath = new Uri(path).LocalPath;
                filePaths = Directory.GetFiles(dirsInfo.CurrFilePath);
                dirsPaths = Directory.GetDirectories(dirsInfo.CurrFilePath);
            }
            catch (Exception e)
            {
                //had to do this way, instead of async type of return field, because I found out the correct way too late
                dirsInfo.ErrorNumber = 1;
                dirsInfo.ErrorMessage = ". Possibly, it is not allowed for reading";
                return dirsInfo;
            }
            dirsInfo.ErrorNumber = 0;
            foreach (string dirPath in dirsPaths)
            {
                dirsInfo.ChildDirs.Add(Path.GetFileName(dirPath) + "\\");
            }
            FillFilesSizes(filePaths);
            return dirsInfo;
        }

        [System.Web.Http.Route("api/InitDirsAndFiles")]
        [System.Web.Http.AcceptVerbs("GET")]
        [System.Web.Http.HttpPost]
        public List<string> InitDirsAndFiles()
        {
            dirsInfo.CurrFilePath = "empty path";
            dirsInfo.ChildDirs = new List<string>();
            try
            {
                foreach (DriveInfo drive in DriveInfo.GetDrives())
                {
                    dirsInfo.ChildDirs.Add(drive.Name);
                }
            }
            catch (Exception ex) { }
            return dirsInfo.ChildDirs;
        }

        private void FillFilesSizes(string[] filePaths)
        {
            foreach (string filePath in filePaths)
            {
                FileInfo currFI = new FileInfo(filePath);
                //A way to check the access rights. Does not work, do not understand, why
                if ((currFI.Attributes & FileAttributes.System) == 0)
                {
                    long length = currFI.Length;
                    if (length <= 10485760)
                        dirsInfo.Less++;
                    else if (length > 10485760 && length <= 52428800)
                        dirsInfo.Interval++;
                    else if (length >= 104857600)
                        dirsInfo.More++;
                }
            }
        }
    }
}
