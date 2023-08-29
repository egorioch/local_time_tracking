import json
from typing import Sequence

import uvicorn
import logging

import pandas as pd
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from http_server.app import config_loader as config_loader
from database.app.db import DB
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from http_server.app.models import TimeTrackingBase, EmployeeBase

config = config_loader.Config()
app = FastAPI()
db_instance = DB()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.getLevelName(config.get(config_loader.LOGGING_LEVEL)),
    format=config.get(config_loader.LOGGING_FORMAT)
)

logger = logging.getLogger("uvicorn.error")


@app.get("/time_tracking/all", response_model=list[TimeTrackingBase])
async def get_all_time(session: AsyncSession = Depends(db_instance.get_async_session)):
    """ Инжектируем сессию с помощью Depends(для каждого маршрута - новая сессия)
        и возвращаем данные на эндпоинт

        :return json_array
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


@app.get("/time_tracking_by_employee")
async def get_time_trackings_by_employee(session: AsyncSession = Depends(db_instance.get_async_session)):
    ordered_time_tracking = await db_instance.get_async_time_tracking_by_employee(session)

    # time_trackings_by_employee = {}
    #
    # for time_tracking in ordered_time_tracking:
    #     employee = time_tracking.employee
    #     if employee not in time_trackings_by_employee:
    #         time_trackings_by_employee[employee.id] = []
    #     time_trackings_by_employee[employee.id].append(time_tracking)

    return ordered_time_tracking


if __name__ == "__main__":
    logger.info("STARTING SERVER")
    uvicorn.run(
        app,
        port=config.get(config_loader.WEB_PORT),
        host=config.get(config_loader.WEB_HOST)
    )
