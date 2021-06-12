FROM python:3.7

RUN pip install fastapi uvicorn

RUN apt-get update && apt-get install -y --no-install-recommends \
    unixodbc-dev \
    unixodbc \
    libpq-dev 

EXPOSE 80

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]