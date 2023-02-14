import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.*;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Gson gson = new GsonBuilder().create();
    ServletInputStream inputStream = req.getInputStream();
    InputStreamReader reader = new InputStreamReader(inputStream);
    user.in lin;
    try {
      lin = gson.fromJson(reader, user.in.class);
    } finally {
      reader.close();
    }

    perform(lin);
  }

  private void perform(user.in lin) {
    throw new RuntimeException("Not implemented");
  }
}