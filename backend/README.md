### To run this locally:

python -m venv .venv
source .venv/bin/activate
>> select/confirm the .venv as the python interpreter in VScode
pip install -r requirements.txt
python -m uvicorn main:app --reload