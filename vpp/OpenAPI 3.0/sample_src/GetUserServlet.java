import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.*;

@WebServlet("/admin/users")
public class GetUserServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Gson gson = new GsonBuilder().create();
    int username = Integer.parseInt(req.getParameter("username"));

    perform(username);
  }

  private void perform(int username) {
    throw new RuntimeException("Not implemented");
  }
}