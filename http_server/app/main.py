from typing import Sequence

import uvicorn
import logging

from fastapi import FastAPI, Depends
from http_server.app import config_loader as config_loader
from database.app.db import DB
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from http_server.app.models import TimeTrackingBase, EmployeeBase

config = config_loader.Config()
app = FastAPI()
db_instance = DB()

logging.basicConfig(
    level=logging.getLevelName(config.get(config_loader.LOGGING_LEVEL)),
    format=config.get(config_loader.LOGGING_FORMAT)
)

logger = logging.getLogger("uvicorn.error")


@app.get("/time_tracking/all", response_model=list[TimeTrackingBase])
async def get_all_time(session: AsyncSession = Depends(db_instance.get_async_session)):
    """ Инжектируем сессию с помощью Depends(для каждого маршрута - новая сессия)
        и возвращаем данные на эндпоинт

        @:return json_array
    """

    time_tracking = await db_instance.get_async_time_tracking(session)
    return [TimeTrackingBase(
        employee_id=tableTime.employee_id,
        date=str(tableTime.date),
        clock_in=str(tableTime.clock_in),
        clock_out=str(tableTime.clock_out),
        absence_reason=tableTime.absence_reason,
        total_time=str(tableTime.total_time)
    ) for tableTime in time_tracking]


@app.get("/employee/all", response_model=list[EmployeeBase])
async def get_all_employees(session: AsyncSession = Depends(db_instance.get_async_session)):
    employees = await db_instance.get_async_employee(session)
    return [EmployeeBase(
        full_name=emp.full_name,
        department=emp.department,
        role=emp.role,
        img_path=emp.img_path
    ) for emp in employees]


if __name__ == "__main__":
    logger.info("STARTING SERVER")
    uvicorn.run(
        app,
        port=config.get(config_loader.WEB_PORT),
        host=config.get(config_loader.WEB_HOST)
    )
