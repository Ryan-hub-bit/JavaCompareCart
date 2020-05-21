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

  public static void main(String[] args) {

    // To keep things simple, we use in-memory (no persistence) DAOs
    CourseDao courseDao = new InMemoryCourseDao();
    ReviewDao reviewDao = new InMemoryReviewDao();
    DaoUtil.addSampleReviews(courseDao, reviewDao);

    before("/courses/*", (request, response) -> {
      if (request.cookie("username") == null) {
        response.redirect("/");
      }
    });

    before("/courses", (request, response) -> {
      if (request.cookie("username") == null) {
        response.redirect("/");
      }
    });

    get("/", (req, res) -> {
      Map<String, String> model = new HashMap<>();
      model.put("username", req.cookie("username"));
      return new ModelAndView(model, "index.hbs");
    }, new HandlebarsTemplateEngine());

    post("/", (req, res) -> {
      String username = req.queryParams("username");
      res.cookie("username", username);
      res.redirect("/");
      return null;
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

    get("/signout", (req, res) -> {
      if (req.cookie("username") != null) {
        res.removeCookie("username");
      }
      res.redirect("/");
      return null;
    }, new HandlebarsTemplateEngine());

    get("/courses/:id/reviews", (req, res) -> {
      Map<String, Object> model = new HashMap<>();
      model.put("reviewList", reviewDao.findByCourseId(Integer.parseInt(req.params("id"))));
      model.put("courseId", req.params("id"));
      return new ModelAndView(model, "reviews.hbs");
    }, new HandlebarsTemplateEngine());

    post("/courses/:id/reviews", (req, res) -> {
      String rating = req.queryParams("inputRating");
      String comment = req.queryParams("inputComment");
      reviewDao.add(new Review(Integer.parseInt(req.params("id")), Integer.parseInt(rating), comment));
      res.redirect("/courses/" + req.params("id") + "/reviews");
      return null;
    }, new HandlebarsTemplateEngine());
  }
}
