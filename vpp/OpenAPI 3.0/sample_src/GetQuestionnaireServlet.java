import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.*;

@WebServlet("/questionnaire")
public class GetQuestionnaireServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Gson gson = new GsonBuilder().create();
    int questionnaireID = Integer.parseInt(req.getParameter("questionnaireID"));

    perform(questionnaireID);
  }

  private void perform(int questionnaireID) {
    throw new RuntimeException("Not implemented");
  }
}