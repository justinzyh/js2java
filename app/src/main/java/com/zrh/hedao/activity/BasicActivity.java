package com.zrh.hedao.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class BasicActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    public void setIntent2Activity(Class cl){
        Intent intent = new Intent(getApplicationContext(), cl);
        startActivity(intent);
    }

}
