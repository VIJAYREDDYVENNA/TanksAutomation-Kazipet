

function search_records()
{

	let device_id = document.getElementById('device_id').value;
	let searched_date = document.getElementById('search_date').value;
	searched_date=searched_date.trim();	
	if (!document.getElementById('view_all_group_device').checked) {
		if(searched_date!=null&&searched_date!="")
		{

			update_data_table(device_id, "DATE", searched_date);

		}
		else
		{
			update_data_table(device_id, "LATEST", "");
		}
	}
	else
	{
		document.getElementById('search_date').value = "";
		update_all_group_data_table();
	}
	document.getElementById('pre-loader').style.display = 'block';

}

function add_more_records() {
	if (!document.getElementById('view_all_group_device').checked) {
		var device_id = document.getElementById('device_id').value;
		var row_cont = document.getElementById('frame_data_table').getElementsByTagName('tr').length;
		var date_id = document.querySelector('#frame_data_table tr:last-child td:nth-child(1)').innerHTML;
		if((row_cont>1 ) && (date_id.indexOf("Found")==-1))
		{
			var date_time = document.querySelector('#frame_data_table tr:last-child td:nth-child(2)').innerHTML;
			if(device_id!="")
			{

				document.getElementById('pre-loader').style.display = 'block';
				$.ajax({
					type: "POST",
					url: '../data-report/code/frame_data_table.php',
					traditional: true,
					data: { D_ID: device_id, RECORDS:"ADD", DATE_TIME:date_time},
					dataType: "json",
					success: function(response) {
						$("#pre-loader").css('display', 'none');
						$("#frame_data_table").append(response[0]);

					},
					error: function(jqXHR, textStatus, errorThrown) {
						$("#pre-loader").css('display', 'none');
						error_message_text.textContent="Error getting the data";
						error_toast.show();
					}
				});
			}
		}
		else
		{
			error_message_text.textContent="Records are not found";
			error_toast.show();
		}
	}


};




function update_data_table(device_id, records, searched_date ){

	$.ajax({
		type: "POST",
		url: '../data-report/code/frame_data_table.php',
		traditional: true,
		data: { D_ID: device_id, RECORDS:records, DATE:searched_date },
		dataType: "json",
		success: function(response) {
			$("#pre-loader").css('display', 'none');
			$("#frame_data_table_header").html("");
			if(response[1]=="3PH")
			{				
				$("#frame_data_table_header").html('<tr class="header-row-1"> <th class="table-header-row-1"></th> <th class="table-header-row-1 col-size-1" >Updated at</th> <th class="table-header-row-1">ON/OFF Status</th> <th class="table-header-row-1">Load</th> <th class="table-header-row-1" colspan="3">Phase Voltages (Volts)</th> <th class="table-header-row-1" colspan="3">Phase Currents (Amps)</th> <th class="table-header-row-1" colspan="4">KW</th> <th class="table-header-row-1" colspan="4">KVA</th> <th class="table-header-row-1" colspan="2">Energy (Units)</th> <th class="table-header-row-1" colspan="3">Power Factor</th> <th class="table-header-row-1" colspan="3">Frequency (Hz)</th> <th class="table-header-row-1">Battery</th> <th class="table-header-row-1">Signal Level</th> <th class="table-header-row-1">Location</th> </tr> <tr class="header-row-2"> <th class="table-header-row-2">Device Id</th> <th class="table-header-row-2 col-size-1"></th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Status</th> <th class="table-header-row-2">R</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">R</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">R</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2">R</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2">kWh</th> <th class="table-header-row-2">kVAh</th> <th class="table-header-row-2">R</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">R</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">Voltage(mV)</th> <th class="table-header-row-2"></th> <th class="table-header-row-2"></th>  </tr>');
			}
			else if(response[1]=="1PH"){
				
				$("#frame_data_table_header").html('<tr class="header-row-1"> <th class="table-header-row-1"></th> <th class="table-header-row-1 col-size-1" >Updated at</th> <th class="table-header-row-1">ON/OFF Status</th> <th class="table-header-row-1">Load</th> <th class="table-header-row-1" colspan="1">Voltages (Volts)</th> <th class="table-header-row-1" colspan="1">Currents (Amps)</th> <th class="table-header-row-1" colspan="1">KW</th> <th class="table-header-row-1" colspan="1">KVA</th> <th class="table-header-row-1" colspan="2">Energy (Units)</th> <th class="table-header-row-1" colspan="1">Power Factor</th> <th class="table-header-row-1" colspan="1">Frequency (Hz)</th> <th class="table-header-row-1">Battery</th> <th class="table-header-row-1">Signal Level</th><th class="table-header-row-1">Location</th> </tr> <tr class="header-row-2"> <th class="table-header-row-2">Device Id</th> <th class="table-header-row-2"></th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Status</th> <th class="table-header-row-2"></th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2">kWh</th> <th class="table-header-row-2">kVAh</th> <th class="table-header-row-2"></th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Voltage(mV)</th> <th class="table-header-row-2"></th>  <th class="table-header-row-2"></th> </tr>');
			}

			$("#frame_data_table").html("");
			$("#frame_data_table").html(response[0]);

		},
		error: function(jqXHR, textStatus, errorThrown) {
			$("#pre-loader").css('display', 'none');
			error_message_text.textContent="Error getting the data";
			error_toast.show();
		}
	});
}

function update_all_group_data_table(){

	$.ajax({
		type: "POST",
		url: '../data-report/code/all-group-data.php',
		traditional: true,		
		dataType: "json",
		success: function(response) {
			$("#pre-loader").css('display', 'none');
			$("#frame_data_table_header").html("");

			if(response[1]=="1PH"){
				
				$("#frame_data_table_header").html('<tr class="header-row-1"> <th class="table-header-row-1"></th> <th class="table-header-row-1 col-size-1" >Updated at</th> <th class="table-header-row-1">ON/OFF Status</th> <th class="table-header-row-1">Load</th> <th class="table-header-row-1" colspan="1">Voltages (Volts)</th> <th class="table-header-row-1" colspan="1">Currents (Amps)</th> <th class="table-header-row-1" colspan="1">KW</th> <th class="table-header-row-1" colspan="1">KVA</th> <th class="table-header-row-1" colspan="2">Energy (Units)</th> <th class="table-header-row-1" colspan="1">Power Factor</th> <th class="table-header-row-1" colspan="1">Frequency (Hz)</th> <th class="table-header-row-1">Battery</th> <th class="table-header-row-1">Signal Level</th><th class="table-header-row-1">Location</th> </tr> <tr class="header-row-2"> <th class="table-header-row-2">Device Id</th> <th class="table-header-row-2"></th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Status</th> <th class="table-header-row-2"></th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2">kWh</th> <th class="table-header-row-2">kVAh</th> <th class="table-header-row-2"></th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Voltage(mV)</th> <th class="table-header-row-2"></th>  <th class="table-header-row-2"></th> </tr>');
			}
			else{

				$("#frame_data_table_header").html('<tr class="header-row-1"> <th class="table-header-row-1"></th> <th class="table-header-row-1 col-size-1" >Updated at</th> <th class="table-header-row-1">ON/OFF Status</th> <th class="table-header-row-1">Load</th> <th class="table-header-row-1" colspan="3">Phase Voltages (Volts)</th> <th class="table-header-row-1" colspan="3">Phase Currents (Amps)</th> <th class="table-header-row-1" colspan="4">KW</th> <th class="table-header-row-1" colspan="4">KVA</th> <th class="table-header-row-1" colspan="2">Energy (Units)</th> <th class="table-header-row-1" colspan="3">Power Factor</th> <th class="table-header-row-1" colspan="3">Frequency (Hz)</th> <th class="table-header-row-1">Battery</th><th class="table-header-row-1">Signal Level</th> <th class="table-header-row-1">Location</th> </tr> <tr class="header-row-2"> <th class="table-header-row-2">Device Id</th> <th class="table-header-row-2 col-size-1"></th> <th class="table-header-row-2 col-size-1"></th> <th class="table-header-row-2">Status</th> <th class="table-header-row-2">R/Single Phase</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">R/Single Phase</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2"></th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">Total</th> <th class="table-header-row-2">kWh</th> <th class="table-header-row-2">kVAh</th> <th class="table-header-row-2">R/Single Phase</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">R/Single Phase</th> <th class="table-header-row-2">Y</th> <th class="table-header-row-2">B</th> <th class="table-header-row-2">Voltage(mV)</th> <th class="table-header-row-2"></th>  <th class="table-header-row-2"></th> </tr>');
			}
			
			$("#frame_data_table").html("");
			$("#frame_data_table").html(response[0]);

		},
		error: function(jqXHR, textStatus, errorThrown) {
			$("#pre-loader").css('display', 'none');
			error_message_text.textContent="Error getting the data";
			error_toast.show();
		}
	});
}
