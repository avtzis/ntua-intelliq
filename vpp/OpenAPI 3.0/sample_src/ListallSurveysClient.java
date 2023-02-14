import java.io.*;
import java.net.*;
import java.util.*;
import java.util.Map.Entry;
import org.apache.http.*;
import org.apache.http.client.*;
import org.apache.http.client.methods.*;
import org.apache.http.entity.*;
import org.apache.http.impl.client.*;
import org.apache.http.util.*;

import com.google.gson.*;

public class ListallSurveysClient {
  public static void main(String[] args) throws IOException {
    Gson gson = new GsonBuilder().create();
    String urlString = "https://localhost:9103/intelliq_api/surveys";
    CloseableHttpClient httpClient = HttpClients.createDefault();
    try {
      HttpGet httpMethod = new HttpGet(urlString);
      ResponseHandler<Void> responseHandler = new ResponseHandler<Void>() {
        @Override
        public Void handleResponse(final HttpResponse response) throws ClientProtocolException, IOException {
          int status = response.getStatusLine().getStatusCode();
          HttpEntity entity = response.getEntity();
          String result = entity != null ? EntityUtils.toString(entity) : null;
          if (status == 200) {
            all.surveys[] lsurveyses = gson.fromJson(result, all.surveys[].class);
            // TODO process result
          } else {
            throw new ClientProtocolException("Unexpected response status: " + status);
          }
          return null;
        }
      };
      httpClient.execute(httpMethod, responseHandler);
    } finally {
      httpClient.close();
    }
  }
}