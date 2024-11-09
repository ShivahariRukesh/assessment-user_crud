$(document).ready(function () {});

$("#toggleFormButton").click(function () {
  $("#loginForm").toggle();
  $("#registrationForm").toggle();
  if ($("#loginForm").is(":visible")) {
    $("#toggleFormButton").text("Switch to Registration");
  } else {
    $("#toggleFormButton").text("Switch to Login");
  }
});

$("#loginForm").on("submit", function (e) {
  e.preventDefault();

  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();

  axios
    .post("http://localhost:5000/api/login", { email, password })
    .then((res) => {
      if (res.data.status) {
        window.location.href = "home.html";
      }
      console.log(res.data.status);
    })
    .catch((err) => {
      console.log("Login Error", err);
    });
});

$("#loginForm").on("submit", function (e) {
  e.preventDefault();

  const email = $("#loginEmail").val();
  const password = $("#loginPassword").val();

  axios
    .post("http://localhost:5000/api/login", { email, password })
    .then((res) => {
      console.log(res);
      //   if (res.data.status === true) window.location.href = "home.html";
    })
    .catch((err) => {
      console.log("Login Error", err);
    });
});
