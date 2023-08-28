from pydantic import BaseModel


class EmployeeBase(BaseModel):
    full_name: str
    department: str
    role: str
    img_path: str


class TimeTrackingBase(BaseModel):
    employee_id: int
    date: str
    clock_in: str
    clock_out: str
    absence_reason: str
    total_time: str
