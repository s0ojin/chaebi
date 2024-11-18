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
    private final String apikey = "D22BF037-70CE-3B49-801E-7886827E6AEF";  // 발급받은 API 키 입력
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
        sb.append("&point=" + location.getLongitude()   + "," + location.getLatitude()); //경도 + 위도
        StringBuilder address = new StringBuilder(); // address를 try 바깥에 선언

        try {
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(sb.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONObject jsrs = (JSONObject) jsob.get("response");
            JSONArray jsonArray = (JSONArray) jsrs.get("result");

            for (Object obj : jsonArray) {
                JSONObject jsonfor = (JSONObject) obj;
                JSONObject structure = (JSONObject) jsonfor.get("structure");

                // level0 to level2 구성
                address.append(structure.get("level0")).append(" ");
                address.append(structure.get("level1")).append(" ");
                address.append(structure.get("level2"));

                System.out.println(address.toString());
                break; // 한 번만 값을 설정하고 루프를 빠져나갑니다.
            }

            // 비어 있는 경우 처리
            if (address.length() == 0) {
                address.append("주소 정보가 없습니다.");
            }

            return address.toString();
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
