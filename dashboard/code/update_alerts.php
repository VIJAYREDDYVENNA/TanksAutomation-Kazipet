<?php
require_once '../../base-path/config-path.php';
require_once BASE_PATH_1 . 'config_db/config.php';
require_once BASE_PATH_1 . 'session/session-manager.php';

SessionManager::checkSession();
$sessionVars = SessionManager::SessionVariables();
$mobile_no = $sessionVars['mobile_no'];
$user_id = $sessionVars['user_id'];
$role = $sessionVars['role'];
$user_login_id = $sessionVars['user_login_id'];
//==================================//
$return_response = "";
$user_devices="";
$device_list = array ();
$total_switch_point=0;
//==================================//

//$group_id="ALL";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["GROUP_ID"])) {
	$group_id = $_POST['GROUP_ID'];

	include_once(BASE_PATH_1 . "common-files/selecting_group_device.php");
	$_SESSION["DEVICES_LIST"] = json_encode($device_list);

	if ($user_devices != "") {
		$user_devices = substr($user_devices, 0, -1);
	}

	$device_ids = explode(",", $user_devices);

// Count the number of device IDs
	$num_devices = count($device_ids);

// Prepare placeholders for mysqli_stmt_bind_param
$param_type = str_repeat("s", $num_devices); // Assuming all are strings

// Initialize parameters array
$params = array();
foreach ($device_ids as $device_id) {
	$params[] = $device_id;
}

// Database connection
$conn = mysqli_connect(HOST, USERNAME, PASSWORD, DB_ALL);
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
} else {
	$sql_lights = "SELECT * FROM `alerts_and_updates` WHERE device_id IN ($user_devices) ORDER BY id DESC limit 100";

	if ($result = mysqli_query($conn, $sql_lights)) {
		if (mysqli_num_rows($result) > 0) {
			while ($rl = mysqli_fetch_assoc($result)) {
				$device_id = $rl['device_id'];
				$device_id_name = $rl['device_id_name'];
				$update = $rl['update'];
				$date_time = $rl['date_time'];

				$return_response.='<a href="#" class="list-group-item list-group-item-action " aria-current="true">
				<div class="d-flex w-100 justify-content-between">
				<small class="mb-1 sub-sup-font-size fw-medium text-primary d-flex align-content-center"><i class="bi bi-cpu pe-2"></i><span id="alert_id">'.$device_id_name.'</span></small>
				</div>
				<small class="mb-1 font-small  text-info-emphasis">'.$update.'</small>
				<div class="d-flex w-100 justify-content-end ">
				<small class="mb-1  font-x-small text-primary d-flex align-content-center"><i class="bi bi-clock pe-1"></i><span id="alert_date_time">'.$date_time.'</span></small>
				</div>
				</a>';
			}
		}
		mysqli_free_result($result);
	}
	mysqli_close($conn);
}


echo json_encode($return_response);
}

?>
