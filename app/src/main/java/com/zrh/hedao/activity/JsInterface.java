package com.zrh.hedao.activity;

import android.webkit.JavascriptInterface;

public class JsInterface {
    public static String MAIN2PAGE;

    /*interface for javascript to invokes*/
    public interface wvClientClickListener {
        public void wvHasClickEnvent();
    }

    private wvClientClickListener wvEnventPro = null;

    public void setWvClientClickListener(wvClientClickListener listener) {
        wvEnventPro = listener;
    }

    @JavascriptInterface  //这个注解很重要
    public void javaSJCKFunction() {
        MAIN2PAGE = "sjck";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaCKJHFunction() {
        MAIN2PAGE = "ckjh";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaDCJLFunction() {
        MAIN2PAGE = "dcjl";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaJLSBFunction() {
        MAIN2PAGE = "jlsb";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaCJJHFunction() {
        MAIN2PAGE = "cjjh";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaDrafterFunction() {
        MAIN2PAGE = "contentDrafter";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaCameraFunction() {
        MAIN2PAGE = "contentCamera";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaVideoFunction() {
        MAIN2PAGE ="contentVideo";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }

    @JavascriptInterface  //这个注解很重要
    public void javaRecordFunction() {
        MAIN2PAGE = "contentRecord";
        if (wvEnventPro != null)
            wvEnventPro.wvHasClickEnvent();
    }
}  