package com.zrh.hedao.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.JsResult;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.zrh.hedao.R;

public class CJJHActivity extends Activity {

    private WebView webView;
    private JsInterface JSInterface2 = new JsInterface();
    private Context  context;
    private Activity activity;
    private String url = "file:///android_asset/html/cjjh.html";
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cjjh);
        context = this;
        activity = this;
        initView();
    }
    //找控件
    private void initView() {
        webView = (WebView) findViewById(R.id.cjjh_web);
        initWebView();
    }

    //判断sdk 加载webview
    @SuppressLint("NewApi")
    private void initWebView() {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT){
            WebView.setWebContentsDebuggingEnabled(true);
        }
        if (Build.VERSION.SDK_INT >= 19) {
            webView.getSettings().setCacheMode(
                    WebSettings.LOAD_CACHE_ELSE_NETWORK);
        }
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                super.onProgressChanged(view, newProgress);
                activity.setTitle("拼命加载中...");
                activity.setProgress(newProgress * 100);
                if (newProgress == 100) {
                    activity.setTitle(R.string.main_title);
                }
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message,
                                     JsResult result) {
                return super.onJsAlert(view, url, message, result);
            }
        });
        webView.setWebViewClient(new CjjhWebViewClient());
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        webView.addJavascriptInterface(JSInterface2,"JSInterface2");
        webView.loadUrl(url);
    }

    class CjjhWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view,
                                                String url_Turntable) {
            view.loadUrl(url_Turntable);
            return true;
        }

        @Override
        public void onReceivedSslError(WebView view, SslErrorHandler handler,
                                       SslError error) {
            handler.proceed();
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
        }
        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            JSInterface2.setWvClientClickListener(new webviewClick());//这里就是js调用java端的具体实现
        }
    }
    class webviewClick implements JsInterface.wvClientClickListener {
        @Override
        public void wvHasClickEnvent() {
            // TODO Auto-generated method stub
            Toast.makeText(getBaseContext(),"helloworld",Toast.LENGTH_SHORT).show();
        }
    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
