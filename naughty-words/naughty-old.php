<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>A Simple PHP Form</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <a id="form"></a>
  <a id="newname"></a>
  <a id="table"></a>
  <nav>
    <ul>
      <li class="navbutton nava">
        <a href="#newname">New Name</a>
      </li>
      <li class="navbutton navb">
        <a href="#form">Form</a>
      </li>
      <li class="navbutton navc">
        <a href="#table">Table</a>
      </li>
    </ul>
  </nav>
  <section class="shade">
    <img class="arrow" src="Black_Down_Arrow.png">
    <div class="bar bar1"></div>
  </section>
  <section class="first">
    <div class="content">
      <h1>New Name</h1>
      <form id="submitName" action="" method="post">
        <h3>Add someone's name to the naughty list</h3>
        <label for="NewName">
          <p>And the next <span>contestant</span> is...</p>
        </label>
        <input type="text" name="NewName">
        <div class="buttondiv">
          <button type="submit" name="submitName" action="">Who Knew?!</button>
        </div>
      </form>
      <?php
          $user = 'root';
          $password = 'hyha2527';
          $db = 'words';
          $host = 'localhost';
          $port = 8889;

          $con = mysqli_init();
          $success = mysqli_real_connect($con, $host, $user, $password, $db, $port);

          if ($con === false) {
            echo "Error connecting";
          };
          if ($_POST) {
            if (isset($_POST['submitName'])) {
              //Submit Name 
              $NewName = $_REQUEST['NewName'];
              
              $getName = "INSERT INTO names (name) VALUES ('$NewName')
                ON DUPLICATE KEY UPDATE name=name";

              if ($con->query($getName) === TRUE) {
                header("Location: " . $_SERVER['PHP_SELF']);
                echo "You put the thing in the thing";
              } else {
                echo "Error: " . $GetName . "<br>" . $con->error;
              };
            };
          };
          mysqli_close($con);
        ?>
    </div>
  </section>
  <section class="second">
    <div class="bar bar2"></div>
    <div class="content">
      <h1>Form</h1>
      <form action="<?php echo $_SERVER[" PHP_SELF "];?>" method=post>
        <h3>What's your favorite naughty word?</h3>
        <label class="dropdown" for="YourName">
          <p>My <span>name</span> is:</p>
        </label>
        <select name="YourName">
          <?php
                $user = 'root';
                $password = 'hyha2527';
                $db = 'words';
                $host = 'localhost';
                $port = 8889;

                $con = mysqli_init();
                $success = mysqli_real_connect($con, $host, $user, $password, $db, $port);

                if ($con === false) {
                  echo "Error connecting";
                };

                $sql = mysqli_query($con, "SELECT name FROM names ORDER BY name ASC");

                while ($row = mysqli_fetch_array($sql)) {
                  echo "<option name=\"name\" value=\"" . $row['name'] . "\">" . $row['name'] . "</option>";
                };
              ?>
        </select>
        <label for="FavoriteWord">
          <p>...and this is my <span>dirty word</span>:</p>
        </label>
        <input type="text" name="FavoriteWord">
        <div class="buttondiv">
          <button type="submit" name="submitWord">That's Right!</button>
        </div>
      </form>
      <?php
          if (isset($_POST['submitWord'])) {
            $YourName     = $_REQUEST['YourName'];
            $FavoriteWord = $_REQUEST['FavoriteWord'];

            $sql = "INSERT INTO names (name, word) VALUES ('$YourName', '$FavoriteWord')
              ON DUPLICATE KEY UPDATE word='$FavoriteWord'";

            //Build Table
            $table = "SELECT name, word FROM names WHERE ((name IS NOT NULL AND name != '' ) AND (word IS NOT NULL AND word != '' )) ";

            $result = $con->query($table);
            if ($con->query($sql) === TRUE) {
              echo "You put the thing in the thing";
              header("Location: " . $_SERVER['PHP_SELF']);
            } else {
              echo "Error: " . $sql . "<br>" . $con->error;
            }
          };
          mysqli_close($con);
        ?>
    </div>
    <div class="bar bar3"></div>
  </section>
  <section class="third">
    <div class="content">
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <th>It's name</th>
            <th>A naughty word</th>
          </tr>
        </thead>
        <tbody>
          <?php
            $user = 'root';
                $password = 'hyha2527';
                $db = 'words';
                $host = 'localhost';
                $port = 8889;

                $con = mysqli_init();
                $success = mysqli_real_connect($con, $host, $user, $password, $db, $port);

            $sql = "SELECT name, word FROM names WHERE ((name IS NOT NULL AND name != '' ) AND (word IS NOT NULL AND word != '' )) ";

            $result = $con->query($sql);

            if ($result->num_rows > 0) {
              while ($row = mysqli_fetch_assoc($result)) {
                $name = ucwords($row['name']);
                $word = ucwords($row['word']);
                echo "<tr><td>" . $name . "</td>" . "<td>" . $word . "</td></tr>";
              }
            } else {
              echo "0 results";
            };
            mysqli_close($con);
          ?>
        </tbody>
      </table>
    </div>
  </section>
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="https://s3.amazonaws.com/menumaker/menumaker.min.js"></script>
  <script type="text/javascript">
  $(function() {
    $('#reg-form').submit(function(e){
    
    e.preventDefault(); // Prevent Default Submission
    
    $.ajax({
      url: 'submit.php',
      type: 'POST',
      data: $(this).serialize(), // it will serialize the form data
            dataType: 'html'
        })
        .done(function(data){
          $('#form-content').fadeOut('slow', function(){
               $('#form-content').fadeIn('slow').html(data);
            });
        })
        .fail(function(){
      alert('Ajax Submit Failed ...');  
        });
    });
    $(window).scroll(function() {
      var height = $(window).scrollTop();
      var position = $('.second').position().top;
      if (position <= height) {
        $('.first').css('display', 'none');
        $('.third').css('display', 'flex');
      };
      if (position > height) {
        $('.first').css('display', 'flex');
        $('.third').css('display', 'none');
      };
      console.log(height);
      console.log(position)
    });
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
  });
  </script>
</body>

</html>
