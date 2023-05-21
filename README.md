# AngularCRUD

## Running unit tests for Angular

Run `npm run test` to execute the unit tests via [Karma].

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Developing and Testing an API with FastAPI and Pytest

## Development server

Build the images and run the containers:

```sh
$ docker-compose up -d --build
```

## Running unit tests for python

Please install the dependencies via the requirements.txt file using

cd fastapi-crud/

pip install -r requirements.txt

python -m pytest --cov=src ./src/app/tests/
