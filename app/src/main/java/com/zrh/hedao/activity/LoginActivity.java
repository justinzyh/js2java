package com.zrh.hedao.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.JsResult;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.zrh.hedao.R;

public class LoginActivity extends AppCompatActivity {

    private Context  context;
    private Activity activity;
    private WebView  webView;
    private JsInterface JSInterface2 = new JsInterface();
    private String      url          = "file:///android_asset/login.html";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        context = this;
        activity = this;
        initView();
    }

    //找控件
    private void initView() {
        webView = (WebView) findViewById(R.id.wv_login);
        initWebView();
    }

    //判断sdk 加载webview
    @SuppressLint("NewApi")
    private void initWebView() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
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
        webView.setWebViewClient(new LoginWebViewClient());
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        webView.addJavascriptInterface(JSInterface2, "JSInterface2");
        webView.loadUrl(url);
    }

    class LoginWebViewClient extends WebViewClient {
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
    //        JSInterface2.setWvClientClickListener(new webviewClick());//这里就是js调用java端的具体实现
        }
    }
}

