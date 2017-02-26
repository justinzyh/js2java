package com.zrh.hedao.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.zrh.hedao.R;

public class CKJHActivity extends AppCompatActivity implements View.OnClickListener {

    private ImageView mBack;
    private TextView mTitle;
    private LinearLayout mLl;
    private ImageView mNew;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ckjh);

        init();
    }

    private void init() {
        initView();//查找控件
        initData();//初始化数据
    }

    private void initData() {

    }

    private void initView() {
        //toolbar
        mBack = (ImageView) findViewById(R.id.title_bar_back);
        mBack.setOnClickListener(this);
        mTitle = (TextView) findViewById(R.id.title_toolbar);
        mTitle.setText("查看计划");
        mNew = (ImageView) findViewById(R.id.title_bar_new);
        mNew.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.title_bar_back:
                this.finish();
                break;
            case R.id.title_bar_new:
                Intent intent = new Intent(this, CJJHActivity.class);
                startActivity(intent);
                break;
        }
    }
}
