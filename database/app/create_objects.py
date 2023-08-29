import asyncio

from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from database.app.db import DB
from models import Employee, TimeTracking

db_instance = DB()

# Добавление нового сотрудника (Employee)
new_employee = Employee(
    full_name="John Doe",
    department="HR",
    role="Manager",
    img_path="img/john_doe.jpg"
)

# Добавление новой записи о времени (TimeTracking)
new_time_tracking = TimeTracking(
    employee=new_employee,  # Связь с Employee
    date="2023-08-25",
    clock_in="09:00:00",
    clock_out="17:00:00",
    absence_reason="Sick",
    total_time="08:00:00"
)


async def create_objects():
    async with db_instance.get_async_session() as session:
        # Добавление объектов в сессию
        session.add(new_employee)
        session.add(new_time_tracking)
        await session.commit()


if __name__ == "__main__":
    asyncio.run(create_objects())
