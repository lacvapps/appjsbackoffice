<?php
if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "" || $_SERVER['HTTPS'] == "off"){
    $redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: $redirect");
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Socal Safe</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css">

  <!-- Optional theme -->
  <link rel="stylesheet" href="css/bootstrap-theme.min.css">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/animate.css">
  <!-- Custom styles for this template -->
  <link href="css/dashboard.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="css/slick.css"/>

  <!--Add the slick-theme.css if you want default styling-->
  <link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>

  <!--<link rel="stylesheet" href="https//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">-->

  <link rel="stylesheet" href="js/libs/pickadate/lib/themes/default.css">
  <link rel="stylesheet" href="js/libs/pickadate/lib/themes/default.date.css">
  

</head>
<body>
  <script type="text/x-handlebars">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="javascript:;">Socal Safe</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li class="hidden">{{#link-to "help"}}Help{{/link-to}}</li>
            <li>{{#link-to "setting"}}Settings{{/link-to}}</li>
            <li><a style="cursor: pointer;" onclick="logout()">Logout</a></li>
          </ul>
          
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar" id="menunavbar">
          
          {{view "menunavbar"}}
          
          {{view "subnavbar"}}
          
          <ul class="nav nav-sidebar">
          <!--
            <li><a href="#">Nav item again</a></li>
            <li><a href="#">One more nav</a></li>
            <li><a href="#">Another nav item</a></li>
          -->
          </ul>
        <div id="terminalLegend" class="row placeholders hidden">
          <div class="col-xs-12 placeholder" id="legend">
          <h3> Legend</h3>
            <ul>
              <h4>Notes</h4>
              <li><canvas id="blueCanvas" width="15" height="15" style="border:1px solid #000; background-color:#00aef7;"></canvas> $1 </li>
              <li><canvas id="greyCanvas" width="15" height="15" style="border:1px solid #000; background-color:#7e7e7e;"></canvas> $2 </li>
              <li><canvas id="yellowCanvas" width="15" height="15" style="border:1px solid #000; background-color:#fff110;"></canvas> $5  </li>
              <li><canvas id="orangeCanvas" width="15" height="15" style="border:1px solid #000; background-color:#ffa210;"></canvas> $10 </li>              
              <li><canvas id="greenCanvas" width="15" height="15" style="border:1px solid #000; background-color:#18de59;"></canvas> $20 </li>
              <li><canvas id="purpleCanvas" width="15" height="15" style="border:1px solid #000; background-color:#cc31ff;"></canvas> $50 </li>
              <li><canvas id="redCanvas" width="15" height="15" style="border:1px solid #000; background-color:#fa4343;"></canvas> $100 </li>
            </ul>
            <ul>
              <h4>Coins</h4>
              <li><canvas id="blueCanvas" width="15" height="15" style="border:1px solid #000; background-color:#00aef7;"></canvas> .01 ₵ </li>
              <li><canvas id="greyCanvas" width="15" height="15" style="border:1px solid #000; background-color:#fff110;"></canvas> .05 ₵ </li>
              <li><canvas id="yellowCanvas" width="15" height="15" style="border:1px solid #000; background-color:#ffa210;"></canvas> .10 ₵ </li>
              <li><canvas id="orangeCanvas" width="15" height="15" style="border:1px solid #000; background-color:#18de59;"></canvas> .25 ₵ </li>              
              <li><canvas id="greenCanvas" width="15" height="15" style="border:1px solid #000; background-color:#cc31ff;"></canvas> .50 ₵ </li>
              <li><canvas id="purpleCanvas" width="15" height="15" style="border:1px solid #000; background-color:#fa4343;"></canvas> 1.00 ₵ </li>
            </ul>
          </div>
        </div>
        </div>
        
        {{outlet}}

      </div>
    </div>
    
  </script>

  <script type="text/x-handlebars" id="index">
    
  </script>

  <script type="text/x-handlebars" id="login">
    <div class="container" id="loginContainer">

      <form class="form-signin">
        <h2 class="form-signin-heading">Login</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <!--
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        -->
        <button class="btn btn-lg btn-primary btn-block" type="submit"  {{action "doAuthenticate"}}>Submit</button>
        <div class="alert alert-danger alert-dismissible hidden" role="alert" id="badLoginCredentialsPrompt">
          <button type="button" class="close"  aria-label="Close" {{action "hideBadLoginCredentialsPrompt"}}><span aria-hidden="true">&times;</span></button>
          
          <strong>Invalid</strong> email address and/or password!
        </div>
      </form>

    </div>    
  </script>

  <script type="text/x-handlebars" id="components/terminal-selection">
    <div class="col-xs-6 col-sm-3 placeholder">
      <img data-src="holder.js/200x200/auto/#33CC00:#fff/text: Terminal 1" class="img-responsive" alt="Generic placeholder thumbnail">
      <h4>Terminal 1</h4>
      <span class="text-muted">Status: Active</span>
    </div>
  </script>


  <script type="text/x-handlebars" id="terminal">

    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <h1 class="page-header" id="terminalSelectionHeader">Terminals</h1>
        <div id="terminalSelection" class="row placeholders">
        </div>
        <!--<h2 id="terminalHeader" class="sub-header text-center"></h2>-->

        <div id="terminalPanel" class="panel panel-default hidden">
          <div class="panel-heading">
            <div class="btn-group btn-group-justified" role="group" aria-label="Justified button group with nested dropdown">
            <!--<h1 id="terminalHeader" class="panel-title text-center" style="color:#31708F;"></h1><button id="terminalHeader" class="btn btn-info" role="button" {{action "showTerminalSelection"}}></button>-->
            <a id="terminalHeader" class="btn btn-info hidden" role="button" {{action "showTerminalSelection"}}>Select Terminal</a>
            </div>
          </div>
          <div class="panel-body">
            
            <div class="btn-group btn-group-justified" role="group" aria-label="Justified button group with nested dropdown">
              <!--<a id="showTerminalsButton" class="btn btn-info hidden" role="button" {{action "showTerminalSelection"}}>Select Terminal</a>-->
              <!--
              <div class="btn-group dropup" role="group">
                <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                  Reports <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="javascript:;">Grand Totals Now</a></li>
                  <li><a href="javascript:;">User Detail</a></li>
                  <li><a href="javascript:;">User Summary</a></li>
                  <li class="divider"></li>
                  <li><a href="javascript:;" style="color: #C9302C;">Cancel</a></li>
                </ul>
              </div>
              <a href="javascript:;" class="btn btn-info" role="button">Action 3</a>
              -->
            </div>

            <div class="table-responsive" style="height: 150px; overflow: auto;">
              <table id="denominationTable" class="table table-hover">
                  <thead>
                    <tr>
                      <th >Denomination</th>
                      <th >Count</th>
                      <!--<th class="text-center">Amount</th>-->
                    </tr>
                  </thead>
                  <tbody id="denominationTableBody" class="hidden">
                  </tbody>
              </table>
            </div>
            
          </div>
          <div class="panel-footer text-center" style="height: 40px;">
            <div class="pull-left">Error: <span id="terminalErrorCode" class="text-danger"></span></div>
            <!--<button id="showTerminalsButton" class="btn btn-default hidden" >Select Terminal</button>-->
            <div class="pull-right">Total: <span id="terminalGrandTotal" class="text-success">$0.00</span></div>
          </div>
        </div>
        <div id="cassettePieCharts" class="row placeholders hidden">
          <!--
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>1¢</span><br/>
            <div id="pennyPieChart" class="chart " data-percent="100"><div class="percent"></div>
            </div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>5¢</span><br/>
            <div id="nickelPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>10¢</span><br/>
            <div id="dimePieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>25¢</span><br/>
            <div id="quarterPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>50¢</span><br/>
            <div id="halfDollarPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>100¢</span><br/>
            <div id="oneDollarCoinPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>$1</span><br/>
            <div id="oneDollarPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>$5</span><br/>
            <div id="fiveDollarPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>$20</span><br/>
            <div id="twentyDollarPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>Multi</span><br/>
            <div id="multiPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>Reject</span><br/>
            <div id="rejectPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          <div class="col-xs-5 col-sm-2 placeholder">
            <span>Forced</span><br/>
            <div id="forcedPieChart" class="chart " data-percent="100"><div class="percent"></div></div>
          </div>
          -->
        </div>
        
        

        <!--<button {{action "updateMeters"}}>Test Me<button>-->


        <!--
        <div class="table-responsive hidden" id="terminalTable">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Site</th>
                <th>Computer Name</th>
                <th>Is Registered</th>
                <th>Date Added</th>
                <th>Is Disabled</th>
                <th>Date Disabled</th>
                <th>Mode</th>
                <th>Auto Business Date</th>
                <th>Is Running</th>
              </tr>
            </thead>
            <tbody id="terminalTableBody">
            </tbody>
          </table>
        </div>
        -->

    </div>
    
  </script>

  <script type="text/x-handlebars" id="dashboard">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Dashboard</h1>

          <div class="row placeholders">
            <div class="col-xs-6 col-sm-3 placeholder">
              <img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
            <div class="col-xs-6 col-sm-3 placeholder">
              <img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4>Label</h4>
              <span class="text-muted">Something else</span>
            </div>
          </div>

          <h2 class="sub-header">Section title</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1,001</td>
                  <td>Lorem</td>
                  <td>ipsum</td>
                  <td>dolor</td>
                  <td>sit</td>
                </tr>
                <tr>
                  <td>1,002</td>
                  <td>amet</td>
                  <td>consectetur</td>
                  <td>adipiscing</td>
                  <td>elit</td>
                </tr>
                <tr>
                  <td>1,003</td>
                  <td>Integer</td>
                  <td>nec</td>
                  <td>odio</td>
                  <td>Praesent</td>
                </tr>
                <tr>
                  <td>1,003</td>
                  <td>libero</td>
                  <td>Sed</td>
                  <td>cursus</td>
                  <td>ante</td>
                </tr>
                <tr>
                  <td>1,004</td>
                  <td>dapibus</td>
                  <td>diam</td>
                  <td>Sed</td>
                  <td>nisi</td>
                </tr>
                <tr>
                  <td>1,005</td>
                  <td>Nulla</td>
                  <td>quis</td>
                  <td>sem</td>
                  <td>at</td>
                </tr>
                <tr>
                  <td>1,006</td>
                  <td>nibh</td>
                  <td>elementum</td>
                  <td>imperdiet</td>
                  <td>Duis</td>
                </tr>
                <tr>
                  <td>1,007</td>
                  <td>sagittis</td>
                  <td>ipsum</td>
                  <td>Praesent</td>
                  <td>mauris</td>
                </tr>
                <tr>
                  <td>1,008</td>
                  <td>Fusce</td>
                  <td>nec</td>
                  <td>tellus</td>
                  <td>sed</td>
                </tr>
                <tr>
                  <td>1,009</td>
                  <td>augue</td>
                  <td>semper</td>
                  <td>porta</td>
                  <td>Mauris</td>
                </tr>
                <tr>
                  <td>1,010</td>
                  <td>massa</td>
                  <td>Vestibulum</td>
                  <td>lacinia</td>
                  <td>arcu</td>
                </tr>
                <tr>
                  <td>1,011</td>
                  <td>eget</td>
                  <td>nulla</td>
                  <td>Class</td>
                  <td>aptent</td>
                </tr>
                <tr>
                  <td>1,012</td>
                  <td>taciti</td>
                  <td>sociosqu</td>
                  <td>ad</td>
                  <td>litora</td>
                </tr>
                <tr>
                  <td>1,013</td>
                  <td>torquent</td>
                  <td>per</td>
                  <td>conubia</td>
                  <td>nostra</td>
                </tr>
                <tr>
                  <td>1,014</td>
                  <td>per</td>
                  <td>inceptos</td>
                  <td>himenaeos</td>
                  <td>Curabitur</td>
                </tr>
                <tr>
                  <td>1,015</td>
                  <td>sodales</td>
                  <td>ligula</td>
                  <td>in</td>
                  <td>libero</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  </script>


  <script type="text/x-handlebars" id="userimport">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">User Import</h1>

          <div class="row">
           
            <form action="https://backoffice.mimo-llc.com/assets/files/user_import_template.csv">
              <button type="submit" class="btn btn-info">
                Download Template File
              </button>
            </form>
            <br/>

            <form enctype="multipart/form-data" class="form" id="form"> 
              <!--
              <div class="form-group">
                <input id="databaseHost" class="form-control" type="text" placeholder="Database Host" style="width: 30%"/>
              </div>

              <div class="form-group">
                <input id="databaseUser" class="form-control" type="text" placeholder="Database User" style="width: 30%"/>
              </div>

              <div class="form-group">
                <input id="databasePassword" class="form-control" type="password" placeholder="Database Password" style="width: 30%"/>
              </div>

              <button id="verifyButton" type="button" class="btn btn-success" {{action "verifyDatabaseConnection"}}>Verify</button><br/></br>
              -->

              <div class="form-group">
                <label for="inputFile" class="control-label">Select File</label>
                  <input type="file" class="" id="inputFile" {{action "readFile" on="change"}}>
                <p class="help-block">Please select a valid csv file for import.</p>
              </div>
              <!--<button type="button" class="btn btn-info" {{action "readFile"}}>Load</button>-->
              <!--<button type="button" class="btn btn-success" id="validateButton" {{action "validateRecords"}} disabled>Validate</button>-->
            </form>
          
          </div>

          <h2 class="sub-header">Users <button type="button" class="btn btn-success" id="validateButton" {{action "validateRecords"}} disabled>Validate</button></h2>
          <div class="table-responsive hidden" id="userTableContainer">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>ID</th>
                  <th>Secondary ID</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Cashier/Manager</th>
                  <th>Dispense Limit</th>
                  <th>Allow Transaction Reconciliation</th>
                  <th>Mgr. Only Dispense / Deposit</th>
                  <th>Prompt for Business Date</th>
                  <th>Machine Operator</th>
                  <th>Registers Selected</th>
                </tr>
              </thead>
              <tbody id="userTableBody">
              </tbody>
            </table>
          </div>


          <div class="text-center hidden" id="confirmationPrompt">
              <h2 class="sub-header">Confirm</h2>
              <button type="button" class="btn btn-danger btn-lg" {{action "clearInput"}}>Cancel</button>
              <button type="button" class="btn btn-success btn-lg" {{action "performImport"}}>Import</button>
          </div>

          <br/>
   
          <div class="alert alert-success alert-dismissible hidden" role="alert" id="completionPrompt">
            <button type="button" class="close"  aria-label="Close" {{action "hideCompletionPrompt"}}><span aria-hidden="true">&times;</span></button>
            
            <span id="completionPromptMessage"><strong>Success!</strong> Import complete..</span>
          </div>

          <div class="alert alert-danger alert-dismissible hidden" role="alert" id="badInputFilePrompt">
            <button type="button" class="close"  aria-label="Close" {{action "hideBadInputFilePromptPrompt"}}><span aria-hidden="true">&times;</span></button>
            
            <strong>Fail!</strong> Bad input file.
          </div>
   
          <div id="loadSpinner" class="hidden"></div>
    </div>
  </script>


  <script type="text/x-handlebars" id="dispenseconfig">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Dispense Import</h1>

          <div class="row">

            <form action="https://backoffice.mimo-llc.com/assets/files/dispense_import_template.csv">
              <button type="submit" class="btn btn-info">
                Download Template File
              </button>
            </form>
            <br/>

            <form enctype="multipart/form-data" class="form" id="form"> 
              <!--
              <div class="form-group">
                <input id="databaseHost" class="form-control" type="text" placeholder="Database Host" style="width: 30%"/>
              </div>

              <div class="form-group">
                <input id="databaseUser" class="form-control" type="text" placeholder="Database User" style="width: 30%"/>
              </div>

              <div class="form-group">
                <input id="databasePassword" class="form-control" type="password" placeholder="Database Password" style="width: 30%"/>
              </div>


              <button id="verifyButton" type="button" class="btn btn-success" {{action "verifyDatabaseConnection"}}>Verify</button><br/></br>
               -->

              <div class="form-group">
                <label for="inputFile" class="control-label">Select File</label>
                  <input type="file" class="" id="inputFile" {{action "readFile" on="change"}} >
                <p class="help-block">Please select a valid csv file for import.</p>
              </div>
              <!--<button type="button" class="btn btn-info" {{action "readFile"}}>Load</button>-->
              <!--<button type="button" class="btn btn-success" id="validateButton" {{action "validateRecords"}} disabled>Validate</button>-->
            </form>
          
          </div>

          <h2 class="sub-header">Dispenses <button type="button" class="btn btn-success" id="validateButton" {{action "validateRecords"}} disabled>Validate</button></h2>
          <div class="table-responsive hidden" id="dispenseTableContainer">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Register</th>
                  <th>Dispense Name</th>
                  <!--<th>Dispense Level</th>-->
                </tr>
              </thead>
              <tbody id="dispenseTableBody">
                <!--
                <tr>
                  <td class="success">SUCCESS</td>
                  <td>Concessions</td>
                  <td>Start Till Concession-N</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td class="success">SUCCESS</td>
                  <td>Concessions</td>
                  <td>Make Change</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td class="danger">FAIL - BAD REGISTER</td>
                  <td>wut</td>
                  <td>Test Dispense</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td class="success">SUCCESS</td>
                  <td>Box Office</td>
                  <td>Start Till Box Office-N</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td class="success">SUCCESS</td>
                  <td>Box Office</td>
                  <td>Make Change</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td class="success">SUCCESS</td>
                  <td>Guest Services</td>
                  <td>Start Till GS-N</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td class="success">SUCCESS</td>
                  <td>Guest Services</td>
                  <td>Make Change</td>
                  <td>User</td>
                </tr>
                <tr>
                  <td class="success">SUCCESS</td>
                  <td>Guest Services</td>
                  <td>Loan</td>
                  <td>User</td>
                </tr>-->
              </tbody>
            </table>
          </div>


          <div class="text-center hidden" id="confirmationPrompt">
              <h2 class="sub-header">Confirm</h2>
              <button type="button" class="btn btn-danger btn-lg" {{action "clearInput"}}>Cancel</button>
              <button type="button" class="btn btn-success btn-lg" {{action "performImport"}}>Import</button>
          </div>

          <br/>
   
          <div class="alert alert-success alert-dismissible hidden" role="alert" id="completionPrompt">
            <button type="button" class="close"  aria-label="Close" {{action "hideCompletionPrompt"}}><span aria-hidden="true">&times;</span></button>
            
            <span id="completionPromptMessage"><strong>Success!</strong> Import complete..</span>
          </div>

          <div class="alert alert-danger alert-dismissible hidden" role="alert" id="badInputFilePrompt">
            <button type="button" class="close"  aria-label="Close" {{action "hideBadInputFilePromptPrompt"}}><span aria-hidden="true">&times;</span></button>
            
            <strong>Fail!</strong> Bad input file.
          </div>
          <div id="loadSpinner" class="hidden"></div>
          
    </div>
  </script>


  <script type="text/x-handlebars" id="usertable">
    <h2 class="sub-header">Users</h2>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Action</th>
              <th>User ID</th>
              <th>Secondary ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Dispense Limit</th>
              <th>Allow Transaction Reconciliation</th>
              <th>Mgr. Only Dispense / Deposit</th>
              <th>Prompt for Business Date</th>
              <th>Machine Operator</th>
              <th>Registers Selected</th>
            </tr>
          </thead>
          <tbody id="userTableBody">
            <tr>
              <td>1,001</td>
              <td>1,001</td>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>dolor</td>
              <td>sit</td>
              <td>1,001</td>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>dolor</td>
              <td>sit</td>
            </tr>
            
          </tbody>
        </table>
      </div>
  </script>


  <script type="text/x-handlebars" id="menunavbar">
    <ul id="navMenuItemGroup" class="nav nav-sidebar">
      <li id="terminalNavMenuItem" class="active">{{#link-to "terminal"}}Terminals <span class="sr-only">(current)</span>{{/link-to}}</li>
      <li id="userImportNavMenuItem" class="hidden">{{#link-to "userimport"}}User Import {{/link-to}}</li>
      <li id="dispenseConfigNavMenuItem" class="hidden">{{#link-to "dispenseconfig"}}Dispense Import{{/link-to}}</li>
      <li id="reportNavMenuItem">{{#link-to "report"}}Reports{{/link-to}}</li>
      <li id="alertNavMenuItem" class="hidden">{{#link-to "alert"}}Alerts{{/link-to}}</li>
      <li id="dashboardNavMenuItem" class="hidden">{{#link-to "dashboard"}}Dashboard{{/link-to}}</li>
      <li id="memberNavMenuItem" class="hidden">{{#link-to "member"}}Members{{/link-to}}</li>
    </ul>
  </script>

  <script type="text/x-handlebars" id="subnavbar">
    <ul class="nav nav-sidebar">
      <li class="hidden">{{#link-to "userimport"}}Import{{/link-to}}</li>
    </ul>
  </script>

  <script type="text/x-handlebars" id="pageheader">
    <h1 class="page-header">Dashboard</h1>
  </script>

  <script type="text/x-handlebars" id="help">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Help</h1>
          <div class="row">
              <div class="col-sm-8">
                <div class="blog-post">
                  <h2 class="blog-post-title">Dispense Import Guide</h2>
                  <p class="blog-post-meta">March 25, 2015 by <a href="mailto:marcmartinez@socalsafe.com">Marc Martinez</a></p>

                  <pre><code>Step 1: Enter database host, username, and password.</code></pre>
                  <img src="https://backoffice.mimo-llc.com/assets/images/db_input_example.png" alt="Database input example" class="img-responsive">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <pre><code>Step 2: Click the Browse button and locate your csv input file. Please click <a href="https://backoffice.mimo-llc.com/assets/files/dispense_import_template.csv">here</a> to download a starter template CSV file.</code></pre>
                  <img src="https://backoffice.mimo-llc.com/assets/images/nonpeak_validation.png" alt="Database input example" class="img-responsive">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <pre><code>Step 3: Correct any invalid data and click the Validate button. If all records are valid, press the Import button to begin the import process.</code></pre>
                  <img src="https://backoffice.mimo-llc.com/assets/images/nonpeak_confirmation.png" alt="Database input example" class="img-responsive">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <pre><code>Step 4: Import complete!</code></pre>
                  <img src="https://backoffice.mimo-llc.com/assets/images/nonpeak_import_complete.png" alt="Database input example" class="img-responsive">

                </div><!-- /.blog-post -->
                <div class="blog-post">
                  <h2 class="blog-post-title">User Import Guide</h2>
                  <p class="blog-post-meta">March 25, 2015 by <a href="mailto:marcmartinez@socalsafe.com">Marc Martinez</a></p>

                 
                  <pre><code>Coming soon...</code></pre>
                   <!--
                  <img src="https://backoffice.mimo-llc.com/assets/images/db_input_example.png" alt="Database input example" class="img-responsive">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <pre><code>Step 2: Click the Browse button and locate your csv input file. Please click <a href="#">here</a> to download a start template CSV file.</code></pre>
                  <img src="https://backoffice.mimo-llc.com/assets/images/nonpeak_validation.png" alt="Database input example" class="img-responsive">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <pre><code>Step 3: Correct any invalid data and click the Validate button. If all records are valid, press the Import button to begin the import process.</code></pre>
                  <img src="https://backoffice.mimo-llc.com/assets/images/nonpeak_confirmation.png" alt="Database input example" class="img-responsive">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <pre><code>Step 4: Import complete!</code></pre>
                  <img src="https://backoffice.mimo-llc.com/assets/images/nonpeak_import_complete.png" alt="Database input example" class="img-responsive">
                  -->
                </div><!-- /.blog-post -->
              </div>
          </div>
    </div>
  </script>

  <script type="text/x-handlebars" id="setting">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Settings</h1>
          <div class="row">
              <form>
              <!--
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <h3 class="text-info">Alerts</h3>
                <div class="checkbox">
                  <label>
                    <input type="checkbox"> Enable Email Alerts
                  </label>
                </div>
                 <div class="form-group">
                  <label for="emailAlertFrequencyDelay">Email Alert Delay</label>
                  <input type="number" min=0 class="form-control" id="emailAlertFrequencyDelay" placeholder="Email alert delay in seconds">
                </div>
                <div class="form-group">
                  <label for="errorAlertDelay">Error Alert Delay</label>
                  <input type="number" min=0 class="form-control" id="errorAlertDelay" placeholder="Error alert delay in seconds">
                </div>
              
                <h3 class="text-info">Limits</h3>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="1¢" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="5¢" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="10¢" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="25¢" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="50¢" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="100¢" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="$1" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="$5" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="$20" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Multi" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
                <div class="form-inline">
                  <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Reject" disabled>
                  <input type="number" min=0 class="form-control" placeholder="Minimum">
                  <input type="number" min=0 class="form-control" placeholder="Maximum">
                </div>
              -->
                <h3 class="text-info">Logs</h3>

                <div class="form-group reportOption">
                  <label for="terminalId">Terminal</label>
                  <select class="form-control" id="terminalId" {{action "loadSettings" on="change"}}>
                      <option disabled>Loading...</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="mtcLogFilePath">MTC</label>
                  <input type="text" class="form-control" id="mtcLogFilePath" placeholder="MTC Log File Path">
                </div>

                <br/>
                <button type="submit" class="btn btn-primary" {{action "updateSettings"}}>Save</button>
              </form>
          </div>
    </div>
  </script>


  <script type="text/x-handlebars" id="report">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Reports</h1>

          <div id="reportPanel" class="panel panel-default">
            <div class="panel-heading text-center">
              <h2 class="panel-title text-info" style="color:#31708F;">Options</h2>
            </div>
            <div class="panel-body text-center">
              <form class="form-inline">
                <!--
                <div class="form-group">
                  <label for="reportName">Type</label>
                  <select class="form-control" id="reportName" {{action "selectReport" on="change"}}>
                    <option> -- Select Report -- </option>
                    <option value=17>Daily Totals</option>
                    <option value=20>Forced Notes</option>
                    <option value=1>Grand Totals Now</option>
                    <option value=16>Grand Totals By Date</option>
                    <option value=19>MIMO Balance</option>
                    <option value=13>Misc Media Detail</option>
                    <option value=14>Misc Media Summary</option>
                    <option value=18>Note Count</option>
                    <option value=9>Open Till</option>
                    <option value=21>Recycler Transactions</option>
                    <option value=4>Register Detail</option>
                    <option value=12>Register Profile</option>
                    <option value=5>Register Summary</option>
                    <option value=6>Terminal Detail</option>
                    <option value=7>Terminal Summary</option>
                    <option value=11>Till Profile</option>
                    <option value=2>User Detail</option>
                    <option value=10>User Profile</option>
                    <option value=3>User Summary</option>
                    <option value=8>User Transaction Log</option>

                  </select>
                </div>
                -->

                <div class="form-group">
                  <label for="reportName">Type</label>
                  <select class="form-control" id="reportName" {{action "selectReport" on="change"}}>
                    <option> -- Select Report -- </option>
                      {{#each report in reports}}
                        <option {{bind-attr value=report.id}}>{{report.name}}</option>
                      {{/each}}

                  </select>
                </div>
            

                <!--
                <div class="form-group reportOption">
                  <label class="sr-only" for="recyclerId">Recycler ID</label>
                  <input type="text" class="form-control" id="recyclerId" placeholder="Recycler ID">
                </div>
                -->

                <div class="form-group reportOption">
                  <label for="recyclerId">Recycler</label>
                  <select class="form-control" id="recyclerId">
                  </select>
                </div>

                <!--
                <div class="form-group reportOption">
                  <label class="sr-only" for="terminalId">Terminal ID</label>
                  <input type="text" class="form-control" id="terminalId" placeholder="Terminal ID">
                </div>
                -->

                <div class="form-group reportOption">
                  <label  for="terminalId">Terminal</label>
                  <select class="form-control" id="terminalId">
                      <option disabled>Loading...</option>
                  </select>
                </div>

                <div class="form-group reportOption">
                  <label  for="multiTerminalId">Terminal</label>
                  <select class="form-control" id="multiTerminalId" multiple>
                      <option disabled>Loading...</option>
                  </select>
                  <p class="help-block">(Hold CTRL or Command Key)</p>
                </div>
                
                <div class="form-group reportOption">
                  <label  for="userId">User</label>
                  <select class="form-control" id="userId">
                    <option disabled>Loading...</option>
                  </select>
                </div>

                <div class="form-group reportOption">
                  <label  for="registerId">Register</label>
                  <select class="form-control" id="registerId">
                    <option disabled>Loading...</option>
                  </select>
                </div>
                
                <!--
                <div class="form-group reportOption">
                  <label class="sr-only" for="userId">User ID</label>
                  <input type="text" class="form-control" id="userId" placeholder="User ID">
                </div>
                -->
               
               <!--
                <div class="form-group reportOption">
                  <label class="sr-only" for="registerId">Register ID</label>
                  <input type="text" class="form-control" id="registerId" placeholder="Register ID">
                </div>

                -->

                <div class="form-group reportOption">
                  <label  for="functionId">Function</label>
                  <select class="form-control" id="functionId">
                    <option disabled>Loading...</option>
                  </select>
                </div>

                <div class="form-group reportOption">
                  <label  for="transactionName">Transaction</label>
                  <select class="form-control" id="transactionName">
                    <option disabled>Loading...</option>
                  </select>
                </div>

                <!--
                <div class="form-group reportOption">
                  <label class="sr-only" for="functionId">Function ID</label>
                  <input type="text" class="form-control" id="functionId" placeholder="Function ID">
                </div>
                -->



                <div class="form-group reportOption">
                  <label  for="userOrMachine">User/Recycler</label>
                  <select class="form-control" id="userOrMachine">
                    <option value=-1>ALL</option>
                    <option value=2>User</option>
                    <option value=1>Recycler</option>
                  </select>
                </div>
                <div class="form-group reportOption">
                  <label  for="userLevel">Level</label>
                  <select class="form-control" id="userLevel">
                    <option value=-1>ALL</option>
                    <option value=1>Cashier</option>
                    <option value=2>Manager</option>
                  </select>
                </div>
                <div class="form-group reportOption">
                  <label class="sr-only" for="startBusinessDate">Start Business Date</label>
                  <input type="text" class="form-control datepicker no-extras" id="startBusinessDate" placeholder="Start Business Date">
                </div>
                 <div class="form-group reportOption">
                  <label class="sr-only" for="endBusinessDate">Start Business Date</label>
                  <input type="text" class="form-control datepicker no-extras" id="endBusinessDate" placeholder="End Business Date">
                </div>
                <!--
                <div class="form-group reportOption">
                  <label class="sr-only" for="exampleInputPassword3">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password">
                </div>
                -->
               
                <div class="checkbox reportOption">
                  <input id="allDates" type="checkbox">
                  <label for="allDates">
                     Open For All Dates
                  </label>
                  
                </div>
             
                <button class="btn btn-success" {{action "runReport"}}>Run</button>

                <div class="form-group">
                  <div class="dropdown">
                    <button class="btn btn-info dropdown-toggle" type="button" id="reportName" data-toggle="dropdown" aria-expanded="true">
                      Export
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                      <li><a style="cursor: pointer;" {{action "exportReportCSV"}}>CSV</a></li>
                      <!--<li><a style="cursor: pointer;" {{action "exportReportPDF"}}>PDF</a></li>-->
                      <li class="divider"></li>
                      <li><a href="javascript:;">Cancel</a></li>
                    </ul>
                  </div>
                </div>

              </form>
              
            </div>
            <div class="panel-footer text-center" style="height: 40px;">
              
            </div>
          </div>

          

          <div class="row">
            
            <div class="table-responsive">
              <table id="reportTable" class="table">
                  <thead id="reportTableHeader">
                  </thead>
                  <tbody id="reportTableBody">
                  </tbody>
              </table>
            </div>
          </div>
    </div>
  </script>

    <script type="text/x-handlebars" id="alert">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Alerts</h1>
          <div class="row">
              <form class="form-inline">
                <!--<h3 class="text-info">Errors</h3>-->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title" style="color: #31708F;">Errors</h3>
                  </div>
                  <div class="panel-body">
                    <div class="checkbox">
                      <label>
                        <input id="enableErrorAlertsCheckbox" type="checkbox"> Enable Error Alerts
                      </label>
                    </div>
                    <div class="form-group" style="padding-left: 1em; font-weight: 700;">
                      <label for="errorAlertDelay">Delay</label>
                      
                      <input type="text" class="form-control text-center" id="errorAlertDelay" placeholder="0">
                      minute(s)
                    </div>
                  </div>
                </div>
                
                <!--<h3 class="text-info">Open Tills</h3>-->

                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title" style="color: #31708F;">Open Tills</h3>
                  </div>
                  <div class="panel-body">
                    <div class="checkbox">
                      <label>
                        <input id="enableOpenTillAlertsCheckbox" type="checkbox"> Enable Open Till Alerts
                      </label>
                    </div>
                    <div class="form-group" style="padding-left: 1em; font-weight: 700;">
                      <label for="openTillAlertDelay">Delay</label>
                      <input type="text" class="form-control text-center" id="openTillAlertDelay" placeholder="0">
                      minute(s)
                    </div>
                  </div>
                </div>

                
                <!--<h3 class="text-info">Limits</h3>-->

                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title" style="color: #31708F;">Limits</h3>
                  </div>
                  <div class="panel-body">
                    <div class="checkbox">
                      <label>
                        <input id="enableEmailAlertsCheckbox" type="checkbox"> Enable Limit Alerts
                      </label>
                    </div>
                     <div class="form-group" style="padding-left: 1em; font-weight: 700;">
                      <label for="emailAlertDelay">Every</label>
                      <input type="text" class="form-control text-center" id="emailAlertDelay" placeholder="0">
                      minute(s)
                    </div>
                    <h5 class="text-danger">Note</h5>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Cassette D" disabled>
                      <input id="cassette_d_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="cassette_d_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Cassette C" disabled>
                      <input id="cassette_c_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="cassette_c_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Cassette B" disabled>
                      <input id="cassette_b_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="cassette_b_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Cassette A" disabled>
                      <input id="cassette_a_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="cassette_a_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Cassette F" disabled>
                      <input id="cassette_f_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="cassette_f_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Cassette H" disabled>
                      <input id="cassette_h_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="cassette_h_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <h5 class="text-danger">Coin</h5>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Hopper G" disabled>
                      <input id="hopper_g_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="hopper_g_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Hopper E" disabled>
                      <input id="hopper_e_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="hopper_e_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Hopper D" disabled>
                      <input id="hopper_d_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="hopper_d_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Hopper C" disabled>
                      <input id="hopper_c_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="hopper_c_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Hopper B" disabled>
                      <input id="hopper_b_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="hopper_b_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                    <div class="form-inline">
                      <input type="text" class="form-control text-center" style="cursor: default;" placeholder="Hopper A" disabled>
                      <input id="hopper_a_min" type="text" class="form-control" placeholder="Minimum">
                      <input id="hopper_a_max" type="text" class="form-control" placeholder="Maximum">
                    </div>
                  </div>
                </div>
                
                <br/>
                <button type="submit" class="btn btn-primary" {{action "updateOptions"}}>Save</button>
              </form>
          </div>
    </div>
  </script>

  <script type="text/x-handlebars" id="member">
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Members<button type="button" style="margin-left: 10px" class="btn btn-success" {{action "goToAddMember"}}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>Add</button></h1>

          <div class="row">
            
            <div class="table-responsive">
              <table id="memberTable" class="table">
                  <thead id="memberTableHeader">
                  </thead>
                  <tbody id="memberTableBody">
                  </tbody>
              </table>
            </div>
          </div>

    </div>
    </script>

  <script type="text/x-handlebars" id="memberedit">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Member</h1>
          <div class="row">
          <form class="form">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title" style="color: #31708F;">Details</h3>
                  </div>
                  <div class="panel-body">

                    <div class="form-group" >
                      <label for="firstName">First Name:</label>
                      {{input type="text" class="form-control" id="firstName" placeholder="First Name" valueBinding="model.firstName"}}
                    </div>

                    <div class="form-group" >
                      <label for="lastName">Last Name:</label>
                      {{input type="text" class="form-control" id="lastName" placeholder="Last Name" valueBinding="model.lastName"}}
                    </div>

                    <div class="form-group" >
                      <label for="emailAddress">Email Address:</label>
                      {{input type="text" class="form-control" id="emailAddress" placeholder="Email Address" valueBinding="model.emailAddress"}}
                    </div>

                    <div class="checkbox">
                      <label>
                        <input id="isAdmin" type="checkbox"> Administrator (Requires Logout)
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input id="alertsEnabled" type="checkbox"> Enable Alerts (Requires Logout)
                      </label>
                    </div>

                  </div>
                  <div class="panel-footer text-right">
                    <button type="submit" class="btn btn-primary" {{action "updateMemberDetails"}}>Update</button>
                  </div>
                </div>

                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title" style="color: #31708F;">Reports</h3>
                  </div>
                  <div class="panel-body">
                    <button type="submit" class="btn btn-success" {{action "selectAllReports"}}>Select All</button>
                    {{#each availableReport in availableReports}}
                      <div class="checkbox">
                        <label>
                          <input {{bind-attr id=availableReport.elementId}} class="report-selection-item" type="checkbox"> {{availableReport.name}}
                        </label>
                      </div>
                    {{/each}}
                  </div>
                  <div class="panel-footer text-right">
                    <button type="submit" class="btn btn-primary" {{action "updateMemberReports"}}>Update</button>
                  </div>
                </div>
                
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title" style="color: #31708F;">Change Password</h3>
                  </div>
                  <div class="panel-body">

                    <div class="form-group" >
                      <label for="password">New Password:</label>
                      <input type="password" class="form-control" id="password" placeholder="New Password:" />
                    </div>

                    <div class="form-group" >
                      <label for="confirmPassword">Confirm Password:</label>
                      <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" />
                    </div>
                  </div>
                  <div class="panel-footer text-right">
                    <button type="submit" class="btn btn-primary" {{action "updateMemberPassword"}}>Update</button>
                  </div>
                </div>
              
          
          </form>
        </div>
    </div>
  </script>

  <script type="text/x-handlebars" id="memberadd">
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Member</h1>
          <div class="row">
          <form class="form">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title" style="color: #31708F;">Details</h3>
                  </div>
                  <div class="panel-body">

                    <div class="form-group" >
                      <label for="firstName">First Name:</label>
                      <input type="text" class="form-control" id="firstName" placeholder="First Name" />
                    </div>

                    <div class="form-group" >
                      <label for="lastName">Last Name:</label>
                      <input type="text" class="form-control" id="lastName" placeholder="Last Name"/>
                    </div>

                    <div class="form-group" >
                      <label for="emailAddress">Email Address:</label>
                      <input type="text" class="form-control" id="emailAddress" placeholder="Email Address" />
                    </div>


                    <div class="form-group" >
                      <label for="password">Password:</label>
                      <input type="password" id="password" class="form-control" placeholder="Password" required>
                    </div>

                    <div class="form-group" >
                      <label for="confirmPassword">Confirm Password:</label>
                      <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" required>
                    </div>


                  </div>
                </div>
                
                <br/>
                <button type="submit" class="btn btn-primary" {{action "addMember"}}>Create</button>
              
          
          </form>
        </div>
    </div>
  </script>

  
  <script src="js/libs/jquery-1.10.2.js"></script>
  <script src="js/libs/handlebars-v2.0.0.js"></script>
  <script src="js/libs/ember-1.9.1.js"></script>
  <script src="js/app.js"></script>
  <!-- to activate the test runner, add the "?test" query string parameter -->
  <script src="tests/runner.js"></script>
  <script src="js/libs/bootstrap.min.js"></script>  
  <script src="js/libs/PapaParse/papaparse.min.js" type="text/javascript"></script>
  <script src="js/libs/holder.js"></script>
  <script src="js/libs/spin.js"></script>
  <script src="js/libs/easypiechart/jquery.easypiechart.js"></script>
  <script type="text/javascript" src="js/libs/slick.min.js"></script>
  <script src="js/libs/pickadate/lib/picker.js"></script>
  <script src="js/libs/pickadate/lib/picker.date.js"></script>
  <script src="js/libs/pickadate/lib/picker.time.js"></script>
  <script src="js/libs/chart/d3.min.js"></script>
  <script type="text/javascript" src="js/libs/jspdf/jspdf.js"></script>
  <script type="text/javascript" src="js/libs/jspdf/jspdf.plugin.standard_fonts_metrics.js"></script> 
  <script type="text/javascript" src="js/libs/jspdf/jspdf.plugin.split_text_to_size.js"></script>               
  <script type="text/javascript" src="js/libs/jspdf/jspdf.plugin.from_html.js"></script>
  <script type="text/javascript" src="js/libs/jspdf/libs/FileSaver.js/FileSaver.js"></script>
  
</body>
</html>
