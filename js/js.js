window.onload = function() {

    var Lists = function() {
        imageList = [{
                id: 1,
                alt: 'img1',
                src: 'images/1.png',
                like: 3,
                dislike: 2,
                comments: [{
                    id: 1,
                    nickName: "Misha",
                    date: 'Today',
                    text: "Hi, this test text Hi, this test text Hi, this test text Hi, this test text Hi, this test text Hi, this test text Hi, this test text"
                },
                {
                    id: 2,
                    nickName: "Misha2",
                    date: 'Today2',
                    text: "Hi, this test text"
                },
                {
                    id: 2,
                    nickName: "Misha2",
                    date: 'Today2',
                    text: "Hi, this test text"
                },
                {
                    id: 2,
                    nickName: "Misha2",
                    date: 'Today2',
                    text: "Hi, this test text"
                },
                {
                    id: 2,
                    nickName: "Misha2",
                    date: 'Today2',
                    text: "Hi, this test text"
                },
                {
                    id: 2,
                    nickName: "Misha2",
                    date: 'Today2',
                    text: "Hi, this test text"
                },
                {
                    id: 2,
                    nickName: "Misha2",
                    date: 'Today2',
                    text: "Hi, this test text"
                }
              ]
            },
            {
                id: 2,
                alt: 'img2',
                src: 'images/2.png',
                like: 8,
                dislike: 5,
                comments: [{
                    id: 1,
                    nickName: "Misha",
                    date: 'Today',
                    text: "Hi, this test text"
                }]
            },
            {
                id: 3,
                alt: 'img3',
                src: 'images/3.png',
                like: 0,
                dislike: 0,
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
                comments: []
            },
            {
                id: 6,
                alt: 'img6',
                src: 'images/6.png',
                like: 0,
                dislike: 0,
                comments: []
            },
            {
                id: 7,
                alt: 'img7',
                src: 'images/7.png',
                like: 0,
                dislike: 0,
                comments: []
            },
            {
                id: 8,
                alt: 'img8',
                src: 'images/8.png',
                like: 0,
                dislike: 0,
                comments: []
            },
            {
                id: 9,
                alt: 'img8',
                src: 'images/8.png',
                like: 0,
                dislike: 0,
                comments: []
            },
            {
                id: 10,
                alt: 'img8',
                src: 'images/8.png',
                like: 0,
                dislike: 0,
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
        var currentPopupId = null;
        viewGrid();
				viewAddNew();
				addNewImage();

        $('.image-block').click(function() {
          $('.popup, .popup_overlay').show();
          viewPopup($(this));
        });

				//refresh();

    }

    function viewGrid() {
      var gridImages = document.getElementById('grid');
      gridImages.innerHTML = "";
      for (var index in imageList) {
          var div = document.createElement('div');
          div.className = "image-block";
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
          gridImages.appendChild(div);
      }
      refresh();
    }

		function viewAddNew() {
			var gridImages = document.getElementById('grid');
			var addNew = document.createElement('div');
			addNew.id = "add-new-image";
			addNew.innerHTML = "<label><div class='center-image'><span>Add your<br />Picture</span></div><input type='file' id='fileInput' /></label>";
			gridImages.appendChild(addNew);
		}

		function refresh() {
      setTimeout(function() {
        $('#grid').isotope({
            layoutMode: 'masonryHorizontal',
        });
      }, 10);
		}

    function viewPopup(image) {
      currentPopupId = image.attr("data-id");
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
      var mm = date.getMinutes();
      return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + mm;
    }

    function findElement() {
      for (var index in imageList) {
        if(imageList[index].id == currentPopupId) {
          return imageList[index];
        }
      }
    }

    function viewPopupComments() {
      $(".detail-comments").detach()
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
        /*var commentInfo = document.createElement('div');
        commentInfo.className = "comment-info";

        var commentNickname = document.createElement('span');
        commentNickname.innerHTML = currentObject.comments[currentComment].nickName;

        var commentDate = document.createElement('span');
        commentDate.className = "comment-date";
        commentDate.innerHTML = currentObject.comments[currentComment].date;

        commentInfo.appendChild(commentNickname);
        userComment.appendChild(commentInfo);*/
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

        var countInfo = document.createElement('span');
        countInfo.className = "count-info";

        var count = detailInfoIcons[infoProp]['type'];
        countInfo.innerHTML = currentObject[count];
        likeIcon.appendChild(countInfo);
        detailLikes.appendChild(likeIcon);
      }
      detailImage.appendChild(detailLikes);
      $('.popup').append(detailImage);
    }



		function addNewImage() {
			var fileInput = document.getElementById('fileInput');
	    var gridImages = document.getElementById('grid');
	    fileInput.addEventListener('change', function(e) {
	        var file = fileInput.files[0];
	        var imageType = /image.*/;

	        if (file.type.match(imageType)) {
	            var reader = new FileReader();

	            reader.onload = function(e) {
	                //gridImages.innerHTML = "";

	                var img = new Image();
	                img.src = reader.result;

	                var div = document.createElement('div');
	                div.className = "image-block";
	                div.appendChild(img);

	                gridImages.appendChild(div);
	            }

	            reader.readAsDataURL(file);
	        } else {
	            gridImages.innerHTML = "File not supported!"
	        }
	    });
			refresh();
		}


    window.list = new Lists();
}
