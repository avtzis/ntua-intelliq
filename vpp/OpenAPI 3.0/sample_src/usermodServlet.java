import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.*;

@WebServlet("/admin/usermod")
public class usermodServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Gson gson = new GsonBuilder().create();
    perform();
  }

  private void perform() {
    throw new RuntimeException("Not implemented");
  }
}