(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postModifyPassword = exports.editArticle = exports.publishArticle = exports.deleteArticle = exports.postArticle = exports.reviewApplication = exports.deleteApplication = exports.approveApplication = exports.deleteContributor = exports.getContributors = exports.getReviewedApplications = exports.getUnreviewedApplications = exports.postApply = exports.getEndpoints = exports.getNewToken = exports.postSignIn = exports.getUnpublishedArticles = exports.getArticlesByCategory = exports.getCategories = exports.getSingleArticle = exports.getArticles = void 0;

var _helpers = require("../helpers.js");

var DEV_API_URL = "http://localhost:5000/dsc-blog-c97d3/us-central1/app";
var API_URL = "https://us-central1-dsc-blog-c97d3.cloudfunctions.net/app";

var getArticles = function getArticles() {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles"),
    method: "get"
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getArticles = getArticles;

var getSingleArticle = function getSingleArticle(aid) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles/").concat(aid),
    method: "get"
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getSingleArticle = getSingleArticle;

var getCategories = function getCategories() {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/categories"),
    method: "get"
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getCategories = getCategories;

var getArticlesByCategory = function getArticlesByCategory(cid) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles/category/").concat(cid),
    method: "get"
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getArticlesByCategory = getArticlesByCategory;

var getUnpublishedArticles = function getUnpublishedArticles() {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles/unpublished"),
    method: "get",
    authToken: localStorage.getItem("token") || ""
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getUnpublishedArticles = getUnpublishedArticles;

var postSignIn = function postSignIn(e) {
  e.preventDefault();
  var form = new FormData(e.target);
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/users/auth/login"),
    method: "post",
    data: JSON.stringify({
      email: form.get("email"),
      password: form.get("password")
    })
  }).then(function (res) {
    console.log(res);
    (0, _helpers.sAlert)({
      title: res.popup || "Something went wrong",
      message: res.message,
      type: res.success ? "success" : "error"
    });

    if (res.token) {
      var expTime = new Date().getTime() + 86400 * 1000;
      localStorage.setItem("token", res.token);
      localStorage.setItem("exp", expTime);
      localStorage.setItem("refresh", JSON.stringify({
        refreshToken: res.refreshToken,
        uid: res.uid
      }));
      window.location.href = "/dashboard.html";
    }
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.postSignIn = postSignIn;

var getNewToken = function getNewToken(tokenData) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/users/auth/refresh_token"),
    method: "post",
    data: tokenData
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getNewToken = getNewToken;

var getEndpoints = function getEndpoints() {
  return (0, _helpers.requestData)("".concat(API_URL, "/endpoints"), "get")["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getEndpoints = getEndpoints;

var postApply = function postApply(e) {
  e.preventDefault();
  var form = new FormData(e.target);
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/applications/contributor"),
    method: "post",
    data: JSON.stringify({
      firstname: form.get("firstname"),
      lastname: form.get("lastname"),
      email: form.get("email"),
      reason: form.get("reason")
    })
  }).then(function (res) {
    console.log(res);
    (0, _helpers.sAlert)({
      title: res.success ? "Application Sent" : "Something went wrong",
      message: res.message,
      type: res.success ? "success" : "error"
    });

    if (res.success) {
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    }
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.postApply = postApply;

var getUnreviewedApplications = function getUnreviewedApplications() {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/applications"),
    method: "get",
    authToken: localStorage.getItem("token") || ""
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getUnreviewedApplications = getUnreviewedApplications;

var getReviewedApplications = function getReviewedApplications() {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/applications/reviewed"),
    method: "get",
    authToken: localStorage.getItem("token") || ""
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getReviewedApplications = getReviewedApplications;

var getContributors = function getContributors() {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/contributors"),
    method: "get",
    authToken: localStorage.getItem("token") || ""
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.getContributors = getContributors;

var deleteContributor = function deleteContributor(id) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/contributors/").concat(id),
    method: "delete",
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    (0, _helpers.sAlert)({
      title: res.message,
      message: "Done",
      type: res.success ? "success" : "error"
    });
    return res.success;
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.deleteContributor = deleteContributor;

var approveApplication = function approveApplication(id) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/applications/approve"),
    method: "post",
    data: JSON.stringify({
      conid: id
    }),
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    (0, _helpers.sAlert)({
      title: res.message,
      message: "Done",
      type: res.success ? "success" : "error"
    });
    return res.success;
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.approveApplication = approveApplication;

var deleteApplication = function deleteApplication(id) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/applications/").concat(id),
    method: "delete",
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    (0, _helpers.sAlert)({
      title: res.message,
      message: "Done",
      type: res.success ? "success" : "error"
    });
    return res.success;
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.deleteApplication = deleteApplication;

var reviewApplication = function reviewApplication(id) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/applications"),
    method: "patch",
    data: JSON.stringify({
      appid: id
    }),
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    (0, _helpers.sAlert)({
      title: res.message,
      message: "Done",
      type: res.success ? "success" : "error"
    });
    return res.success;
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.reviewApplication = reviewApplication;

var postArticle = function postArticle(e) {
  e.preventDefault();
  var form = new FormData(e.target);
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles"),
    method: "post",
    data: form,
    type: "form-data",
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    console.log(res);
    (0, _helpers.sAlert)({
      title: res.success ? "Article Sent for Review" : "Something went wrong",
      message: res.message,
      type: res.success ? "success" : "error"
    });

    if (res.success) {
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    }
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.postArticle = postArticle;

var deleteArticle = function deleteArticle(id) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles/").concat(id),
    method: "delete",
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    (0, _helpers.sAlert)({
      title: res.message,
      message: "Done",
      type: res.success ? "success" : "error"
    });
    return res.success;
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.deleteArticle = deleteArticle;

var publishArticle = function publishArticle(id) {
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles/publish"),
    method: "patch",
    data: JSON.stringify({
      aid: id
    }),
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    (0, _helpers.sAlert)({
      title: res.message,
      message: "Done",
      type: res.success ? "success" : "error"
    });
    return res.success;
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.publishArticle = publishArticle;

var editArticle = function editArticle(e, aid) {
  e.preventDefault();
  var form = new FormData(e.target);

  if (form.get("image").name === "") {
    form["delete"]("image");
  }

  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/articles/edit/").concat(aid),
    method: "put",
    data: form,
    type: "form-data",
    authToken: localStorage.getItem("token") || ""
  }).then(function (res) {
    (0, _helpers.sAlert)({
      title: res.success ? "Article Edited" : "Something went wrong",
      message: res.message,
      type: res.success ? "success" : "error"
    });

    if (res.success) {
      setTimeout(function () {
        window.location.href = "/dashboard.html";
      }, 1500);
    }
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.editArticle = editArticle;

var postModifyPassword = function postModifyPassword(e) {
  e.preventDefault();
  var form = new FormData(e.target);

  if (form.get("password") !== form.get("confirm_password")) {
    (0, _helpers.sAlert)({
      title: "Passwords don't match",
      message: "Check Passwords",
      type: "error"
    });
    return;
  }

  var urlParams = new URLSearchParams(window.location.search);
  return (0, _helpers.requestData)({
    url: "".concat(API_URL, "/users/auth/password"),
    method: "post",
    data: JSON.stringify({
      password: form.get("password"),
      token: urlParams.get('token'),
      email: urlParams.get('email')
    })
  }).then(function (res) {
    console.log(res);
    (0, _helpers.sAlert)({
      title: res.success ? "Password Modified" : "Something went wrong",
      message: res.message,
      type: res.success ? "success" : "error"
    });

    if (res.success) {
      setTimeout(function () {
        window.location.href = "/sign_in.html";
      }, 1500);
    }
  })["catch"](function (error) {
    console.log("Error Msg: " + error.message);
    console.log(error.stack);
  });
};

exports.postModifyPassword = postModifyPassword;

},{"../helpers.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.refreshAuthState = exports.isLoggedIn = exports.setupArticlesActions = exports.setupContributorActions = exports.setupApplicationActions = exports.setupPostClickEventListeners = exports.setupCategoryClickEventListeners = exports.onLoadDashboardApplications = exports.onLoadDashboardContributors = exports.onLoadDashboardArticles = exports.onLoadCategoryArticles = exports.handleDeleteArticle = exports.handlePublishArticle = exports.handleDeleteContributor = exports.handleDeleteApplication = exports.handleApproveApplication = exports.handleReviewApplication = exports.showHomepage = exports.showSingleArticle = exports.onLoadCategories = exports.onLoadArticles = exports.setupPagination = void 0;

var _helpers = require("../helpers.js");

var _api = require("./api.js");

//DOM Objects
var archives = {
  articleHtml: function articleHtml(article) {
    var loggedInUser = JSON.parse(localStorage.getItem("refresh")).uid;
    var ownedByUser = loggedInUser === article.user.uid;
    return "<article class=\"archive__card\" data-aid=".concat(article.aid, ">\n\t\t<div class=\"archive__card-img\">\n\t\t\t<img src=\"").concat(article.imageUrl, "\" alt=\"Article Image\" />\n\t\t</div>\n\t\t<div class=\"archive__card-details\">\n\t\t\t<p>").concat(article.title, "</p>\n\t\t\t<p>Author: ").concat(article.user.firstname + " " + article.user.lastname, "</p>\n\t\t</div>\n\t\t<div class=\"archive__card-actions\">\n\t\t\t<buttton class=\"btn actions__btn view_article\">\n\t\t\t\t<i class=\"far fa-eye\"></i> &nbsp; View\n\t\t\t</buttton>\n\t\t\t").concat(ownedByUser ? "<buttton class=\"btn actions__btn edit_article\">\n\t\t\t\t\t\t\t<i class=\"far fa-edit\"></i> &nbsp; Edit\n\t\t\t\t\t   </buttton>" : "", "\n\t\t\t<buttton class=\"btn actions__btn delete_article\">\n\t\t\t\t<i class=\"far fa-trash-alt\"></i> &nbsp; Delete\n\t\t\t</buttton>\n\t\t</div>\n\t</article>");
  },
  unpublishedArticleHtml: function unpublishedArticleHtml(article) {
    return "<article class=\"archive__card\" data-aid=".concat(article.aid, ">\n\t\t<div class=\"archive__card-img\">\n\t\t\t<img src=\"").concat(article.imageUrl, "\" alt=\"Article Image\" />\n\t\t</div>\n\t\t<div class=\"archive__card-details\">\n\t\t\t<p>").concat(article.title, "</p>\n\t\t\t<p>Author: ").concat(article.user.firstname + " " + article.user.lastname, "</p>\n\t\t</div>\n\t\t<div class=\"archive__card-actions\">\n\t\t\t<buttton class=\"btn actions__btn publish_article\">\n\t\t\t\t<i class=\"far fa-file-alt\"></i> &nbsp; Publish\n\t\t\t</buttton>\n\t\t\t<buttton class=\"btn actions__btn view_article\">\n\t\t\t\t<i class=\"far fa-eye\"></i> &nbsp; View\n\t\t\t</buttton>\n\t\t\t<buttton class=\"btn actions__btn delete_article\">\n\t\t\t\t<i class=\"far fa-trash-alt\"></i> &nbsp; Delete\n\t\t\t</buttton>\n\t\t</div>\n\t</article>");
  },
  contributorHtml: function contributorHtml(contributor) {
    return "<article class=\"archive__card\" data-uid=".concat(contributor.id, ">\n\t\t<div class=\"archive__card-details contributor__details\">\n\t\t\t<p>Name: ").concat(contributor.firstname, " ").concat(contributor.lastname, "</p>\n\t\t\t<p>Email: ").concat(contributor.email, "</p>\n\t\t</div>\n\t\t<div class=\"archive__card-actions\">\n\t\t\t<buttton class=\"btn actions__btn delete_contributor\">\n\t\t\t\t<i class=\"far fa-trash-alt\"></i> &nbsp; Delete\n\t\t\t</buttton>\n\t\t</div>\n\t</article>");
  },
  reveiwedApplicationHtml: function reveiwedApplicationHtml(application) {
    return "<article class=\"archive__card\" data-aid=\"".concat(application.id, "\">\n\t\t<div class=\"archive__card-details contributor__details\">\n\t\t\t<p>Name: ").concat(application.firstname, " ").concat(application.lastname, "</p>\n\t\t\t<p>Email: ").concat(application.email, "</p>\n\t\t\t<p>\n\t\t\t\tReason for Applying: ").concat(application.reason, "\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"archive__card-actions\">\n\t\t\t<buttton class=\"btn actions__btn approve_application\">\n\t\t\t\t<i class=\"far fa-thumbs-up\"></i> &nbsp; Approve\n\t\t\t</buttton>\n\t\t\t<buttton class=\"btn actions__btn delete_application\">\n\t\t\t\t<i class=\"far fa-trash-alt\"></i> &nbsp; Delete\n\t\t\t</buttton>\n\t\t</div>\n\t</article>");
  },
  unreveiwedApplicationHtml: function unreveiwedApplicationHtml(application) {
    return "<article class=\"archive__card\" data-aid=\"".concat(application.id, "\">\n\t\t<div class=\"archive__card-details contributor__details\">\n\t\t\t<p>Name: ").concat(application.firstname, " ").concat(application.lastname, "</p>\n\t\t\t<p>Email: ").concat(application.email, "</p>\n\t\t\t<p>\n\t\t\t\tReason for Applying: ").concat(application.reason, "\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"archive__card-actions\">\n\t\t\t<buttton class=\"btn actions__btn review_application\">\n\t\t\t\t<i class=\"far fa-thumbs-up\"></i> &nbsp; Review\n\t\t\t</buttton>\n\t\t</div>\n\t</article>");
  }
};

var setupPagination = function setupPagination(articles, currentPage) {
  var htmlSpans = "";
  var i = 0;

  while (i < articles.length) {
    if (i === 0) {
      htmlSpans += "<span class=\"article__page-link ".concat(currentPage === 1 ? "article__page-link--active" : "", "\">\n\t\t\t<a href=\"/\">").concat(i + 1, "</a>\n\t\t\t</span>");
      i += 1;
      continue;
    }

    htmlSpans += "<span class=\"article__page-link ".concat(currentPage === i + 1 ? "article__page-link--active" : "", "\">\n\t\t\t<a href=\"/index.html?page=").concat(i + 1, "\">").concat(i + 1, "</a>\n\t\t</span>");
    i += 1;
  }

  var urlParams = new URLSearchParams(window.location.search);
  return "<div class=\"article__page-links\">\n            ".concat(htmlSpans, "\n            <a class=\"article__page-next-link\" href=\"").concat(urlParams.get("page") ? urlParams.get("page") + 1 : 2, "\">Next</a>\n        </div>");
}; // DOM Actions


exports.setupPagination = setupPagination;

var onLoadArticles = function onLoadArticles(articlesSection) {
  articlesSection.innerHTML = "<div class=\"loader\">Loading...</div>";
  return function (articles) {
    var topPosts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var recentPosts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var reveresedArticles = (0, _helpers.chunkArray)(articles.reverse(), 4);
    articlesSection.innerHTML = "";

    if (reveresedArticles.length > 0) {
      reveresedArticles[0].forEach(function (article) {
        articlesSection.innerHTML += "<article class=\"article\">\n\t\t\t\t\t<div class=\"article__img-wrapper\">\n\t\t\t\t\t\t<span class=\"article__img-tag article__img-tag--black\">".concat(article.category.name, "</span>\n\t\t\t\t\t\t<img src=\"").concat(article.imageUrl, "\" alt=\"article\" class=\"article__img\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class=\"article__title tool\" data-aid=").concat(article.aid, " data-tip=\"Read Full Article\">\n\t\t\t\t\t\t<a href=\"javascript:;\">").concat(article.title, "</a>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p class=\"article__details\">\n\t\t\t\t\t\t").concat((0, _helpers.getDateDiff)(article.created), " / by ").concat(article.user.firstname + " " + article.user.lastname, "\n\t\t\t\t\t</p>\n\t\t\t\t\t<p class=\"article__synopsis\">\n\t\t\t\t\t\t").concat(article.content.substring(0, 100) + "...", "\n\t\t\t\t\t</p>\n\t\t\t\t\t<!-- <div class=\"article__metrics\">\n\t\t\t\t\t\t<div class=\"article__views\">\n\t\t\t\t\t\t\t<img src=\"./assets/images/options.svg\" alt=\"options\">\n\t\t\t\t\t\t\t<div class=\"article__viewers\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/images/viewer-1.png\" alt=\"viewer\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/images/viewer-2.png\" alt=\"viewer\" class=\"img-1\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/images/viewer-3.png\" alt=\"viewer\" class=\"img-2\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/images/viewer-4.png\" alt=\"viewer\" class=\"img-3\">\n\t\t\t\t\t\t\t\t<span>+20 more</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"article__stats\">\n\t\t\t\t\t\t\t<div class=\"article__stat\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/images/heart.svg\" alt=\"heart\">\n\t\t\t\t\t\t\t\t<span>10</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"article__stat\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/images/chat.svg\" alt=\"heart\">\n\t\t\t\t\t\t\t\t<span>10</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div> -->\n\t\t\t\t</article>");

        if (recentPosts) {
          recentPosts.innerHTML += "<div class=\"post\" data-aid=".concat(article.aid, ">\n\t\t\t\t\t<img src=\"").concat(article.imageUrl, "\" alt=\"article image\" />\n\t\t\t\t\t<p class=\"post__time\">").concat((0, _helpers.getDateDiff)(article.created), "</p>\n\t\t\t\t\t<p class=\"post__title\">").concat(article.title, "</p>\n\t\t\t\t</div>");
        }
      });
      articlesSection.innerHTML += setupPagination(reveresedArticles, 1);

      if (topPosts) {
        topPosts.innerHTML = "<div class=\"top-post\">\n            <div class=\"overlay\"></div>\n            <img src=\"./assets/images/camp-2-min.png\" alt=\"Post Image\" class=\"top-post__img\">\n            <p class=\"top-post__tag\">\n                <img src=\"./assets/images/play.svg\" alt=\"play\">\n                Latest Post\n            </p>\n            <p class=\"top-post__title\">\n                ".concat(reveresedArticles[0][0].title, "\n            </p>\n            <p class=\"top-post__content\">\n                ").concat(reveresedArticles[0][0].content.substring(0, 100) + "...", "\n            </p>\n            <div class=\"top-post__row\">\n                <a href=\"#\" class=\"top-post__link\" data-aid=").concat(reveresedArticles[0][0].aid, ">\n                    KEEP READING\n                </a>\n                <div class=\"top-post__author-details\">\n                    <p class=\"top-post__author\">\n                    ").concat(reveresedArticles[0][0].user.firstname + " " + reveresedArticles[0][0].user.lastname, "\n                    </p>\n                    <p class=\"top-post__author-role\">\n                        ").concat(reveresedArticles[0][0].user.role[0].toUpperCase() + reveresedArticles[0][0].user.role.slice(1), "\n                    </p>\n                </div>\n            </div>\n\t\t</div>");
      }

      return reveresedArticles;
    } else {
      articlesSection.innerHTML += "<p>No Articles Found</p>";
    }
  };
};

exports.onLoadArticles = onLoadArticles;

var onLoadCategories = function onLoadCategories(categoriesList, categories) {
  if (categories.length > 0) {
    categories.forEach(function (category) {
      categoriesList.innerHTML += "<li class=\"categories__category\" data-cid=".concat(category.id, ">\n            <span></span>\n            ").concat(category.name, "\n        </li>");
    });
  }
};

exports.onLoadCategories = onLoadCategories;

var showSingleArticle = function showSingleArticle(e, mainEl, loadingDiv, singleArticleSection, singleArticleMain) {
  loadingDiv.classList.remove("hide");
  mainEl.classList.add("hidden");
  var aid = e.target.closest("[data-aid]").dataset.aid;
  (0, _api.getSingleArticle)(aid).then(function (result) {
    var data = result.data;
    singleArticleSection.innerHTML += "<article class=\"single__article\">\n        <p class=\"single__article-title\">".concat(data.title, "</p>\n        <p class=\"single__article-author\">\n            By ").concat(data.user.firstname + " " + data.user.lastname, " <span>").concat((0, _helpers.generateDate)(data.created), "</span>\n        </p>\n        <div class=\"single__article-img\">\n            <img src=\"").concat(data.imageUrl, "\" alt=\"Article Image\" />\n        </div>\n        <br />\n        <p class=\"single__article-content\">\n            ").concat(data.content, "\n        </p>\n    </article>");
    loadingDiv.classList.add("hide");
    singleArticleMain.classList.add("visible");
  });
};

exports.showSingleArticle = showSingleArticle;

var showHomepage = function showHomepage(mainEl, loadingDiv, singleArticleSection, singleArticleMain) {
  loadingDiv.classList.remove("hide");
  singleArticleSection.innerHTML = "";
  singleArticleMain.classList.remove("visible");
  loadingDiv.classList.add("hide");
  mainEl.classList.remove("hidden");
};

exports.showHomepage = showHomepage;

var handleReviewApplication = function handleReviewApplication(e, loadingDiv, onSuccess) {
  loadingDiv.classList.remove("hide");
  var aid = e.target.closest("[data-aid]").dataset.aid;
  (0, _api.reviewApplication)(aid).then(function (success) {
    if (success) {
      onSuccess();
    }
  })["finally"](function () {
    loadingDiv.classList.add("hide");
  });
};

exports.handleReviewApplication = handleReviewApplication;

var handleApproveApplication = function handleApproveApplication(e, loadingDiv) {
  loadingDiv.classList.remove("hide");
  var aid = e.target.closest("[data-aid]").dataset.aid;
  (0, _api.approveApplication)(aid).then(function (success) {
    if (success) {
      e.target.closest(".archive__card").remove();
    }
  })["finally"](function () {
    loadingDiv.classList.add("hide");
  });
};

exports.handleApproveApplication = handleApproveApplication;

var handleDeleteApplication = function handleDeleteApplication(e, loadingDiv) {
  loadingDiv.classList.remove("hide");
  var aid = e.target.closest("[data-aid]").dataset.aid;
  (0, _api.deleteApplication)(aid).then(function (success) {
    if (success) {
      e.target.closest(".archive__card").remove();
    }
  })["finally"](function () {
    loadingDiv.classList.add("hide");
  });
};

exports.handleDeleteApplication = handleDeleteApplication;

var handleDeleteContributor = function handleDeleteContributor(e, loadingDiv) {
  loadingDiv.classList.remove("hide");
  var uid = e.target.closest("[data-uid]").dataset.uid;
  (0, _api.deleteContributor)(uid).then(function (success) {
    if (success) {
      e.target.closest(".archive__card").remove();
    }
  })["finally"](function () {
    loadingDiv.classList.add("hide");
  });
};

exports.handleDeleteContributor = handleDeleteContributor;

var handlePublishArticle = function handlePublishArticle(e, loadingDiv, onSuccess) {
  loadingDiv.classList.remove("hide");
  var aid = e.target.closest("[data-aid]").dataset.aid;
  (0, _api.publishArticle)(aid).then(function (success) {
    if (success) {
      onSuccess();
    }
  })["finally"](function () {
    loadingDiv.classList.add("hide");
  });
};

exports.handlePublishArticle = handlePublishArticle;

var handleDeleteArticle = function handleDeleteArticle(e, loadingDiv) {
  loadingDiv.classList.remove("hide");
  var aid = e.target.closest("[data-aid]").dataset.aid;
  (0, _api.deleteArticle)(aid).then(function (success) {
    if (success) {
      e.target.closest(".archive__card").remove();
    }
  })["finally"](function () {
    loadingDiv.classList.add("hide");
  });
};

exports.handleDeleteArticle = handleDeleteArticle;

var onLoadCategoryArticles = function onLoadCategoryArticles(e, loadArticles, loadingDiv) {
  var cid = e.target.closest("[data-cid]").dataset.cid;
  (0, _helpers.sAlert)({
    title: "Loading Articles",
    message: "Please Wait",
    type: "info"
  });
  (0, _api.getArticlesByCategory)(cid).then(function (result) {
    document.querySelector(".categories__category--active").classList.remove("categories__category--active");
    e.target.classList.add("categories__category--active");
    loadArticles(result.data);
  });
};

exports.onLoadCategoryArticles = onLoadCategoryArticles;

var onLoadDashboardArticles = function onLoadDashboardArticles(publishedArticles, unpublishedArticles, dashboardMainEl) {
  dashboardMainEl.innerHTML = ""; // Add Published Articles Section

  var publishedArchive = "<section class=\"archive\">";
  publishedArchive += "<h3>All published articles</h3>";

  if (publishedArticles.length > 0) {
    publishedArticles.forEach(function (article) {
      publishedArchive += archives.articleHtml(article);
    });
  } else {
    publishedArchive += "<p class=\"empty\">No Published Article</p>";
  }

  publishedArchive += "</section>";
  dashboardMainEl.innerHTML += publishedArchive; // Add Unpublished Articles Section

  var unpublishedArchive = "<section class=\"archive\">";
  unpublishedArchive += "<h3>All unpublished articles</h3>";

  if (unpublishedArticles.length > 0) {
    unpublishedArticles.forEach(function (article) {
      unpublishedArchive += archives.unpublishedArticleHtml(article);
    });
  } else {
    unpublishedArchive += "<p class=\"empty\">No Unpublished Article</p>";
  }

  unpublishedArchive += "</section>";
  dashboardMainEl.innerHTML += unpublishedArchive;
};

exports.onLoadDashboardArticles = onLoadDashboardArticles;

var onLoadDashboardContributors = function onLoadDashboardContributors(contributors, dashboardMainEl) {
  dashboardMainEl.innerHTML = ""; // Add Published Articles Section

  var contributorArchive = "<section class=\"archive\">";
  contributorArchive += "<h3>All Contributors</h3>";

  if (contributors.length > 0) {
    contributors.forEach(function (contributor) {
      contributorArchive += archives.contributorHtml(contributor);
    });
  } else {
    contributorArchive += "<p class=\"empty\">No Contributor</p>";
  }

  contributorArchive += "</section>";
  dashboardMainEl.innerHTML += contributorArchive;
};

exports.onLoadDashboardContributors = onLoadDashboardContributors;

var onLoadDashboardApplications = function onLoadDashboardApplications(reviewedApplications, unreviewedApplications, dashboardMainEl) {
  dashboardMainEl.innerHTML = ""; // Add Reviewed Application Section

  var reviewedArchive = "<section class=\"archive\">";
  reviewedArchive += "<h3>All reviewed applications</h3>";

  if (reviewedApplications.length > 0) {
    reviewedApplications.forEach(function (application) {
      reviewedArchive += archives.reveiwedApplicationHtml(application);
    });
  } else {
    reviewedArchive += "<p class=\"empty\">No Reviewed Application</p>";
  }

  reviewedArchive += "</section>";
  dashboardMainEl.innerHTML += reviewedArchive; // Add Unreviewed Application Section

  var unreviewedArchive = "<section class=\"archive\">";
  unreviewedArchive += "<h3>All unreviewed applications</h3>";

  if (unreviewedApplications.length > 0) {
    unreviewedApplications.forEach(function (application) {
      unreviewedArchive += archives.unreveiwedApplicationHtml(application);
    });
  } else {
    unreviewedArchive += "<p class=\"empty\">No Unreviewed Application</p>";
  }

  unreviewedArchive += "</section>";
  dashboardMainEl.innerHTML += unreviewedArchive;
}; //Dynamic EventListeners Setups


exports.onLoadDashboardApplications = onLoadDashboardApplications;

var setupCategoryClickEventListeners = function setupCategoryClickEventListeners(categoriesList, loadArticles, loadingDiv) {
  categoriesList.forEach(function (category) {
    category.addEventListener("click", function (e) {
      onLoadCategoryArticles(e, loadArticles, loadingDiv);
    });
  });
};

exports.setupCategoryClickEventListeners = setupCategoryClickEventListeners;

var setupPostClickEventListeners = function setupPostClickEventListeners(mainEl, loadingDiv, singleArticleSection, singleArticleMain, postTitles, recentPostsTitles) {
  postTitles.forEach(function (postTitle) {
    postTitle.addEventListener("click", function (e) {
      return showSingleArticle(e, mainEl, loadingDiv, singleArticleSection, singleArticleMain);
    });
  });
  recentPostsTitles.forEach(function (recentPostTitle) {
    recentPostTitle.addEventListener("click", function (e) {
      showSingleArticle(e, mainEl, loadingDiv, singleArticleSection, singleArticleMain);
    });
  });
};

exports.setupPostClickEventListeners = setupPostClickEventListeners;

var setupApplicationActions = function setupApplicationActions(loadingDiv, reviewBtns, approveBtns, deleteBtns, applicationLink) {
  if (reviewBtns.length > 0) {
    reviewBtns.forEach(function (reviewBtn) {
      reviewBtn.addEventListener("click", function (e) {
        (0, _helpers.sEnquire)("Are you sure you want to review application?", function () {
          return handleReviewApplication(e, loadingDiv, function () {
            applicationLink.click();
          });
        });
      });
    });
  }

  if (approveBtns.length > 0) {
    approveBtns.forEach(function (approveBtn) {
      approveBtn.addEventListener("click", function (e) {
        (0, _helpers.sEnquire)("Are you sure you want to approve application?", function () {
          return handleApproveApplication(e, loadingDiv);
        });
      });
    });
  }

  if (deleteBtns.length > 0) {
    deleteBtns.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        (0, _helpers.sEnquire)("Are you sure you want to delete the application?", function () {
          return handleDeleteApplication(e, loadingDiv);
        });
      });
    });
  }
};

exports.setupApplicationActions = setupApplicationActions;

var setupContributorActions = function setupContributorActions(loadingDiv, deleteConBtns) {
  if (deleteConBtns.length > 0) {
    deleteConBtns.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        (0, _helpers.sEnquire)("Are you sure you want to delete the contributor?", function () {
          return handleDeleteContributor(e, loadingDiv);
        });
      });
    });
  }
};

exports.setupContributorActions = setupContributorActions;

var setupArticlesActions = function setupArticlesActions(loadingDiv, publishBtns, deleteBtns, viewBtns, editBtns, articlesLink, _ref) {
  var dashboardMainEl = _ref.dashboardMainEl,
      singleArticleMain = _ref.singleArticleMain,
      singleArticleSection = _ref.singleArticleSection;

  if (publishBtns.length > 0) {
    publishBtns.forEach(function (publishBtn) {
      publishBtn.addEventListener("click", function (e) {
        (0, _helpers.sEnquire)("Are you sure you want to publish article?", function () {
          return handlePublishArticle(e, loadingDiv, function () {
            articlesLink.click();
          });
        });
      });
    });
  }

  if (deleteBtns.length > 0) {
    deleteBtns.forEach(function (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        (0, _helpers.sEnquire)("Are you sure you want to delete the article?", function () {
          return handleDeleteArticle(e, loadingDiv);
        });
      });
    });
  }

  if (viewBtns.length > 0) {
    viewBtns.forEach(function (viewBtn) {
      viewBtn.addEventListener("click", function (e) {
        showSingleArticle(e, dashboardMainEl, loadingDiv, singleArticleSection, singleArticleMain);
      });
    });
  }

  if (editBtns.length > 0) {
    editBtns.forEach(function (editBtn) {
      editBtn.addEventListener("click", function (e) {
        var aid = e.target.closest("[data-aid]").dataset.aid;
        window.location.href = "/post_article.html?edit=".concat(aid);
      });
    });
  }
}; //Custom


exports.setupArticlesActions = setupArticlesActions;

var isLoggedIn = function isLoggedIn() {
  return localStorage.getItem("token") && localStorage.getItem("exp") > new Date().getTime();
};

exports.isLoggedIn = isLoggedIn;

var refreshAuthState = function refreshAuthState() {
  var tokenData = localStorage.getItem("refresh");

  if (tokenData !== null) {
    (0, _api.getNewToken)(tokenData).then(function (res) {
      if (res.token) {
        var expTime = new Date().getTime() + 86400 * 1000;
        localStorage.setItem("token", res.token);
        localStorage.setItem("exp", expTime);
        localStorage.setItem("refresh", JSON.stringify({
          refreshToken: res.refreshToken,
          uid: res.uid
        }));
        return true;
      }
    });
  } else {
    return false;
  }
};

exports.refreshAuthState = refreshAuthState;

var logout = function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("exp");
  window.location.href = "/";
};

exports.logout = logout;

},{"../helpers.js":4,"./api.js":1}],3:[function(require,module,exports){
"use strict";

var _helpers = require("./helpers.js");

var _api = require("./actions/api.js");

var _dom = require("./actions/dom.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//DOM Elements
var articlesSection = document.querySelector(".articles");
var categoryList = document.querySelector(".categories__list");
var loadingDiv = document.querySelector(".loading");
var topPost = document.querySelector(".top-posts");
var mainEl = document.querySelector("main");
var singleArticleSection = document.querySelector(".single__article-page");
var singleArticleMain = document.querySelector(".single__article-main");
var backBtn = document.querySelector(".single__article-main > .btn");
var signInForm = document.getElementById("signInForm");
var applicationForm = document.getElementById("applicationForm");
var passwordForm = document.getElementById("passwordForm");
var dashboardMainEl = document.querySelector(".dashboard__main");
var articlesLinks = document.querySelectorAll(".articlesLink");
var contributorsLinks = document.querySelectorAll(".contributorsLink");
var applicationsLinks = document.querySelectorAll(".applicantsLink");
var navbarAuthLinks = document.querySelector(".navbar__registration-links");
var mobileAuthLinks = document.querySelector(".sidenav-reg__links");
var postArticleForm = document.getElementById("postArticleForm");
var formContainer = document.getElementById("formContainer");
var editImageContainer = document.querySelector(".edit_image");
var showEditImageInput = document.querySelector(".edit_image > .btn");
var logoutBtns = document.querySelectorAll(".logout_btn");
var recentPosts = document.querySelector(".recent-posts");
var postArticleLinkBtn = document.querySelector(".post-article-btn"); //Events

var updateDomEvent = new Event("updateDOM"); //Event Callbacks

var loadHomepageElements = function loadHomepageElements() {
  Promise.all([(0, _api.getCategories)(), (0, _api.getArticles)()]).then(function (result) {
    var _result = _slicedToArray(result, 2),
        categoryResult = _result[0],
        articlesResult = _result[1];

    (0, _dom.onLoadCategories)(categoryList, categoryResult.data);
    var loadArticles = (0, _dom.onLoadArticles)(articlesSection);

    if (categoryList.childElementCount > 1) {
      var categoriesList = Array.from(categoryList.childNodes).filter(function (childNode) {
        return childNode.className === "categories__category";
      });
      (0, _dom.setupCategoryClickEventListeners)(categoriesList, loadArticles, loadingDiv);
    }

    window.articles = loadArticles(articlesResult.data, topPost, recentPosts);
    loadingDiv.classList.add("hide");
    var postTitles = document.querySelectorAll("p.article__title.tool > a");
    var recentPostTitles = recentPosts.querySelectorAll(".post__title");

    if (postTitles !== null) {
      (0, _dom.setupPostClickEventListeners)(mainEl, loadingDiv, singleArticleSection, singleArticleMain, postTitles, recentPostTitles);
    }

    mainEl.dispatchEvent(updateDomEvent);
  });
};

var loadDashboardArticles = function loadDashboardArticles(callback) {
  dashboardMainEl.innerHTML = '<div class="loader">Loading...</div>';
  Promise.all([(0, _api.getArticles)(), (0, _api.getUnpublishedArticles)()]).then(function (result) {
    console.log(result);

    var _result2 = _slicedToArray(result, 2),
        published = _result2[0],
        unpublished = _result2[1];

    published = published.data || [];
    unpublished = unpublished.data || [];
    (0, _dom.onLoadDashboardArticles)(published, unpublished, dashboardMainEl);
    callback();
  });
};

var loadDashboardContributors = function loadDashboardContributors(callback) {
  dashboardMainEl.innerHTML = '<div class="loader">Loading...</div>';
  (0, _api.getContributors)().then(function (result) {
    (0, _dom.onLoadDashboardContributors)(result.data, dashboardMainEl);
    callback();
  });
};

var loadDashboardApplications = function loadDashboardApplications(callback) {
  dashboardMainEl.innerHTML = '<div class="loader">Loading...</div>';
  Promise.all([(0, _api.getReviewedApplications)(), (0, _api.getUnreviewedApplications)()]).then(function (result) {
    var _result3 = _slicedToArray(result, 2),
        reviewed = _result3[0],
        unreviewed = _result3[1];

    reviewed = reviewed.data || [];
    unreviewed = unreviewed.data || [];
    (0, _dom.onLoadDashboardApplications)(reviewed, unreviewed, dashboardMainEl);
    callback();
  });
};

var loadEditArticle = function loadEditArticle(aid, formContainer, editImageContainer, sAlert, loadingDiv, postArticle, editArticle) {
  loadingDiv.classList.remove("hide");
  (0, _api.getSingleArticle)(aid).then(function (result) {
    var article = result.data;
    var legend = formContainer.querySelector("legend");
    var form = formContainer.querySelector("form");
    var formTitle = formContainer.querySelector("input[name=title]");
    var formCategoryId = formContainer.querySelector("select[name=categoryId]");
    var formFile = formContainer.querySelector("input[type=file]");
    var formContent = formContainer.querySelector("input[name=content]");
    var editImage = editImageContainer.querySelector("img");
    legend.textContent = "Edit Aticle";
    form.id = "editArticleForm";
    formTitle.value = article.title;
    formCategoryId.value = article.category.cid;
    formContent.value = article.content;
    formFile.classList.add("hide");
    formFile.removeAttribute("required");
    editImage.setAttribute("src", article.imageUrl);
    editImageContainer.classList.remove("hide");
    loadingDiv.classList.add("hide");
    form.removeEventListener("submit", postArticle);
    form.addEventListener("submit", function (e) {
      var urlParams = new URLSearchParams(window.location.search);
      var aid = urlParams.get("edit");
      editArticle(e, aid);
    });
    document.dispatchEvent(updateDomEvent);
  })["catch"](function (err) {
    sAlert({
      title: "Something went wrong",
      message: err.message,
      type: "error"
    });
    console.log(err.stack);
  });
};

var resetNavbarLinks = function resetNavbarLinks(navLink) {
  var activeLink = navLink.parentElement.querySelector(".navbar__link--active");

  if (activeLink !== null) {
    activeLink.classList.remove("navbar__link--active");
  }
};

var setupLogoutClickEvents = function setupLogoutClickEvents() {
  var logoutBtns = document.querySelectorAll(".logout_btn");

  if (logoutBtns !== null) {
    logoutBtns.forEach(function (logoutBtn) {
      logoutBtn.addEventListener("click", _dom.logout);
    });
  }
}; // Event Listeners


document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("index") || window.location.pathname === "/") {
    if ((0, _dom.isLoggedIn)()) {
      navbarAuthLinks.innerHTML = "<a href=\"#\" class=\"btn navbar__registration-link logout_btn\">\n\t\t\t\t\tLOGOUT\n\t\t\t\t</a>";
      mobileAuthLinks.innerHTML = "\n\t\t\t<button class=\"sidenav-reg__link logout_btn\">\n\t\t\t\tLOGOUT\n\t\t\t</button>";
      setupLogoutClickEvents();
    } else {
      navbarAuthLinks.innerHTML = "<a href=\"./sign_in.html\" class=\"btn navbar__registration-link\">\n\t\t\t\t\tSIGN IN\n\t\t\t\t</a>\n\t\t\t\t<a href=\"./contributor_form.html\" class=\"btn navbar__registration-link\">\n\t\t\t\t\tSIGN UP\n\t\t\t\t</a>";
      mobileAuthLinks.innerHTML = "<a href=\"./sign_in.html\" class=\"btn sidenav-reg__link\">\n\t\t\t\t\tSIGN IN\n\t\t\t\t</a>\n\t\t\t\t<a\n\t\t\t\t\thref=\"./contributor_form.html\"\n\t\t\t\t\tclass=\"btn sidenav-reg__link\"\n\t\t\t\t>\n\t\t\t\t\tSIGN UP\n\t\t\t\t</a>";
    }

    loadHomepageElements();

    if (window.location.search.includes("page") && window.articles) {
      var page = new URLSearchParams(window.location.search).get("page");

      if (window.articles[page - 1].length > 0) {
        articlesSection.innerHTML = "<div class=\"loader\">Loading...</div>";
        window.articles[page - 1].forEach(function (article) {
          articlesSection.innerHTML += "<article class=\"article\">\n                <div class=\"article__img-wrapper\">\n                    <span class=\"article__img-tag article__img-tag--black\">".concat(article.category.name, "</span>\n                    <img src=\"").concat(article.imageUrl, "\" alt=\"article\" class=\"article__img\">\n                </div>\n                <p class=\"article__title tool\" data-aid=").concat(article.aid, " data-tip=\"Read Full Article\">\n                    <a href=\"javascript:;\">").concat(article.title, "</a>\n                </p>\n                <p class=\"article__details\">\n                    ").concat(getDateDiff(article.created), " / by ").concat(article.user.firstname + " " + article.user.lastname, "\n                </p>\n                <p class=\"article__synopsis\">\n                    ").concat(article.content.substring(0, 100) + "...", "\n                </p>\n                <!-- <div class=\"article__metrics\">\n                    <div class=\"article__views\">\n                        <img src=\"./assets/images/options.svg\" alt=\"options\">\n                        <div class=\"article__viewers\">\n                            <img src=\"./assets/images/viewer-1.png\" alt=\"viewer\">\n                            <img src=\"./assets/images/viewer-2.png\" alt=\"viewer\" class=\"img-1\">\n                            <img src=\"./assets/images/viewer-3.png\" alt=\"viewer\" class=\"img-2\">\n                            <img src=\"./assets/images/viewer-4.png\" alt=\"viewer\" class=\"img-3\">\n                            <span>+20 more</span>\n                        </div>\n                    </div>\n                    <div class=\"article__stats\">\n                        <div class=\"article__stat\">\n                            <img src=\"./assets/images/heart.svg\" alt=\"heart\">\n                            <span>10</span>\n                        </div>\n                        <div class=\"article__stat\">\n                            <img src=\"./assets/images/chat.svg\" alt=\"heart\">\n                            <span>10</span>\n                        </div>\n                    </div>\n                </div> -->\n            </article>");
        });
        articlesSection.innerHTML += setupPagination(window.articles, page);
      }
    }
  }

  if (window.location.pathname.includes("dashboard") || window.location.pathname.includes("create_account") || window.location.pathname.includes("post_article")) {
    if (!(0, _dom.isLoggedIn)() && !(0, _dom.refreshAuthState)()) {
      window.location.href = "/sign_in.html";
    }
  }

  if (window.location.pathname.includes("dashboard")) {
    articlesLinks[1].click();
  }

  if (window.location.pathname.includes("post_article")) {
    loadingDiv.classList.remove("hide");
    var categorySelect = document.querySelector("select.form_field");
    (0, _api.getCategories)().then(function (result) {
      if (result.data.length > 0) {
        result.data.forEach(function (category) {
          categorySelect.innerHTML += "<option value=\"".concat(category.id, "\">").concat(category.name, "</option>");
        });
        loadingDiv.classList.add("hide");

        if (window.location.search.includes("edit")) {
          var urlParams = new URLSearchParams(window.location.search);
          var aid = urlParams.get("edit");
          loadEditArticle(aid, formContainer, editImageContainer, _helpers.sAlert, loadingDiv, _api.postArticle, _api.editArticle);
        }
      }
    });
  }

  if (window.location.pathname.includes("change_password")) {
    var urlParams = new URLSearchParams(window.location.search);

    if (!urlParams.has("token") && !urlParams.has("email")) {
      window.location.href = "/";
    }
  }
});

if (backBtn !== null) {
  backBtn.addEventListener("click", function () {
    var main = mainEl;

    if (dashboardMainEl !== null) {
      main = dashboardMainEl;
    }

    (0, _dom.showHomepage)(main, loadingDiv, singleArticleSection, singleArticleMain);
  });
}

if (signInForm !== null) {
  signInForm.addEventListener("submit", _api.postSignIn);
}

if (applicationForm !== null) {
  applicationForm.addEventListener("submit", _api.postApply);
}

if (articlesLinks !== null) {
  articlesLinks.forEach(function (articlesLink) {
    articlesLink.addEventListener("click", function () {
      loadDashboardArticles(function () {
        var publishBtns = dashboardMainEl.querySelectorAll(".publish_article");
        var viewBtns = dashboardMainEl.querySelectorAll(".view_article");
        var deleteBtns = dashboardMainEl.querySelectorAll(".delete_article");
        var editBtns = dashboardMainEl.querySelectorAll(".edit_article");
        (0, _dom.setupArticlesActions)(loadingDiv, publishBtns, deleteBtns, viewBtns, editBtns, articlesLink, {
          dashboardMainEl: dashboardMainEl,
          singleArticleMain: singleArticleMain,
          singleArticleSection: singleArticleSection
        });
      });
      resetNavbarLinks(articlesLink);
      articlesLink.classList.add("navbar__link--active");
    });
  });
}

if (contributorsLinks !== null) {
  contributorsLinks.forEach(function (contributorsLink) {
    contributorsLink.addEventListener("click", function () {
      loadDashboardContributors(function () {
        var deleteConBtns = dashboardMainEl.querySelectorAll(".delete_contributor");
        (0, _dom.setupContributorActions)(loadingDiv, deleteConBtns);
      });
      resetNavbarLinks(contributorsLink);
      contributorsLink.classList.add("navbar__link--active");
    });
  });
}

if (applicationsLinks !== null) {
  applicationsLinks.forEach(function (applicationsLink) {
    applicationsLink.addEventListener("click", function () {
      loadDashboardApplications(function () {
        var reviewBtns = dashboardMainEl.querySelectorAll(".review_application");
        var approveBtns = dashboardMainEl.querySelectorAll(".approve_application");
        var deleteBtns = dashboardMainEl.querySelectorAll(".delete_application");
        (0, _dom.setupApplicationActions)(loadingDiv, reviewBtns, approveBtns, deleteBtns, applicationsLink);
      });
      resetNavbarLinks(applicationsLink);
      applicationsLink.classList.add("navbar__link--active");
    });
  });
}

if (postArticleForm !== null) {
  postArticleForm.addEventListener("submit", _api.postArticle);
}

if (showEditImageInput !== null) {
  showEditImageInput.addEventListener("click", function (e) {
    var formFile = formContainer.querySelector("input[type=file]");
    editImageContainer.classList.add("hide");
    formFile.setAttribute("required", "true");
    formFile.classList.remove("hide");
  });
}

if (logoutBtns !== null) {
  logoutBtns.forEach(function (logoutBtn) {
    logoutBtn.addEventListener("click", _dom.logout);
  });
}

if (mainEl !== null) {
  mainEl.addEventListener("updateDOM", function () {
    categoryList.firstElementChild.addEventListener("click", function (e) {
      (0, _api.getArticles)().then(function (articlesResult) {
        document.querySelector(".categories__category--active").classList.remove("categories__category--active");
        e.target.classList.add("categories__category--active");
        (0, _dom.onLoadArticles)(articlesSection)(articlesResult.data);
      });
    });
  });
}

if (postArticleLinkBtn !== null) {
  postArticleLinkBtn.addEventListener("click", function () {
    window.location.href = "/post_article.html";
  });
}

if (passwordForm !== null) {
  passwordForm.addEventListener("submit", _api.postModifyPassword);
}

},{"./actions/api.js":1,"./actions/dom.js":2,"./helpers.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunkArray = exports.sEnquire = exports.sAlert = exports.inquire = exports.generateDate = exports.getDateDiff = exports.requestData = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var requestData = function requestData(_ref) {
  var url = _ref.url,
      method = _ref.method,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? null : _ref$data,
      _ref$authToken = _ref.authToken,
      authToken = _ref$authToken === void 0 ? "" : _ref$authToken,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? null : _ref$type;
  var headers = {
    Authorization: authToken !== "" ? "Bearer " + authToken : authToken
  };

  if (!type) {
    headers["Content-Type"] = "application/json";
  }

  var requestConfig = {
    method: method,
    headers: headers
  };

  if (method.toLowerCase() !== "get" || method.toLowerCase() !== "delete") {
    requestConfig.body = data;
  }

  return fetch(url, requestConfig).then(function (res) {
    return res.json();
  });
};

exports.requestData = requestData;

var getDateDiff = function getDateDiff(datetime) {
  var diff = new Date().getTime() - datetime;
  var years = Math.floor(diff / (1000 * 3600 * 24 * 365));
  var months = Math.floor(diff / (1000 * 3600 * 24 * 30));
  var weeks = Math.floor(diff / (1000 * 3600 * 24 * 7));
  var days = Math.floor(diff / (1000 * 3600 * 24));
  var duration = "".concat(years, " ").concat(years === 1 ? "year" : "years", " ago");

  if (years === 0) {
    duration = "".concat(months, " ").concat(months === 1 ? "month" : "months", " ago");
  }

  if (months === 0) {
    duration = "".concat(weeks, " ").concat(weeks === 1 ? "week" : "weeks", " ago");
  }

  if (weeks === 0) {
    duration = "".concat(days, " ").concat(days === 1 ? "day" : "days", " ago");
  }

  return duration;
};

exports.getDateDiff = getDateDiff;

var generateDate = function generateDate(timestamp) {
  var options = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric"
  };
  var date = new Date(timestamp);
  return date.toLocaleDateString("en-US", options);
};

exports.generateDate = generateDate;

var inquire = function inquire(question, callback) {
  var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "info";
  var danger = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return (0, _sweetalert["default"])({
    title: "Are you sure?",
    text: question,
    icon: icon,
    dangerMode: danger
  }).then(function (carryOn) {
    if (carryOn) {
      return callback();
    } else {
      _sweetalert["default"].close();
    }
  });
};

exports.inquire = inquire;

var sAlert = function sAlert(_ref2) {
  var title = _ref2.title,
      message = _ref2.message,
      type = _ref2.type;
  return (0, _sweetalert["default"])({
    title: title,
    text: message,
    icon: type,
    button: "OK"
  });
};

exports.sAlert = sAlert;

var sEnquire = function sEnquire(title, callback) {
  return (0, _sweetalert["default"])({
    title: title,
    icon: "info",
    buttons: true,
    dangerMode: true
  }).then(function (carryOn) {
    if (carryOn) {
      callback();
    }
  });
};
/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */


exports.sEnquire = sEnquire;

var chunkArray = function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
};

exports.chunkArray = chunkArray;

},{"sweetalert":6}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
(function (setImmediate,clearImmediate){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.swal=e():t.swal=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="swal-button";e.CLASS_NAMES={MODAL:"swal-modal",OVERLAY:"swal-overlay",SHOW_MODAL:"swal-overlay--show-modal",MODAL_TITLE:"swal-title",MODAL_TEXT:"swal-text",ICON:"swal-icon",ICON_CUSTOM:"swal-icon--custom",CONTENT:"swal-content",FOOTER:"swal-footer",BUTTON_CONTAINER:"swal-button-container",BUTTON:o,CONFIRM_BUTTON:o+"--confirm",CANCEL_BUTTON:o+"--cancel",DANGER_BUTTON:o+"--danger",BUTTON_LOADING:o+"--loading",BUTTON_LOADER:o+"__loader"},e.default=e.CLASS_NAMES},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getNode=function(t){var e="."+t;return document.querySelector(e)},e.stringToNode=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.insertAfter=function(t,e){var n=e.nextSibling;e.parentNode.insertBefore(t,n)},e.removeNode=function(t){t.parentElement.removeChild(t)},e.throwErr=function(t){throw t=t.replace(/ +(?= )/g,""),"SweetAlert: "+(t=t.trim())},e.isPlainObject=function(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype},e.ordinalSuffixOf=function(t){var e=t%10,n=t%100;return 1===e&&11!==n?t+"st":2===e&&12!==n?t+"nd":3===e&&13!==n?t+"rd":t+"th"}},function(t,e,n){"use strict";function o(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),o(n(25));var r=n(26);e.overlayMarkup=r.default,o(n(27)),o(n(28)),o(n(29));var i=n(0),a=i.default.MODAL_TITLE,s=i.default.MODAL_TEXT,c=i.default.ICON,l=i.default.FOOTER;e.iconMarkup='\n  <div class="'+c+'"></div>',e.titleMarkup='\n  <div class="'+a+'"></div>\n',e.textMarkup='\n  <div class="'+s+'"></div>',e.footerMarkup='\n  <div class="'+l+'"></div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.CONFIRM_KEY="confirm",e.CANCEL_KEY="cancel";var r={visible:!0,text:null,value:null,className:"",closeModal:!0},i=Object.assign({},r,{visible:!1,text:"Cancel",value:null}),a=Object.assign({},r,{text:"OK",value:!0});e.defaultButtonList={cancel:i,confirm:a};var s=function(t){switch(t){case e.CONFIRM_KEY:return a;case e.CANCEL_KEY:return i;default:var n=t.charAt(0).toUpperCase()+t.slice(1);return Object.assign({},r,{text:n,value:t})}},c=function(t,e){var n=s(t);return!0===e?Object.assign({},n,{visible:!0}):"string"==typeof e?Object.assign({},n,{visible:!0,text:e}):o.isPlainObject(e)?Object.assign({visible:!0},n,e):Object.assign({},n,{visible:!1})},l=function(t){for(var e={},n=0,o=Object.keys(t);n<o.length;n++){var r=o[n],a=t[r],s=c(r,a);e[r]=s}return e.cancel||(e.cancel=i),e},u=function(t){var n={};switch(t.length){case 1:n[e.CANCEL_KEY]=Object.assign({},i,{visible:!1});break;case 2:n[e.CANCEL_KEY]=c(e.CANCEL_KEY,t[0]),n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t[1]);break;default:o.throwErr("Invalid number of 'buttons' in array ("+t.length+").\n      If you want more than 2 buttons, you need to use an object!")}return n};e.getButtonListOpts=function(t){var n=e.defaultButtonList;return"string"==typeof t?n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t):Array.isArray(t)?n=u(t):o.isPlainObject(t)?n=l(t):!0===t?n=u([!0,!0]):!1===t?n=u([!1,!1]):void 0===t&&(n=e.defaultButtonList),n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=n(0),a=i.default.MODAL,s=i.default.OVERLAY,c=n(30),l=n(31),u=n(32),f=n(33);e.injectElIntoModal=function(t){var e=o.getNode(a),n=o.stringToNode(t);return e.appendChild(n),n};var d=function(t){t.className=a,t.textContent=""},p=function(t,e){d(t);var n=e.className;n&&t.classList.add(n)};e.initModalContent=function(t){var e=o.getNode(a);p(e,t),c.default(t.icon),l.initTitle(t.title),l.initText(t.text),f.default(t.content),u.default(t.buttons,t.dangerMode)};var m=function(){var t=o.getNode(s),e=o.stringToNode(r.modalMarkup);t.appendChild(e)};e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r={isOpen:!1,promise:null,actions:{},timer:null},i=Object.assign({},r);e.resetState=function(){i=Object.assign({},r)},e.setActionValue=function(t){if("string"==typeof t)return a(o.CONFIRM_KEY,t);for(var e in t)a(e,t[e])};var a=function(t,e){i.actions[t]||(i.actions[t]={}),Object.assign(i.actions[t],{value:e})};e.setActionOptionsFor=function(t,e){var n=(void 0===e?{}:e).closeModal,o=void 0===n||n;Object.assign(i.actions[t],{closeModal:o})},e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(0),a=i.default.OVERLAY,s=i.default.SHOW_MODAL,c=i.default.BUTTON,l=i.default.BUTTON_LOADING,u=n(5);e.openModal=function(){o.getNode(a).classList.add(s),u.default.isOpen=!0};var f=function(){o.getNode(a).classList.remove(s),u.default.isOpen=!1};e.onAction=function(t){void 0===t&&(t=r.CANCEL_KEY);var e=u.default.actions[t],n=e.value;if(!1===e.closeModal){var i=c+"--"+t;o.getNode(i).classList.add(l)}else f();u.default.promise.resolve(n)},e.getState=function(){var t=Object.assign({},u.default);return delete t.promise,delete t.timer,t},e.stopLoading=function(){for(var t=document.querySelectorAll("."+c),e=0;e<t.length;e++){t[e].classList.remove(l)}}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){t.exports=e.sweetAlert=n(9)}).call(e,n(7))},function(t,e,n){(function(e){t.exports=e.swal=n(10)}).call(e,n(7))},function(t,e,n){"undefined"!=typeof window&&n(11),n(16);var o=n(23).default;t.exports=o},function(t,e,n){var o=n(12);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insertAt:"top"};r.transform=void 0;n(14)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=m[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(u(o.parts[i],e));m[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=w[w.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=h++;n=g||(g=s(e)),o=f.bind(null,n,l,!1),r=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),o=d.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=y(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,h=0,w=[],y=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],c=m[s.id];c.refs--,i.push(c)}if(t){o(r(t,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var o=n(17);"undefined"==typeof window||window.Promise||(window.Promise=o),n(21),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var r=0|e,i=Math.max(r>=0?r:o-Math.abs(r),0);i<o;){if(function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}(n[i],t))return!0;i++}return!1}}),"undefined"!=typeof window&&function(t){t.forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})})}([Element.prototype,CharacterData.prototype,DocumentType.prototype])},function(t,e,n){(function(e){!function(n){function o(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(t,this)}function a(t,e){for(;3===t._state;)t=t._value;if(0===t._state)return void t._deferreds.push(e);t._handled=!0,i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:c)(e.promise,t._value);var o;try{o=n(t._value)}catch(t){return void c(e.promise,t)}s(e.promise,o)})}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(r(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)a(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function f(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(o);return a(this,new u(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(t){o(i,t)},n)}e[i]=a,0==--r&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var r=e.length,i=0;i<e.length;i++)o(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},void 0!==t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(18).setImmediate)},function(t,e,n){function o(t,e){this._id=t,this._clearFn=e}var r=Function.prototype.apply;e.setTimeout=function(){return new o(r.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(19),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){(function(t,e){!function(t,n){"use strict";function o(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return l[c]=o,s(c),c++}function r(t){delete l[t]}function i(t){var e=t.callback,o=t.args;switch(o.length){case 0:e();break;case 1:e(o[0]);break;case 2:e(o[0],o[1]);break;case 3:e(o[0],o[1],o[2]);break;default:e.apply(n,o)}}function a(t){if(u)setTimeout(a,0,t);else{var e=l[t];if(e){u=!0;try{i(e)}finally{r(t),u=!1}}}}if(!t.setImmediate){var s,c=1,l={},u=!1,f=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,"[object process]"==={}.toString.call(t.process)?function(){s=function(t){e.nextTick(function(){a(t)})}}():function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),s=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){a(t.data)},s=function(e){t.port2.postMessage(e)}}():f&&"onreadystatechange"in f.createElement("script")?function(){var t=f.documentElement;s=function(e){var n=f.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():function(){s=function(t){setTimeout(a,0,t)}}(),d.setImmediate=o,d.clearImmediate=r}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(7),n(20))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){b&&p&&(b=!1,p.length?m=p.concat(m):v=-1,m.length&&s())}function s(){if(!b){var t=r(a);b=!0;for(var e=m.length;e;){for(p=m,m=[];++v<e;)p&&p[v].run();v=-1,e=m.length}p=null,b=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var u,f,d=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var p,m=[],b=!1,v=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];m.push(new c(t,e)),1!==m.length||b||r(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";n(22).polyfill()},function(t,e,n){"use strict";function o(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,s=i.length;a<s;a++){var c=i[a],l=Object.getOwnPropertyDescriptor(r,c);void 0!==l&&l.enumerable&&(n[c]=r[c])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:o})}t.exports={assign:o,polyfill:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),r=n(6),i=n(5),a=n(36),s=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("undefined"!=typeof window){var n=a.getOpts.apply(void 0,t);return new Promise(function(t,e){i.default.promise={resolve:t,reject:e},o.default(n),setTimeout(function(){r.openModal()})})}};s.close=r.onAction,s.getState=r.getState,s.setActionValue=i.setActionValue,s.stopLoading=r.stopLoading,s.setDefaults=a.setDefaults,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(0),i=r.default.MODAL,a=n(4),s=n(34),c=n(35),l=n(1);e.init=function(t){o.getNode(i)||(document.body||l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"),s.default(),a.default()),a.initModalContent(t),c.default(t)},e.default=e.init},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.MODAL;e.modalMarkup='\n  <div class="'+r+'" role="dialog" aria-modal="true"></div>',e.default=e.modalMarkup},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.OVERLAY,i='<div \n    class="'+r+'"\n    tabIndex="-1">\n  </div>';e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.ICON;e.errorIconMarkup=function(){var t=r+"--error",e=t+"__line";return'\n    <div class="'+t+'__x-mark">\n      <span class="'+e+" "+e+'--left"></span>\n      <span class="'+e+" "+e+'--right"></span>\n    </div>\n  '},e.warningIconMarkup=function(){var t=r+"--warning";return'\n    <span class="'+t+'__body">\n      <span class="'+t+'__dot"></span>\n    </span>\n  '},e.successIconMarkup=function(){var t=r+"--success";return'\n    <span class="'+t+"__line "+t+'__line--long"></span>\n    <span class="'+t+"__line "+t+'__line--tip"></span>\n\n    <div class="'+t+'__ring"></div>\n    <div class="'+t+'__hide-corners"></div>\n  '}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.CONTENT;e.contentMarkup='\n  <div class="'+r+'">\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.BUTTON_CONTAINER,i=o.default.BUTTON,a=o.default.BUTTON_LOADER;e.buttonMarkup='\n  <div class="'+r+'">\n\n    <button\n      class="'+i+'"\n    ></button>\n\n    <div class="'+a+'">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(2),i=n(0),a=i.default.ICON,s=i.default.ICON_CUSTOM,c=["error","warning","success","info"],l={error:r.errorIconMarkup(),warning:r.warningIconMarkup(),success:r.successIconMarkup()},u=function(t,e){var n=a+"--"+t;e.classList.add(n);var o=l[t];o&&(e.innerHTML=o)},f=function(t,e){e.classList.add(s);var n=document.createElement("img");n.src=t,e.appendChild(n)},d=function(t){if(t){var e=o.injectElIntoModal(r.iconMarkup);c.includes(t)?u(t,e):f(t,e)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=n(4),i=function(t){navigator.userAgent.includes("AppleWebKit")&&(t.style.display="none",t.offsetHeight,t.style.display="")};e.initTitle=function(t){if(t){var e=r.injectElIntoModal(o.titleMarkup);e.textContent=t,i(e)}},e.initText=function(t){if(t){var e=document.createDocumentFragment();t.split("\n").forEach(function(t,n,o){e.appendChild(document.createTextNode(t)),n<o.length-1&&e.appendChild(document.createElement("br"))});var n=r.injectElIntoModal(o.textMarkup);n.appendChild(e),i(n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(4),i=n(0),a=i.default.BUTTON,s=i.default.DANGER_BUTTON,c=n(3),l=n(2),u=n(6),f=n(5),d=function(t,e,n){var r=e.text,i=e.value,d=e.className,p=e.closeModal,m=o.stringToNode(l.buttonMarkup),b=m.querySelector("."+a),v=a+"--"+t;if(b.classList.add(v),d){(Array.isArray(d)?d:d.split(" ")).filter(function(t){return t.length>0}).forEach(function(t){b.classList.add(t)})}n&&t===c.CONFIRM_KEY&&b.classList.add(s),b.textContent=r;var g={};return g[t]=i,f.setActionValue(g),f.setActionOptionsFor(t,{closeModal:p}),b.addEventListener("click",function(){return u.onAction(t)}),m},p=function(t,e){var n=r.injectElIntoModal(l.footerMarkup);for(var o in t){var i=t[o],a=d(o,i,e);i.visible&&n.appendChild(a)}0===n.children.length&&n.remove()};e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n(4),i=n(2),a=n(5),s=n(6),c=n(0),l=c.default.CONTENT,u=function(t){t.addEventListener("input",function(t){var e=t.target,n=e.value;a.setActionValue(n)}),t.addEventListener("keyup",function(t){if("Enter"===t.key)return s.onAction(o.CONFIRM_KEY)}),setTimeout(function(){t.focus(),a.setActionValue("")},0)},f=function(t,e,n){var o=document.createElement(e),r=l+"__"+e;o.classList.add(r);for(var i in n){var a=n[i];o[i]=a}"input"===e&&u(o),t.appendChild(o)},d=function(t){if(t){var e=r.injectElIntoModal(i.contentMarkup),n=t.element,o=t.attributes;"string"==typeof n?f(e,n,o):e.appendChild(n)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=function(){var t=o.stringToNode(r.overlayMarkup);document.body.appendChild(t)};e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(6),i=n(1),a=n(3),s=n(0),c=s.default.MODAL,l=s.default.BUTTON,u=s.default.OVERLAY,f=function(t){t.preventDefault(),v()},d=function(t){t.preventDefault(),g()},p=function(t){if(o.default.isOpen)switch(t.key){case"Escape":return r.onAction(a.CANCEL_KEY)}},m=function(t){if(o.default.isOpen)switch(t.key){case"Tab":return f(t)}},b=function(t){if(o.default.isOpen)return"Tab"===t.key&&t.shiftKey?d(t):void 0},v=function(){var t=i.getNode(l);t&&(t.tabIndex=0,t.focus())},g=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l),n=e.length-1,o=e[n];o&&o.focus()},h=function(t){t[t.length-1].addEventListener("keydown",m)},w=function(t){t[0].addEventListener("keydown",b)},y=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l);e.length&&(h(e),w(e))},x=function(t){if(i.getNode(u)===t.target)return r.onAction(a.CANCEL_KEY)},_=function(t){var e=i.getNode(u);e.removeEventListener("click",x),t&&e.addEventListener("click",x)},k=function(t){o.default.timer&&clearTimeout(o.default.timer),t&&(o.default.timer=window.setTimeout(function(){return r.onAction(a.CANCEL_KEY)},t))},O=function(t){t.closeOnEsc?document.addEventListener("keyup",p):document.removeEventListener("keyup",p),t.dangerMode?v():g(),y(),_(t.closeOnClickOutside),k(t.timer)};e.default=O},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(37),a=n(38),s={title:null,text:null,icon:null,buttons:r.defaultButtonList,content:null,className:null,closeOnClickOutside:!0,closeOnEsc:!0,dangerMode:!1,timer:null},c=Object.assign({},s);e.setDefaults=function(t){c=Object.assign({},s,t)};var l=function(t){var e=t&&t.button,n=t&&t.buttons;return void 0!==e&&void 0!==n&&o.throwErr("Cannot set both 'button' and 'buttons' options!"),void 0!==e?{confirm:e}:n},u=function(t){return o.ordinalSuffixOf(t+1)},f=function(t,e){o.throwErr(u(e)+" argument ('"+t+"') is invalid")},d=function(t,e){var n=t+1,r=e[n];o.isPlainObject(r)||void 0===r||o.throwErr("Expected "+u(n)+" argument ('"+r+"') to be a plain object")},p=function(t,e){var n=t+1,r=e[n];void 0!==r&&o.throwErr("Unexpected "+u(n)+" argument ("+r+")")},m=function(t,e,n,r){var i=typeof e,a="string"===i,s=e instanceof Element;if(a){if(0===n)return{text:e};if(1===n)return{text:e,title:r[0]};if(2===n)return d(n,r),{icon:e};f(e,n)}else{if(s&&0===n)return d(n,r),{content:e};if(o.isPlainObject(e))return p(n,r),e;f(e,n)}};e.getOpts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={};t.forEach(function(e,o){var r=m(0,e,o,t);Object.assign(n,r)});var o=l(n);n.buttons=r.getButtonListOpts(o),delete n.button,n.content=i.getContentOpts(n.content);var u=Object.assign({},s,c,n);return Object.keys(u).forEach(function(t){a.DEPRECATED_OPTS[t]&&a.logDeprecation(t)}),u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r={element:"input",attributes:{placeholder:""}};e.getContentOpts=function(t){var e={};return o.isPlainObject(t)?Object.assign(e,t):t instanceof Element?{element:t}:"input"===t?r:null}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.logDeprecation=function(t){var n=e.DEPRECATED_OPTS[t],o=n.onlyRename,r=n.replacement,i=n.subOption,a=n.link,s=o?"renamed":"deprecated",c='SweetAlert warning: "'+t+'" option has been '+s+".";if(r){c+=" Please use"+(i?' "'+i+'" in ':" ")+'"'+r+'" instead.'}var l="https://sweetalert.js.org";c+=a?" More details: "+l+a:" More details: "+l+"/guides/#upgrading-from-1x",console.warn(c)},e.DEPRECATED_OPTS={type:{replacement:"icon",link:"/docs/#icon"},imageUrl:{replacement:"icon",link:"/docs/#icon"},customClass:{replacement:"className",onlyRename:!0,link:"/docs/#classname"},imageSize:{},showCancelButton:{replacement:"buttons",link:"/docs/#buttons"},showConfirmButton:{replacement:"button",link:"/docs/#button"},confirmButtonText:{replacement:"button",link:"/docs/#button"},confirmButtonColor:{},cancelButtonText:{replacement:"buttons",link:"/docs/#buttons"},closeOnConfirm:{replacement:"button",subOption:"closeModal",link:"/docs/#button"},closeOnCancel:{replacement:"buttons",subOption:"closeModal",link:"/docs/#buttons"},showLoaderOnConfirm:{replacement:"buttons"},animation:{},inputType:{replacement:"content",link:"/docs/#content"},inputValue:{replacement:"content",link:"/docs/#content"},inputPlaceholder:{replacement:"content",link:"/docs/#content"},html:{replacement:"content",link:"/docs/#content"},allowEscapeKey:{replacement:"closeOnEsc",onlyRename:!0,link:"/docs/#closeonesc"},allowClickOutside:{replacement:"closeOnClickOutside",onlyRename:!0,link:"/docs/#closeonclickoutside"}}}])});
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"timers":7}],7:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":5,"timers":7}]},{},[3]);
