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

public class GetUserClient {
  public static String toParameterString(Map<String, String> parameters) throws UnsupportedEncodingException {
    StringBuilder buffer = new StringBuilder();
    Iterator<Entry<String, String>> iterator = parameters.entrySet().iterator();
    while (iterator.hasNext()) {
      Entry<String, String> entry = iterator.next();
      if (buffer.length() == 0) {
        buffer.append("?");
      } else {
        buffer.append("&");
      }
      buffer.append(entry.getKey()).append("=").append(URLEncoder.encode(entry.getValue(), "UTF-8"));
    }
    
    return buffer.toString();
  }

  public static void main(String[] args) throws IOException {
    Gson gson = new GsonBuilder().create();
    String urlString = "https://localhost:9103/intelliq_api/admin/users";
    Map<String, String> parameters = new HashMap<String, String>();
    parameters.put("username", "${param.example}");
    urlString += toParameterString(parameters);
    CloseableHttpClient httpClient = HttpClients.createDefault();
    try {
      HttpGet httpMethod = new HttpGet(urlString);
      ResponseHandler<Void> responseHandler = new ResponseHandler<Void>() {
        @Override
        public Void handleResponse(final HttpResponse response) throws ClientProtocolException, IOException {
          int status = response.getStatusLine().getStatusCode();
          HttpEntity entity = response.getEntity();
          String result = entity != null ? EntityUtils.toString(entity) : null;
          if (status == 402) {
            No data no data = gson.fromJson(result, No data.class);
            // TODO process result
          } else if (status == 200) {
            useruser luseruser = gson.fromJson(result, useruser.class);
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