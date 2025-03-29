let error_message = document.getElementById('error-message');
let error_message_text = document.getElementById('error-message-text');
let success_message = document.getElementById('success-message');
let success_message_text = document.getElementById('success-message-text');

const error_toast= bootstrap.Toast.getOrCreateInstance(error_message);
const success_toast= bootstrap.Toast.getOrCreateInstance(success_message);
initializeDateRangePicker("#date-range", 29);

let device_id = localStorage.getItem("SELECTED_ID");
if (!device_id) {
    device_id = document.getElementById('device_id').value;
}
var selected_alert  = document.getElementById('selected_phase_alert').value;
update_data_table(device_id, "LATEST", selected_alert, "","");

let device_id_list=document.getElementById('device_id');
device_id_list.addEventListener('change', function() {
    $("#pre-loader").css('display', 'block');
    device_id = document.getElementById('device_id').value;
    update_data_table(device_id, "LATEST", selected_alert, "","");
    refresh_data();
});

setTimeout(refresh_data, 50);
setInterval(refresh_data, 20000);
function refresh_data() {
    if (typeof update_frame_time === "function") {
        device_id = document.getElementById('device_id').value;
        update_frame_time(device_id);
    } 
}



function getSelectedDateRange() {
    const selectedDates = window.fp.selectedDates;
    if (selectedDates.length === 2) {
        const [startDate, endDate] = selectedDates;
        return {
            startDate: startDate,
            endDate: endDate
        };
    } else {
        return null; 
    }
}

function get_data() {
    const dateRange = getSelectedDateRange();
    selected_alert  = document.getElementById('selected_phase_alert').value;
    if (dateRange) {

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const startDateFormatted = dateRange.startDate.toLocaleDateString(undefined, options);
        const endDateFormatted = dateRange.endDate.toLocaleDateString(undefined, options);
        
        $("#pre-loader").css('display', 'block'); 
        update_data_table(device_id, "DATE-RANGE", selected_alert, startDateFormatted, endDateFormatted )

    } else {
        $("#pre-loader").css('display', 'block'); 
        update_data_table(device_id, "LATEST", selected_alert, "","");

    }
}


function update_data_table(device_id, records, selected_alert, start_date, end_date ){

    $.ajax({
        type: "POST",
        url: '../alerts/code/alert_table.php',
        traditional: true,
        data: { D_ID: device_id, RECORDS:records, ALERT:selected_alert, START_DATE:start_date, END_DATE:end_date},
        dataType: "json",
        success: function(response) {
            $("#pre-loader").css('display', 'none');

            $("#alerts_table").html("");
            $("#alerts_table").html(response);


        },
        error: function(jqXHR, textStatus, errorThrown) {
          $("#alerts_table").html("");
          $("#pre-loader").css('display', 'none');
          error_message_text.textContent="Failed to get the dataa";
          error_toast.show();
      }
  });
}
