package com.zrh.hedao;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
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

import com.zrh.hedao.activity.CKJHActivity;
import com.zrh.hedao.activity.DCJLActivity;
import com.zrh.hedao.activity.JLSBActivity;
import com.zrh.hedao.activity.JsInterface;
import com.zrh.hedao.activity.SJCKActivity;

public class MainActivity extends Activity {

    private WebView  webView;
    private JsInterface JSInterface2 = new JsInterface();
    private Context  context;
    private Activity activity;
    private String url = "file:///android_asset/index.html";
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        context = this;
        activity = this;
        initView();
    }
    //找控件
    private void initView() {
        webView = (WebView) findViewById(R.id.main_web);
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
        webView.setWebViewClient(new MainWebViewClient());
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        webView.addJavascriptInterface(JSInterface2,"JSInterface2");
        webView.loadUrl(url);
    }

    class MainWebViewClient extends WebViewClient {
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
            if (JSInterface2.MAIN2PAGE.equals("sjck")) {
            Intent intent = new Intent(activity, SJCKActivity.class);
            startActivity(intent);
            }else if (JSInterface2.MAIN2PAGE.equals("ckjh")){
                Intent intent = new Intent(activity, CKJHActivity.class);
                startActivity(intent);
            }else if (JSInterface2.MAIN2PAGE.equals("jlsb")){
                Intent intent = new Intent(activity, JLSBActivity.class);
                startActivity(intent);
            }else if (JSInterface2.MAIN2PAGE.equals("dcjl")){
                Intent intent = new Intent(activity, DCJLActivity.class);
                startActivity(intent);
            }
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
