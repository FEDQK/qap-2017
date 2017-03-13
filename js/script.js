var currentPopupId = null;
window.onload = function() {
var $grid = $('#grid');

    var Lists = function() {
        imageList = [{
                id: 1,
                alt: 'img1',
                src: 'images/1.png',
                like: 3,
                dislike: 2,
                type: 'type-width',
                comments: [{
                    id: 1,
                    nickName: "Misha",
                    date: 'Today',
                    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat."
                },
                {
                    id: 2,
                    nickName: "Misha2",
                    date: 'Today2',
                    text: "test text test text test text test text test text test text"
                },
                {
                    id: 3,
                    nickName: "Misha3",
                    date: 'Today3',
                    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat."
                },
                {
                    id: 4,
                    nickName: "Misha4",
                    date: 'Today4',
                    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat."
                },
                {
                    id: 5,
                    nickName: "Misha5",
                    date: 'Today5',
                    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat."
                },
                {
                    id: 6,
                    nickName: "Misha6",
                    date: 'Today6',
                    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat."
                },
                {
                    id: 7,
                    nickName: "Misha7",
                    date: 'Today7',
                    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat."
                }
              ]
            },
            {
                id: 2,
                alt: 'img2',
                src: 'images/2.png',
                like: 8,
                dislike: 5,
                type: 'type-standart',
                comments: [{
                    id: 1,
                    nickName: "Misha",
                    date: 'Today',
                    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat."
                }]
            },
            {
                id: 3,
                alt: 'img3',
                src: 'images/3.png',
                like: 0,
                dislike: 0,
                type: 'type-standart',
                comments: []
            },
            {
                id: 4,
                alt: 'img4',
                src: 'images/4.png',
                like: 10,
                dislike: 5,
                comments: []
            },
            {
                id: 5,
                alt: 'img5',
                src: 'images/5.png',
                like: 0,
                dislike: 0,
                type: 'type-width',
                comments: []
            },
            {
                id: 6,
                alt: 'img6',
                src: 'images/6.png',
                like: 0,
                dislike: 0,
                type: 'type-height',
                comments: []
            },
            {
                id: 7,
                alt: 'img7',
                src: 'images/7.png',
                like: 0,
                dislike: 0,
                type: 'type-standart',
                comments: []
            },
            {
                id: 8,
                alt: 'img8',
                src: 'images/8.png',
                like: 0,
                dislike: 0,
                type: 'type-standart',
                comments: []
            },
            {
                id: 9,
                alt: 'img8',
                src: 'images/8.png',
                like: 0,
                dislike: 0,
                type: 'type-standart',
                comments: []
            },
            {
                id: 10,
                alt: 'img8',
                src: 'images/8.png',
                like: 0,
                dislike: 0,
                type: 'type-standart',
                comments: []
            }
        ];

        infoIcons = [{
                imgSrc: 'images/icon-comments.png',
                imgClass: 'icon-info icon-comments',
                alt: 'comments',
                spanClass: 'count-info count-comments'
            },

            {
                imgSrc: 'images/icon-like.png',
                imgClass: 'icon-info icon-likes',
                alt: 'like',
                spanClass: 'count-info count-likes'
            },
						{
                imgSrc: 'images/icon-dislike.png',
                imgClass: 'icon-info icon-likes',
                alt: 'dislike',
                spanClass: 'count-info count-likes'
            }
        ];

        detailInfoIcons = [
          {
            type: 'like',
            divClass: 'block-likes like-icon'
          },
          {
            type: 'dislike',
            divClass: 'block-likes dislike-icon'
          }
        ];

        viewGrid();
    }

    function viewGrid() {
      $grid.html("");
      for (var index in imageList) {
          var div = document.createElement('div');
          div.className = "image-block " +imageList[index].type;
          $(div).attr("data-id", imageList[index].id);

          var image = document.createElement('img');
          image.src = imageList[index].src;
          image.alt = imageList[index].alt;
          div.appendChild(image);

          var imageInfo = document.createElement('div');
          imageInfo.className = "image-info";

          for (var infoProp in infoIcons) {
              var infoImage = document.createElement('img');
              infoImage.className = infoIcons[infoProp].imgClass;
              infoImage.src = infoIcons[infoProp].imgSrc;
              infoImage.alt = infoIcons[infoProp].alt;

              imageInfo.appendChild(infoImage);

              var infoSpan = document.createElement('span');
              var count = infoIcons[infoProp]['alt'];
              if(infoIcons[infoProp]['alt'] == 'comments') {
                infoSpan.innerHTML = imageList[index][count].length;
              }
              else {
                infoSpan.innerHTML = imageList[index][count];
              }
              infoSpan.className = infoIcons[infoProp].spanClass;

              imageInfo.appendChild(infoSpan);
          }
          div.appendChild(imageInfo);
          $grid.append(div);
      }
      viewAddNew();
      refresh();
      $('.image-block').click(function() {
        $('.popup, .popup_overlay').show();
        currentPopupId = $(this).attr("data-id");
        viewPopup();
      });
      $grid.isotope('reloadItems');
      addNewImage();
    }

		function viewAddNew() {
			var addNew = document.createElement('div');
			addNew.id = "add-new-image";
			addNew.innerHTML = "<label><div class='center-image'><span>Add your<br />Picture</span></div><input type='file' id='fileInput' /></label>";
			$grid.append(addNew);
		}

		function refresh() {
      setTimeout(function() {
        $('#grid').isotope({
            layoutMode: 'masonryHorizontal',
        });
      }, 0);
		}

    function viewPopup() {
      $('.popup').html("");
      currentObject = findElement();
      viewPopupImageLikes();
      viewPopupComments();
    }

    function formatDate() {
      var date = new Date();
      var dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      var mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      var yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;

      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + mi;
    }

    function findElement() {
      for (var index in imageList) {
        if(imageList[index].id == currentPopupId) {
          return imageList[index];
        }
      }
    }

    function viewPopupComments() {
      $(".detail-comments").detach();
      var detailComments = document.createElement('div');
      detailComments.className = "detail-comments";

      var detailCountComments = document.createElement('div');
      detailCountComments.className = "detail-count-comments";
      detailCountComments.innerHTML = '<div class="popup-close"><img src="images/icon-close.png" alt="close" /></div>'

      var spanCount = document.createElement('span');
      spanCount.innerHTML = "Comments: "+ currentObject.comments.length;
      detailCountComments.appendChild(spanCount);
      detailComments.appendChild(detailCountComments);

      var wrapperComments = document.createElement('div');
      wrapperComments.className = "wrapper-comments";
      for (var currentComment in currentObject.comments) {
        var userComment = document.createElement('div');
        userComment.className = "user-comment";
        userComment.innerHTML = '<div class="comment-info"><span>'+currentObject.comments[currentComment].nickName+'</span><span class="comment-date">'+currentObject.comments[currentComment].date+'</span></div><div class="commnet-text"><span>'+currentObject.comments[currentComment].text+'</span></div>';
        wrapperComments.appendChild(userComment);
      }
      detailComments.appendChild(wrapperComments);
      var formAddComment = document.createElement('div');
      formAddComment.className = "form-add-comment";
      formAddComment.innerHTML = '<input type="text" class="user-nickname user-input" placeholder="Type you nickname here..." /><textarea name="comment" class="user-text user-input" placeholder="Write your comment here..." ></textarea><div class="button-send"></div>';
      detailComments.appendChild(formAddComment);
      $('.popup').append(detailComments);

      $('.button-send').on('click', function() {
        var userNickname = $('.user-nickname').val();
        var userTextComment = $('.user-text').val();
        var newComment = {
          id: Date.now(),
          date: formatDate(),
          nickName: $('.user-nickname').val(),
          text: $('.user-text').val()
        };
        currentObject.comments.push(newComment);
        viewPopupComments();

        $('.user-nickname').val('');
        $('.user-text').val('');
      });

      $('.popup_overlay, .popup-close img').on('click', function() {
        $('.popup, .popup_overlay').hide();
        currentPopupId = null;
        viewGrid();
      });
    }

    function viewPopupImageLikes() {
      $(".detail-image").detach();
      var detailImage = document.createElement('div');
      detailImage.className = "detail-image";
      var img = document.createElement('img');
      img.src = currentObject.src;
      img.alt = currentObject.alt;
      detailImage.appendChild(img);

      var detailLikes = document.createElement('div');
      detailLikes.className = "detail-likes";

      for (var infoProp in detailInfoIcons) {
        var likeIcon = document.createElement('div');
        likeIcon.className = detailInfoIcons[infoProp].divClass;
        $(likeIcon).attr('data-type', detailInfoIcons[infoProp]['type']);

        var countInfo = document.createElement('span');
        countInfo.className = "count-info";

        var count = detailInfoIcons[infoProp]['type'];
        countInfo.innerHTML = currentObject[count];
        likeIcon.appendChild(countInfo);
        detailLikes.appendChild(likeIcon);
      }
      detailImage.appendChild(detailLikes);
      $('.popup').append(detailImage);

      $(".block-likes").on('click', function() {
        var type = $(this).attr('data-type');
        var self = $(this);
        if(type == 'like') {
          $(this).addClass("active-like-icon");
          currentObject.like++;
        }
        else {
          $(this).addClass("active-dislike-icon");
          currentObject.dislike++;
        }
        $(this).css('bottom', "0");
        setTimeout(function() {
          viewPopup();
          $(self).css('bottom', "7px");
          $(self).removeClass("active-like-icon active-dislike-icon");
        }, 200);
      });
    }



		function addNewImage() {
			var fileInput = document.getElementById('fileInput');
	    fileInput.addEventListener('change', function(e) {
	      var file = fileInput.files[0];
	      var imageType = /image.*/;

	        if (file.type.match(imageType)) {
	            var reader = new FileReader();

	            reader.onload = function(e) {
                  var imgType = "type-standart", imgWidth;
                  const standartH = 305,
                  standartW = 359;

                  var img = new Image();
                  img.src = reader.result;
                  imgWidth = img.width;
                  imgHeight = img.height;
                  if(imgWidth > standartW) {
                    imgType = "type-width";
                  }
                  if(imgHeight > standartH) {
                    imgType = "type-height";
                  }

                  var newImage = {
                    id: Date.now(),
                    alt: "img"+Date.now(),
                    src: reader.result,
                    like: 0,
                    dislike: 0,
                    type: imgType,
                    comments: []
                  };

                  imageList.push(newImage);
                  viewGrid();
	            }
	            reader.readAsDataURL(file);
	        } else {
	            $grid.html("File not supported!");
	        }
	    });
		}


    window.list = new Lists();
}
