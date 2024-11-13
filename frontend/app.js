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
  console.log(user_id);
});
