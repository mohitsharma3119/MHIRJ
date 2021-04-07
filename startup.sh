<<<<<<< HEAD
uvicorn main:app --reload
=======
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
>>>>>>> eb9a8b694ca58d37ff0ed29653f5db560296c5ba
