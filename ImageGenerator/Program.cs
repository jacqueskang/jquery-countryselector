using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace ImageGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            string dir = Directory.GetCurrentDirectory();
            using (Bitmap b = new Bitmap(400, 240))
            {
                var css = new StringBuilder();
                using (Graphics dest = Graphics.FromImage(b))
                {
                    dest.Clear(Color.Transparent);

                    var di = new DirectoryInfo(dir);
                    int x = 2, y = 0;
                    foreach (var fi in di.GetFiles("*.png", SearchOption.AllDirectories))
                    {
                        string code = Path.GetFileNameWithoutExtension(fi.Name);
                        var img = Image.FromFile(fi.FullName);
                        if (img.Width == 16 && img.Height == 16)
                        {
                            dest.DrawImage(img, x, y);
                            css.AppendFormat(CultureInfo.InvariantCulture, ".{0}{{background-position:{1}px {2}px;}}", code, 2 - x, -y);
                            x += 20;
                            if (x >= 320)
                            {
                                y += 16;
                                x = 2;
                            }
                        }
                    }
                }

                string pngPath = Path.Combine(dir, "countries.png");
                if (File.Exists(pngPath))
                    File.Delete(pngPath);
                b.Save(pngPath, ImageFormat.Png);
                File.WriteAllText(Path.Combine(dir, "countries.css"), css.ToString());
            }
        }
    }
}
