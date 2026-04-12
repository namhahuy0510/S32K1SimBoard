using Microsoft.Maui.Controls;
using System.IO;

namespace S32K1SimBoard;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
        LoadHtmlFromRaw();
    }

    private async void LoadHtmlFromRaw()
    {
        using var stream = await FileSystem.OpenAppPackageFileAsync("index.html");
        using var reader = new StreamReader(stream);
        string html = reader.ReadToEnd();

        MyWebView.Source = new HtmlWebViewSource
        {
            Html = html
        };
    }
}
