<!DOCTYPE html>
<html>
<head>

  <title>JSprow</title>

  <link rel="stylesheet" type="text/css" href="main.css">
  
  <link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://jsprow.com/apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://jsprow.com/apple-touch-icon-114x114.png" />
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://jsprow.com/apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://jsprow.com/apple-touch-icon-144x144.png" />
  <link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://jsprow.com/apple-touch-icon-120x120.png" />
  <link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://jsprow.com/apple-touch-icon-152x152.png" />
  
  <link rel="icon" type="image/png" href="https://jsprow.com/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="https://jsprow.com/favicon-16x16.png" sizes="16x16" />
  
  <meta name="application-name" content="JSprow"/>
  <meta name="msapplication-TileColor" content="#FFFFFF" />
  <meta name="msapplication-TileImage" content="https://jsprow.com/mstile-144x144.png" />

</head>
<body id="body-duh">
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-85365382-2', 'auto');
  ga('send', 'pageview');

</script>
  <div id="video"></div>
    <main>
      <h1>home of...</h1>
      <a href="flexbox/flex.html">...a responsive template using flexbox</a>
      <a href="emailform/emailform.php">...an email contact form</a>
      <a href="wikipedia/index.php">...flashcards scraped from wikipedia</a>
      <a href="checkin/index.php">...a check-in/out form using MySQL</a>
      <a href="grades.html">...a grade calculator</a>
      <a href="bulma/index.html">...a pretty layout using Bulma</a>
      <a id="catering" href="http://emacatering.com">...a catering website</a>
      <p id="cateringHover">check out the print button</p>
      <div class="space-invader-box">
        <div class="space-invader"></div>
      </div>
      <div class="space-invader-box__top">
        <div class="space-invader__top"></div>
      </div>
    </main>

  <script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
  <script src="youtubebg.js"></script>
  <script>
    $(function() {
      $('#catering').hover(function() {
        $('#cateringHover').slideToggle(50);
      });
      var videos = ['OQSNhk5ICTI', 'J---aiyznGQ', 'a1Y73sPHKxw', 'sTSA_sWGM44', 'FJ3oHpup-pk', 'wCF3ywukQYA', 'dMH0bHeiRNg', 'r6tlw-oPDBM', 'lAl28d6tbko', 'EwTZ2xpQwpA'];
      var randomVideo = videos[Math.floor(Math.random() * videos.length)];
      $('#video').YTPlayer({
        fitToBackground: true,
        videoId: randomVideo,
        repeat: true,
        mute: false,
        events: {
          'onReady': onPlayerReady
        }
      });
      function onPlayerReady() {
        var player = $('#video').data('ytPlayer').player;
        player.pauseVideo();
      };
      $('.space-invader-box').click(function() {
        $('h1').addClass('dim');
        $('a').addClass('dim');
        $('a').addClass('right');
        $('h1').addClass('right');
        $('.space-invader-box__top').addClass('right');
        $('#video').fadeIn();
        $(this).hide();
        $('.space-invader-box__top').fadeIn();
        $('.space-invader__top').fadeIn();
        var player = $('#video').data('ytPlayer').player;
        player.playVideo();
      });
      $('.space-invader-box__top').click(function() {
        $('h1').removeClass('dim');
        $('a').removeClass('dim');
        $('a').removeClass('right');
        $('h1').removeClass('right');
        $('.space-invader-box__top').removeClass('right');
        var player = $('#video').data('ytPlayer').player;
        player.pauseVideo();
        $('#video').fadeOut();
        $(this).hide();
        $('.space-invader-box').fadeIn();
        $('.space-invader').fadeIn();
      });
    });
  </script>
</body>
</html>
