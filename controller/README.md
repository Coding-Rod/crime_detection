# Crime Detection

This is the official repository for the paper: __X__, which aims to monitor actively criminal behaviour in houses and residences by using Deep Learning and Video Processing.
  
## Installation guide

Please read [install.md](install.md) for details on how to set up this project.

## Project Organization

    ├── LICENSE
    ├── tasks.py           <- Invoke with commands like `notebook`.
    ├── README.md          <- The top-level README for developers using this project.
    ├── install.md         <- Detailed instructions to set up this project.
    ├── data
    │   ├── external       <- Data from third party sources.
    │   ├── interim        <- Intermediate data that has been transformed.
    │   ├── processed      <- The final, canonical data sets for modeling.
    │   └── raw            <- The original, immutable data dump.
    │
    ├── models             <- Trained and serialized models, model predictions, or model summaries.
    │
    ├── notebooks          <- Jupyter notebooks. Naming convention is a number (for ordering),
    │                         the creator's initials, and a short `-` delimited description, e.g.
    │                         `1.0-jqp-initial-data-exploration`.
    │
    ├── references         <- Data dictionaries, manuals, and all other explanatory materials.
    │
    ├── reports            <- Generated analysis as HTML, PDF, LaTeX, etc.
    │   └── figures         <- Generated graphics and figures to be used in reporting.
    │
    ├── environment.yml    <- The requirements file for reproducing the analysis environment.
    │
    ├── .here              <- File that will stop the search if none of the other criteria
    │                         apply when searching head of project.
    │
    ├── setup.py           <- Makes project pip installable (pip install -e .)
    │                         so crime_detection can be imported.
    │
    └── crime_detection               <- Source code for use in this project.
        ├── __init__.py    <- Makes crime_detection a Python module.
        │
        ├── data           <- Scripts to download or generate data.
        │   └── make_dataset.py
        │
        ├── features       <- Scripts to turn raw data into features for modeling.
        │   └── build_features.py
        │
        ├── models         <- Scripts to train models and then use trained models to make
        │   │                 predictions.
        │   ├── predict_model.py
        │   └── train_model.py
        │
        ├── utils          <- Scripts to help with common tasks.
            └── paths.py   <- Helper functions to relative file referencing across project.
        │
        └── visualization  <- Scripts to create exploratory and results oriented visualizations.
            └── visualize.py

---
Project based on the [cookiecutter conda data science project template](https://github.com/jvelezmagic/cookiecutter-conda-data-science).# crime_detection

## Source project organization

    .
    ├── environment.yml
    ├── main.py
    └── modules
        ├── api
        │   ├── __init__.py
        │   └── post.py
        ├── auth
        │   ├── __init__.py
        │   ├── logout.py
        │   ├── signin.py
        │   └── signup.py
        ├── controllers
        │   ├── __init__.py
        │   ├── packages
        │   │   ├── date_and_time.py
        │   │   ├── keyboard.py
        │   │   ├── lcd.py
        │   │   ├── light.py
        │   │   ├── pir.py
        │   │   └── __pycache__
        │   │       ├── date_and_time.cpython-310.pyc
        │   │       ├── light.cpython-310.pyc
        │   │       └── pir.cpython-310.pyc
        │   └── __pycache__
        │       └── __init__.cpython-310.pyc
        ├── detection
        │   ├── __init__.py
        │   ├── multiple
        │   │   ├── ssd
        │   │   │   └── detect.py
        │   │   ├── yolor
        │   │   │   └── detect.py
        │   │   └── yolov5
        │   │       └── detect.py
        │   └── people
        │       ├── ssd
        │       │   └── detect.py
        │       ├── yolor
        │       │   └── detect.py
        │       └── yolov5
        │           └── detect.py
        ├── hands_up
        │   ├── blazepose
        │   │   └── keypoints.py
        │   ├── __init__.py
        │   ├── mediapipe
        │   │   └── keypoints.py
        │   ├── movenet
        │   │   └── keypoints.py
        │   └── response.py
        ├── menu
        │   ├── __init__.py
        │   ├── __pycache__
        │   │   ├── __init__.cpython-310.pyc
        │   │   └── screens.cpython-310.pyc
        │   └── screens.py
        └── open_cv
            ├── __init__.py
            └── start_camera.py

---

## Pinout

|Name         |Pin|Verified|
|-------------|---|--------|
|Pi Pico In 1 |40 |        |
|Pi Pico In 2 |38 |        |
|PIR          |36 |        |
|Keyboard 1   |32 |        |
|Keyboard 2   |28 |        |
|Keyboard 3   |26 |        |
|Keyboard 4   |24 |        |
|Keyboard 5   |22 |        |
|Keyboard 6   |18 |        |
|Keyboard 7   |16 |        |
|Keyboard 8   |12 |        |
|Led RGB R    |37 |Check   |
|Led RGB G    |35 |Check   |
|Led RGB B    |33 |Check   |
|Relay        |31 |Check   |
|Buzzer       |29 |        |
|Interrupt Btn|11 |        |
|Pi Pico Out  |7  |        |