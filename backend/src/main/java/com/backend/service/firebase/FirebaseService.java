package com.backend.service.firebase;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonParseException;

import java.io.IOException;

public interface FirebaseService {
    void sendMessageTo(String targetToken, String title, String body) throws IOException;

}
