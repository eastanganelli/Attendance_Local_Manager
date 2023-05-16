const init = () => {
    let today = new Date();
    let dd = ("0" + (today.getDate())).slice(-2);
    let mm = ("0" + (today.getMonth() + 1)).slice(-2);
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    $("#dia_").attr("value", today);

    let m_ = "";
    switch ((new Date()).getDay()) {
        case 4: {
            m_ = "DB";
            break;
        }
        case 2:
        case 3:
        case 5: {
            m_ = "LPI";
            break;
        }
    }
    $(`#materia_`).attr(`value`, m_);

}

// Function to submit attendance
const submitAttendance = () => {
    const studentName = $('#dniAlumno_').val();
    const subject = $('#materia_').val();
    const date = $('#dia_').val();

    if (!studentName) {
        appendAlert(`No se agrego DNI del alumno`, `warning`);
    } else {
        $.post('/attendance', { studentName, subject, date }, (response) => {
            if (response === 'Attendance already submitted') {
                appendAlert(`El alumno ya presento su asistencia`, `danger`);
            } else {
                appendAlert(`Agregado con exito!`, `success`);
                $('#studentName').val('');
                $('#subject').val('');
                $('#date').val('');
            }
        });
    }

};

// Event handler for submit button click
$('#submitBtn').click(() => {
    submitAttendance();
});