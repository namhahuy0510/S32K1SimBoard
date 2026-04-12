using Microsoft.Maui.Controls;

namespace S32K1SimBoard;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
        SetupWebView();
    }

    private void SetupWebView()
    {
        // Nạp file index.html trực tiếp từ App Package
        // Lưu ý: Các file style.css, script.js, Image/... phải nằm cùng cấp hoặc đúng cấu trúc trong Resources/Raw
        MyWebView.Source = "index.html";

        // Lắng nghe các lệnh từ JavaScript gửi lên C#
        MyWebView.Navigating += OnWebViewNavigating;
    }

    private void OnWebViewNavigating(object sender, WebNavigatingEventArgs e)
    {
        // Ví dụ: Nhận lệnh chạy simulation từ nút bấm trong HTML
        if (e.Url.StartsWith("app://run-simulation"))
        {
            e.Cancel = true; // Ngăn chặn WebView chuyển hướng trang
            StartSimulation();
        }
    }

    private async void StartSimulation()
    {
        // Xử lý logic Backend tại đây (ví dụ điều khiển S32K1)
        await DisplayAlert("Backend", "Đang khởi chạy giả lập S32K1...", "OK");

        // Gửi dữ liệu ngược lại từ C# vào JavaScript (ví dụ cập nhật Live Output)
        await MyWebView.EvaluateJavaScriptAsync("updateSensorValue('55cm')");
    }
}