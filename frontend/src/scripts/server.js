/**
 * отправляет "причину отсутствия работника на рабочем месте" на сервер
 * @param {object} reasonData like {"reason" : "reasonData(string)"}
 */
export async function sendEmployeeReasonToServer(reasonData) {
    console.log("reason data in script: " + JSON.stringify(reasonData));
    fetch("http://localhost:8080/employee_reason", {
        method: "POST",
        body: JSON.stringify(reasonData)
    })
        .then(resp => console.log("answer by server: " + resp))
        .catch(err => "Error with sending data to server: " + err)


}

/** 
 * Получаем данные о времени, которое каждый сотрудник провёл на рабочем месте 
 * [{employee_id: [TimeTrackings...]}, ...]
 */ 
export async function getAllTimeTrackingByEmployees() {
    
    const ansByServer = await fetch("http://localhost:8080/time_tracking_by_employee", {
        method: "GET"
    })
        .then(resp => {return resp.json()})
        

    return ansByServer;
    // console.log("time_tracking: " + JSON.stringify(ansByServer[1]))
}

/**
 *  1. Отсутствие по согласованию с руководителем;
    2. По состоянию здоровья (нетрудоспособность/по согласованию);
    3. Отсутствие по корпоративным поручениям;
    4. Отсуствие в связи с отпуском;
    5. Командировка
+ возможность комментирования
 */
export async function getAbsenceReasons() {

    let jsonReasons = {
        "1": "Отсутствие по согласованию с руководителем",
        "2": "По состоянию здоровья (нетрудоспособность/по согласованию)",
        "3": "Отсутствие по корпоративным поручениям",
        "4": "Отсуствие в связи с отпуском",
        "5": "Командировка",
    }

    let onlyReasonsArray = [];
    for (let i in jsonReasons) {
        onlyReasonsArray.push(jsonReasons[i])
    }

    return onlyReasonsArray;
}