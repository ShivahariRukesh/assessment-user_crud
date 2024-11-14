var user_id;
$(document).ready(function () {
  axios
    .get("http://localhost:5000/api/allUsers")
    .then((res) => {
      const userData = res.data;

      if (userData?.length > 0) {
        userData.map((item) => {
          return $("table#userTable tbody").append(
            `<tr class="user-row" data-username="${item.username}" data-email="${item.email}" data-gender="${item.gender}" data-avatar-image="${item.avatarImage}" data-user-id="${item._id}">
              <td>
                <img src="${item.avatarImage}" class="rounded-circle img-fluid" alt="Avatar" style="height:50px;width:50px;margin-left:20px"/>
              </td>
              <td>${item.username}</td>
              <td>${item.email}</td>
              <td>${item.gender}</td>
              
            </tr>`
          );
        });

        $("table#userTable tbody").on("click", ".user-row", function () {
          const username = $(this).data("username");
          const email = $(this).data("email");
          const gender = $(this).data("gender");
          const avatar = $(this).data("avatar-image");
          user_id = $(this).data("user-id");
          $("#modalUsername").text(username);
          $("#modalEmail").text(email);
          $("#modalGender").text(gender);

          $("#modalAvatar").attr("src", avatar);

          $("#userModal").modal("show");
        });
      }
    })
    .catch((err) => console.log("Get All Users Error", err));

  $("#userModal button", "").click(() => {
    $("#userModal").modal("hide");
  });
});

$("div#userModal .modal-header button#modalDeleteButton").click(() => {
  axios
    .delete(`http://localhost:5000/api/deleteuser/${user_id}`)
    .then((res) => {
      console.log(res);
      location.reload();
    });
});

$("div#userModal .modal-header button#modalEditButton").click(() => {
  $("#userModal").modal("hide");
  $("#editUserModal").modal("show");

  const modalUsername = $(
    "#userModal div.modal-body span#modalUsername"
  ).text();

  const modalEmail = $("#userModal div.modal-body span#modalEmail").text();

  $("div#editUserModal form input#editEmail").val(modalEmail);
  $("div#editUserModal form input#editUsername").val(modalUsername);

  const modalGender = $("#userModal div.modal-body span#modalGender").text();

  $('#editUserModal input[name="gender"]').each(function () {
    if ($(this).val() == modalGender) {
      $(this).prop("checked", true);
    }
  });

  $("#editUserModal div.modal-footer button").click(() => {
    $("#editUserModal").modal("hide");
    $("#userModal").modal("show");
  });
});

$("form#editUserModalForm").on("submit", function (e) {
  e.preventDefault();

  const email = $("div#editUserModal form input#editEmail").val();
  const username = $("div#editUserModal form input#editUsername").val();

  const gender = $('#editUserModal input[name="gender"]:checked').val();
  console.log(email, username);
  axios
    .put(`http://localhost:5000/api/edituser/${user_id}`, {
      email,
      username,
      gender,
    })
    .then((res) => {
      console.log(res);
      location.reload();
    });
});
