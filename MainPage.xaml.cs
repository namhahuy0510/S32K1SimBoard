namespace S32K1SimBoard;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
        
        // Không cần SetupWebView thủ công, Source đã định nghĩa ở XAML
    }

    // Sự kiện này kích hoạt khi JS gọi: window.HybridWebView.SendRawMessage("run-simulation")
    private async void OnRawMessageReceived(object sender, HybridWebViewRawMessageReceivedEventArgs e)
    {
        if (e.Message == "run-simulation")
        {
            await StartSimulation();
        }
    }

    private async Task StartSimulation()
    {
        // Logic Backend
        await DisplayAlert("Backend", "Đang khởi chạy giả lập S32K1...", "OK");

        // Gửi dữ liệu ngược lại UI (JS)
        await MyHybridView.EvaluateJavaScriptAsync("updateSensorValue('55cm')");
    }
}