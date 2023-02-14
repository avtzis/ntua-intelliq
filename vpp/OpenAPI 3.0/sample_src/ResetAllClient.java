import java.io.*;
import org.apache.http.*;
import org.apache.http.client.*;
import org.apache.http.client.methods.*;
import org.apache.http.entity.*;
import org.apache.http.impl.client.*;
import org.apache.http.util.*;

import com.google.gson.*;

public class ResetAllClient {
  public static void main(String[] args) throws IOException {
    Gson gson = new GsonBuilder().create();
    String urlString = "https://localhost:9103/intelliq_api/admin/resetall";
    CloseableHttpClient httpClient = HttpClients.createDefault();
    try {
      HttpPost httpMethod = new HttpPost(urlString);
      httpMethod.setHeader("Content-Type", "application/json");
      httpMethod.setHeader("charset", "utf-8");
      ResponseHandler<Void> responseHandler = new ResponseHandler<Void>() {
        @Override
        public Void handleResponse(final HttpResponse response) throws ClientProtocolException, IOException {
          int status = response.getStatusLine().getStatusCode();
          HttpEntity entity = response.getEntity();
          String result = entity != null ? EntityUtils.toString(entity) : null;
          if (status == 500) {
            Internal server error internal server error = gson.fromJson(result, Internal server error.class);
            // TODO process result
          } else if (status == 200) {
            resetall lresetall = gson.fromJson(result, resetall.class);
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