$(function () {
  var saveComment = function (data) {
    // Convert pings to human readable format
    $(Object.keys(data.pings)).each(function (index, userId) {
      var fullname = data.pings[userId];
      var pingText = "@" + fullname;
      data.content = data.content.replace(new RegExp("@" + userId, "g"), pingText);
    });

    return data;
  };
  $("#comments-container").comments({
    profilePictureURL: "https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png",
    currentUserId: 1,
    roundProfilePictures: true,
    textareaRows: 1,
    enableAttachments: true,
    enableHashtags: true,
    enablePinging: true,
    scrollContainer: $(window),
    searchUsers: function (term, success, error) {
      setTimeout(function () {
        success(
          usersArray.filter(function (user) {
            var containsSearchTerm = user.fullname.toLowerCase().indexOf(term.toLowerCase()) != -1;
            var isNotSelf = user.id != 1;
            return containsSearchTerm && isNotSelf;
          })
        );
      }, 500);
    },
    getComments: function (success, error) {
      setTimeout(function () {
        success(commentsArray);
      }, 500);
    },
    postComment: function (data, success, error) {
      setTimeout(function () {
        success(saveComment(data));
      }, 500);
    },
    putComment: function (data, success, error) {
      setTimeout(function () {
        success(saveComment(data));
      }, 500);
    },
    deleteComment: function (data, success, error) {
      setTimeout(function () {
        success();
      }, 500);
    },
    upvoteComment: function (data, success, error) {
      setTimeout(function () {
        success(data);
      }, 500);
    },
    validateAttachments: function (attachments, callback) {
      setTimeout(function () {
        callback(attachments);
      }, 500);
    },
  });
});

// $(document).ready(function () {
//   $("button").click(function () {
//     var comment = $(".commentBox").val();
//     $("<li>").text(comment).prependTo(".comments");
//     $("button").attr("disabled", "true");
//     $(".counter").text("500");
//     $(".commentBox").val("");
//   });

//   $(".commentBox").keyup(function () {
//     var commentLength = $(this).val().length;
//     var charLeft = 500 - commentLength;
//     $(".counter").text(charLeft);

//     if (commentLength == 0) {
//       $("button").attr("disabled", "true");
//     } else if (commentLength > 500) {
//       $("button").attr("disabled", "true");
//     } else {
//       $("button").removeAttr("disabled", "true");
//     }
//   });

//   $("button").attr("disabled", "true");
// });
