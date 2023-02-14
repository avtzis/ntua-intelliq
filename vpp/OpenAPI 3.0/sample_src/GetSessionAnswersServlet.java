import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.*;

@WebServlet("/getsessionanswers")
public class GetSessionAnswersServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Gson gson = new GsonBuilder().create();
    int questionnaireID = Integer.parseInt(req.getParameter("questionnaireID"));
    int session = Integer.parseInt(req.getParameter("session"));

    perform(questionnaireID, session);
  }

  private void perform(int questionnaireID, int session) {
    throw new RuntimeException("Not implemented");
  }
}