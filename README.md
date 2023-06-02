# HIPNOS

Система управления ролевым квестом. [Документация](docs/main.md).

## Quickstart

### Resources
1. Установить Docker и Docker Compose
2. `docker compose up -d`

### BE
1. `cd be && pipenv install && cd ..`
2. `sudo make root_set_https_dev_env`
3. `make set_https_dev_env`
4. `cp be/env/prod.example.env be/env/.env`
5. `cp be/env/prod.example.env be/env/docker.env`
6. Заполнить два `.env`-файла, созданные в предыдущем шаге
7. `source be/env/.env`
8. `cd be`
9. `./manage.py reset_all`
10. `./manage.py runserver`

### FE
1. `cd fe && npm install`
2. `npm start`
