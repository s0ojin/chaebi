package com.backend.service.address;

import com.backend.dto.Location;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final String apikey = "D22BF037-70CE-3B49-801E-7886827E6AEF";
    private final String searchType = "road";
    private final String epsg = "epsg:4326";

    @Override
    public String addAddress(Location location) {
        StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
        sb.append("?service=address");
        sb.append("&request=getaddress");
        sb.append("&format=json");
        sb.append("&crs=" + epsg);
        sb.append("&key=" + apikey);
        sb.append("&type=" + searchType);
        sb.append("&point=" + location.getLongitude() + "," + location.getLatitude());

        try {
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(
                    new InputStreamReader(new URL(sb.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONObject jsrs = (JSONObject) jsob.get("response");
            JSONArray jsonArray = (JSONArray) jsrs.get("result");

            if (jsonArray != null && !jsonArray.isEmpty()) {
                StringBuilder address = new StringBuilder();
                JSONObject jsonfor = (JSONObject) jsonArray.get(0);
                JSONObject structure = (JSONObject) jsonfor.get("structure");

                address.append(structure.get("level0")).append(" ");
                address.append(structure.get("level1")).append(" ");
                address.append(structure.get("level2"));

                return address.toString();
            }

            return null;  // 결과가 없는 경우 null 반환

        } catch (IOException | ParseException e) {
            System.out.println("주소 변환 중 오류 발생: " + e.getMessage());
            return null;  // 에러 발생시 null 반환
        }
    }
}