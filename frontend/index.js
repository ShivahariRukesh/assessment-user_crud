$(document).ready(function () {
  $("#toggleFormLink").click(function () {
    $("#loginForm").toggle();
    $("#registrationForm").toggle();

    if ($("#loginForm").is(":visible")) {
      $("#toggleFormLink").text("Register");
      $("#toggleFormText").text("Don't Have An Account? Then");
    } else {
      $("#toggleFormLink").text("Login");
      $("#toggleFormText").text("Already Have An Account? Then");
    }
  });
});

$("#loginForm").on("submit", function (e) {
  e.preventDefault();

  const email = $("input#loginEmail").val();
  const password = $("input#loginPassword").val();

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

$("#registrationForm").on("submit", function (e) {
  e.preventDefault();

  const email = $("input#registrationEmail").val();
  const username = $("input#registrationUsername").val();
  const password = $("input#registrationPassword").val();
  const avatarImage = $('input[name="imageOption"]:checked').val();
  const gender = $('input[name="gender"]:checked').val();
  axios
    .post("http://localhost:5000/api/register", {
      email,
      password,
      avatarImage,
      username,
      gender,
    })
    .then((res) => {
      console.log(res);
      if (res.data.status === true) window.location.href = "home.html";
    })
    .catch((err) => {
      console.log("Registration Error", err);
    });
});

$('input[name="imageOption"]').change(function () {
  let listsOfOptions = $('input[name="imageOption"]');

  let selectedValue = $('input[name="imageOption"]:checked').val();

  listsOfOptions.map((index, list) => {
    if (list.value == selectedValue) {
      $(`label[for=${selectedValue}] img`).css("border", "8px solid purple");
    } else {
      $(`label[for=${list.value}] img`).css("border", "transparent");
    }
  });
});