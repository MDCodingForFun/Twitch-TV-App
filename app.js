
$(document).ready(function(){

  $('#followingBtn').on('click', getFollowing());

  //Navbar
  $('.navName').on('click', function(){
    $('.navName').css('color','');
    $(this).css('color','white');
  })

});

// Call Twitch API
  function getFollowing(){

    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "relaxbeats", "h3h3productions"];

  for(i=0; i<streamers.length; i++)

  $.ajax({
    type:'GET',
    url: 'https://api.twitch.tv/kraken/channels/' + streamers[i],
    headers:{
      'client-ID': 'pves9cdsj1r6wzi96unhjvwom8y8s3',
    },
    success: function (UserData){
      // console.log(UserData); //Debugging

      var channelName = UserData.display_name;
      var logo = UserData.logo;
      var followers = (UserData.followers).toLocaleString('en');
      var userStat = UserData.status;
      var userLink = UserData.url;
      
      // #Following container html content
      if (userStat === null){
        userStat = "None";
      }

      // Check user status(Offline/Online) 
      $.getJSON('https://api.twitch.tv/kraken/streams/'+channelName+'?client_id=pves9cdsj1r6wzi96unhjvwom8y8s3',function(streaming){
        
      // console.log(streaming); //Debugging

        if(streaming.stream == null){

          var offlinetHtml = '<div class="followingResult"><div class ="firstCol"><img class="channelLogo" src="' +logo+ '" alt=""><i class="fas fa-circle"  style="color:gray"></i></p></div><div class="secondCol"><p class="Name"><a href="'+userLink+'" target="_blank">'+channelName+'</a></p><p><i class="fas fa-users"></i>: ' +followers+' followers</p><p class="channelStatus"> Status: '+userStat+'</p></div></div>';

        }else{
          // console.log(channelName+ " ONLINE");
          var game = streaming.stream.game;
          var views = (streaming.stream.viewers).toLocaleString('en');
          var preview =streaming.stream.preview.medium;
          var Link = streaming.stream._links.self;

          var onlineHtml = '<div class="followingResult"><div class ="firstCol"><img class="channelLogo" src="' +logo+ '" alt=""><i class="fas fa-circle"  style="color:rgb(66, 183, 42)"></i></p></div><div class="secondCol"><p class="Name"><a href="'+userLink+'" target="_blank">'+channelName+'</a></p><p><i class="fas fa-users"></i>: ' +followers+' followers</p><p class="channelStatus"> Status: '+userStat+'</p></div></div>';

          var ONLINE = '<div class="onlineResult"><div class ="firstCol_OL"><img class="channelLogo" src="' +logo+ '" alt=""><i class="fas fa-circle"  style="color:green"></i></p></div><div class="secondCol_OL"><div class="streamDetails"><p class="Name_OL"><a href="'+userLink+'" target="_blank">'+channelName+'</a></p><p class="game"><b>Game:</b> '+game+'</p><p class="views"><b>Viewers:</b> '+views+'</p></div><a class ="preview" href="'+userLink+'" target="_blank"><img class="previewIMG" src="'+preview+'"></a></div></div>';
        }

        $('#following').append(onlineHtml,offlinetHtml);

        // Show online channels
        $('#OnlineBtn').on('click',function(e){
          event.preventDefault();
          $('#Offline').empty();
          $('#following').hide();
          $('#Offline').hide();

          $('#Online').append(ONLINE);
          $('#Online').show();
        })

        //Show offline channels
        $('#OfflineBtn').on('click',function(e){
          event.preventDefault();
          $('#Online').empty();
          $('#following').hide();
          $('#Online').hide();

          $('#Offline').append(offlinetHtml);
          $('#Offline').show();
        })

        // Show all channels
        $('#followingBtn').on('click',function(e){
          event.preventDefault();
          $('#Online').empty();
          $('#Offline').empty();
          $('#Offline').hide();
          $('#Online').hide();
          $('#following').show();
        })
        
        //Filter search
      $('#searchInput').on('keyup',function match(str){

        var str =$.trim($('#searchInput').val());
        str = str.toLowerCase();
        var srchResult =document.getElementsByClassName('followingResult');
        // console.log(srchResult);
        
        for(i=0; i<srchResult.length; i++){
          var x = srchResult[i].getElementsByTagName('a');
              x =x[0].innerText;
              x =x.toLowerCase();
              // console.log(x);
          if(x.indexOf(str) > -1){
            srchResult[i].style.display ="";
          }else{
            srchResult[i].style.display ="none";
          }
        }
      }); //End of Filter search
   
      })

    },
    error:function(err){
      $('.channelStatus').html("Status: Channel no longer exist.")
    }

  })
    
}
