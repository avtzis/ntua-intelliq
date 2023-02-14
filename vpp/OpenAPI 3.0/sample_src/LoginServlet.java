import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Gson gson = new GsonBuilder().create();
    ServletInputStream inputStream = req.getInputStream();
    InputStreamReader reader = new InputStreamReader(inputStream);
    login.user luser;
    try {
      luser = gson.fromJson(reader, login.user.class);
    } finally {
      reader.close();
    }

    perform(luser);
  }

  private void perform(login.user luser) {
    throw new RuntimeException("Not implemented");
  }
}