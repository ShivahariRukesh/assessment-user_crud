$(document).ready(function () {
  axios
    .get("http://localhost:5000/api/allUsers")
    .then((res) => {
      const userData = res.data;

      if (userData?.length > 0) {
        userData.map((item) => {
          return $("table#userTable tbody").append(
            `<tr><td><img src=${item.avatarImage}/></td><td>${item.username}</td><td>${item.email}</td><td>${item.gender}</td></tr>`
          );
        });
      }
    })
    .catch((err) => console.log("Get All Users Error", err));
});
