import static spark.Spark.*;

import dao.CourseDao;
import dao.DaoUtil;
import dao.InMemoryCourseDao;
import dao.InMemoryReviewDao;
import dao.ReviewDao;
import model.Course;
import model.Review;
import spark.ModelAndView;
import spark.template.handlebars.HandlebarsTemplateEngine;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WebServer {

  // This method is way too long now, but we will leave it as it is to keep the homework simple.
  public static void main(String[] args) {

    CourseDao courseDao = new InMemoryCourseDao();
    ReviewDao reviewDao = new InMemoryReviewDao();
    DaoUtil.addSampleReviews(courseDao, reviewDao);

    staticFiles.location("/public");

    // Map username "cookie" to "attribute" in case in future
    //  we use a different mechanics for getting the username
    //  (other than setting cookies)
    port(getHerokuAssignedPort());
    before(((request, response) -> {
      if (request.cookie("username") != null) {
        request.attribute("username", request.cookie("username"));
      }
    }));

    get("/", (req, res) -> {
      Map<String, String> model = new HashMap<>();
      model.put("username", req.attribute("username"));
      return new ModelAndView(model, "index.hbs");
    }, new HandlebarsTemplateEngine());

    post("/", (req, res) -> {
      String username = req.queryParams("username");
      res.cookie("username", username);
      res.redirect("/");
      return null;
    });

    before("/courses", (request, response) -> {
      if (request.attribute("username") == null) {
        response.redirect("/");
      }
    });

    get("/courses", (req, res) -> {
      Map<String, Object> model = new HashMap<>();
      model.put("courseList", courseDao.findAll());
      return new ModelAndView(model, "courses.hbs");
    }, new HandlebarsTemplateEngine());

    post("/courses", (req, res) -> {
      String name = req.queryParams("coursename");
      String url = req.queryParams("courseurl");
      courseDao.add(new Course(name, url));
      res.redirect("/courses");
      return null;
    }, new HandlebarsTemplateEngine());

    path("/courses", () -> {
      before("/*", (request, response) -> {
        if (request.attribute("username") == null) {
          response.redirect("/");
        }
      });

      get("/:id/reviews", ((request, response) -> {
        int id = Integer.parseInt(request.params("id"));
        Map<String, Object> model = new HashMap<>();
        List<Review> reviewList = reviewDao.findByCourseId(id);
        model.put("reviewList", reviewList);
        model.put("id", id);
        return new ModelAndView(model, "reviews.hbs");
      }), new HandlebarsTemplateEngine());

      post("/:id/reviews", ((request, response) -> {
        int courseId = Integer.parseInt(request.params("id"));
        int rating = Integer.parseInt(request.queryParams("rating"));
        String comment = request.queryParams("comment");
        reviewDao.add(new Review(courseId, rating, comment));
        response.redirect("/courses/" + courseId + "/reviews");
        return null;
      }), new HandlebarsTemplateEngine());
    });

    get("/signout", ((request, response) -> {
      response.removeCookie("username");
      response.redirect("/");
      return null;
    }), new HandlebarsTemplateEngine());
  }

  private static int getHerokuAssignedPort() {
    ProcessBuilder processBuilder = new ProcessBuilder();
    if (processBuilder.environment().get("PORT") != null) {
      return Integer.parseInt(processBuilder.environment().get("PORT"));
    }
    return 4567;
  }
}
