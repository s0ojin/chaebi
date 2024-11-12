package com.backend;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class AddressAPIExample {
    public static void main(String[] args) {
        String apikey = "D22BF037-70CE-3B49-801E-7886827E6AEF";  // 발급받은 API 키 입력
        String searchType = "road";
        String searchPoint = "127.101313354,37.402352535";
        String epsg = "epsg:4326";

        StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
        sb.append("?service=address");
        sb.append("&request=getaddress");
        sb.append("&format=json");
        sb.append("&crs=" + epsg);
        sb.append("&key=" + apikey);
        sb.append("&type=" + searchType);
        sb.append("&point=" + searchPoint);

        try {
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(sb.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONObject jsrs = (JSONObject) jsob.get("response");
            JSONArray jsonArray = (JSONArray) jsrs.get("result");
            JSONObject jsonfor;
            for (int i = 0; i < jsonArray.size(); i++) {
                jsonfor = (JSONObject) jsonArray.get(i);
                System.out.println(jsonfor.get("text"));
            }
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
}

