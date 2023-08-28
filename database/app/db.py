import asyncio
import logging
from typing import Sequence

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.asyncio.engine import AsyncEngine
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import selectinload

import database.app.config_loader as config_loader
from database.app.models import Employee, TimeTracking
from database.app.singleton import MetaSingleton

logger = logging.getLogger(__name__)
config = config_loader.Config()


class DB(metaclass=MetaSingleton):
    """ Создание БД + сервисные функции """

    def __init__(self):
        self.db_engine = self.__create_engine()

    def __create_engine(self) -> AsyncEngine:
        engine = create_async_engine(
            config.get(config_loader.DB_URI),
            echo=True,
        )
        return engine

    # функция для добавления новых сессий в маршруты
    async def get_async_session(self) -> AsyncSession:
        async with AsyncSession(bind=self.db_engine) as session:
            yield session

    # сервисная функция для получения записей time_tracking
    async def get_async_time_tracking(self, session: AsyncSession) -> Sequence[TimeTracking]:
        result = await session.execute(select(TimeTracking))
        return result.scalars().all()

    # сервисная функция для получения записей таблицы employee
    async def get_async_employee(self, session: AsyncSession) -> Sequence[Employee]:
        result = await session.execute(select(Employee))
        return result.scalars().all()

    # сервисная функция для получения массив time_tracking, сортированный по empolyee_id
    async def get_async_time_tracking_by_employee(self, session: AsyncSession) -> Sequence[TimeTracking]:
        stmt = select(TimeTracking).order_by(TimeTracking.employee_id)
        result = await session.execute(stmt)
        return result.scalars().all()


async def async_main():
    config = config_loader.Config()
    engine = create_async_engine(
        config.get(config_loader.DB_URI),
        echo=True,
    )

    async with engine.begin() as conn:
        await conn.run_sync(Employee.metadata.create_all)
        await conn.run_sync(TimeTracking.metadata.create_all)


if __name__ == '__main__':
    asyncio.run(async_main())
