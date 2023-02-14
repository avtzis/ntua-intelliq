import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.*;

@WebServlet("/question")
public class GetQuestionServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Gson gson = new GsonBuilder().create();
    int questionnaireID = Integer.parseInt(req.getParameter("questionnaireID"));
    int questionID = Integer.parseInt(req.getParameter("questionID"));

    perform(questionnaireID, questionID);
  }

  private void perform(int questionnaireID, int questionID) {
    throw new RuntimeException("Not implemented");
  }
}