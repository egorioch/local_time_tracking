/*  Запрос на сервер и получение эскпортируемых данных
    между каждым id и временем проходит взаимосооответствие, поэтому эти данные можно грузить без обработки в charts 

*/
export function getDataFromServer() {
    // fetch("url", {
    //     body: JSON
    // })
    let dataFromDb = [
        {
            "id": "0",
            "employee_id": "0",
            "date": "2023-05-14",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "07:48:16"
        }, 
        {
            "id": "1",
            "employee_id": "1",
            "date": "2023-05-14",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "02:29:44",
            "absence_reason": "",
            "total_time": "06:48:16"
        }, 
        {
            "id": "2",
            "employee_id": "2",
            "date": "2023-05-14",
            "clock_in": "06:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "09:48:16"
        }, 
        {
            "id": "3",
            "employee_id": "3",
            "date": "2023-05-14",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "07:48:16"
        }, 
        {
            "id": "4",
            "employee_id": "4",
            "date": "2023-05-14",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "04:48:16"
        }, 
        {
            "id": "5",
            "employee_id": "5",
            "date": "2023-05-14",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "03:48:16"
        }, 
        {
            "id": "6",
            "employee_id": "6",
            "date": "2023-05-14",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "11:48:16"
        }, 
        
        //следующее число месяца
        {
            "id": "8",
            "employee_id": "0",
            "date": "2023-05-15",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "6:48:16"
        }, 
        {
            "id": "9",
            "employee_id": "1",
            "date": "2023-05-15",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "8:48:16"
        }, 
        {
            "id": "10",
            "employee_id": "2",
            "date": "2023-05-15",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "1:48:16"
        }, 
        {
            "id": "12",
            "employee_id": "3",
            "date": "2023-05-15",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "11:48:16"
        }, 
        {
            "id": "13",
            "employee_id": "4",
            "date": "2023-05-15",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "12:54:16"
        }, 
        {
            "id": "14",
            "employee_id": "5",
            "date": "2023-05-15",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "06:55:52"
        }, 
        {
            "id": "15",
            "employee_id": "6",
            "date": "2023-05-15",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "2:43:16"
        }, 
        //следующее число
        {
            "id": "15",
            "employee_id": "0",
            "date": "2023-05-16",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "10:31:16"
        }, 
        {
            "id": "16",
            "employee_id": "1",
            "date": "2023-05-16",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "14:11:16"
        }, 
        {
            "id": "17",
            "employee_id": "2",
            "date": "2023-05-16",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "7:43:16"
        }, 
        {
            "id": "18",
            "employee_id": "3",
            "date": "2023-05-16",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "2:43:16"
        }, 
        {
            "id": "19",
            "employee_id": "4",
            "date": "2023-05-16",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "6:52:16"
        },  
        {
            "id": "20",
            "employee_id": "5",
            "date": "2023-05-16",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "4:43:16"
        }, 
        {
            "id": "21",
            "employee_id": "6",
            "date": "2023-05-16",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "9:12:31"
        }, 
        //для тестирования пагинации
        {
            "id": "22",
            "employee_id": "0",
            "date": "2023-05-17",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "8:45:11"
        }, 
        {
            "id": "23",
            "employee_id": "0",
            "date": "2023-05-18",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "5:35:11"
        }, 
        {
            "id": "24",
            "employee_id": "0",
            "date": "2023-05-19",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "10:45:11"
        }, 
        {
            "id": "25",
            "employee_id": "0",
            "date": "2023-05-20",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "4:09:15"
        }, 
        {
            "id": "26",
            "employee_id": "0",
            "date": "2023-05-21",
            "clock_in": "08:54:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "11:09:56"
        }, 
        {
            "id": "27",
            "employee_id": "0",
            "date": "2023-05-22",
            "clock_in": "08:12:32",
            "clock_out": "18:54:32",
            "absence": "01:29:44",
            "absence_reason": "",
            "total_time": "13:17:15"
        }, 
    ];

    return dataFromDb;
}



export function getTotalTimeArrayFromJson() {
    let totalTimeArray = [];
    let dirtyJsonArray = getDataFromServer();
    dirtyJsonArray.forEach((element) => {
        totalTimeArray.push(element.total_time);
    });

    console.log("totalTimeArray: " + totalTimeArray)
    return totalTimeArray;
}

export function getEmployeesIdArrayFromJson() {
    let employeesIdArray = [];
    let dirtyJsonArray = getDataFromServer();
    dirtyJsonArray.forEach((element) => {
        employeesIdArray.push(element.employee_id);
    });

    return employeesIdArray;
}

//depracated
export function shortTimeForHistogramTooltip() {
    console.log("getEmployeesIdArrayFromJson: " + getTotalTimeArrayFromJson())
    const employeesTime = getTotalTimeArrayFromJson().map(item => formatTime(item));

    return employeesTime;
}


//принимает на вход массив со временем, возвращает только часы(разделение по первому вхождению ":")
//(дополнить: при наведении на столбец - полное время, ордината - часы)
export function formatTime(full_time) {
    return full_time.substring(0, full_time.indexOf(":"));
}


export function stringToTime(value) {
    // const date = new Date(`1970-01-01 ${value}`);
    let time = value.split(':');
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    // var nowDate = date.split('T')[1];
    // return date;
}
