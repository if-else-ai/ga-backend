FROM python:3.9.7

ENV CELERY_BROKER_URL redis://redis:6379/0
ENV CELERY_RESULT_BACKEND redis://redis:6379/0
ENV C_FORCE_ROOT true

WORKDIR /tasks

COPY . /tasks

RUN pip install -r requirements.txt

CMD [ "celery", "-A", "tasks", "worker", "-l", "info" ]