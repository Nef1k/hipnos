FROM python:3.8-slim AS base

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1

FROM base AS python-deps

RUN pip install pipenv
RUN apt-get update && apt install -y gcc
RUN apt-get install -y --no-install-recommends \
        autoconf \
        automake \
        pkg-config \
        libtool

COPY Pipfile .
COPY Pipfile.lock .

RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

FROM base AS runtime

COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

RUN useradd --create-home sklad
WORKDIR /home/sklad
USER sklad

COPY . .

ENTRYPOINT ["python"]
CMD ["-m", "gunicorn", "-w", "1", "-b", "0.0.0.0:8000", "app.wsgi"]
