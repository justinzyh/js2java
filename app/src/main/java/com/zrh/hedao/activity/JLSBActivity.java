package com.zrh.hedao.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.zrh.hedao.R;

public class JLSBActivity extends AppCompatActivity implements View.OnClickListener {

    private ImageView mBack;
    private TextView mTitle;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_jlsb);

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
        mTitle.setText("记录上报");
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.title_bar_back:
                this.finish();
                break;
        }
    }
}
