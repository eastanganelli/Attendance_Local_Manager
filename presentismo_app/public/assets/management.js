const alert_ = require('functions.js')

const getAttendance = () => {
    const subject = $('#subjectFilter').val();
    const date = $('#dateFilter').val();
    const student = $('#studentFilter').val();

    $.get(`/attendance/check?subject=${subject}&date=${date}&student=${student}`, (data) => {
        $('#attendanceTable tbody').empty();
        console.log(data);
        if (data.legth == 0)
            appendAlert('No hay datos', 'warning');

        data.forEach((record) => {
            const row = `<tr><td>${record.studentName}</td><td>${record.subject}</td><td>${record.date}</td></tr>`;
            $('#attendanceTable tbody').append(row);
        });
    });
};

$('#filterBtn').click(() => {
    getAttendance();
});

$('#exportBtn').click(() => {
    const subject = $('#subjectFilter').val();
    const date = $('#dateFilter').val();
    const student = $('#studentFilter').val();

    const tableData = [['Student Name', 'Subject', 'Date']];
    $('#attendanceTable tbody tr').each((index, row) => {
        const rowData = [];
        $(row).find('td').each((index, cell) => {
            rowData.push($(cell).text());
        });
        tableData.push(rowData);
    });

    let csvContent = '';
    tableData.forEach((row) => {
        const csvRow = row.map((cell) => `"${cell}"`).join(',');
        csvContent += `${csvRow}\n`;
    });

    const downloadLink = document.createElement('a');
    downloadLink.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    downloadLink.download = 'attendance.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});