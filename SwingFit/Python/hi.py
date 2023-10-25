from flask import Flask
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

#서비스어카운트키 파일에 있는 json을 불러옴
cred = credentials.Certificate("C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/mykey.json")
firebase_admin.initialize_app(cred)
firebase_db = firestore.client()

app = Flask(__name__)

# localhost:8000/add 로 들어갈시 작동
@app.route("/add", methods=['GET'])
def start():
	# firestore에 올릴 json 파일 불러드림
    with open('C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/stock_code.json', encoding='utf-8') as f:
        datas = json.load(f)
        
    for data in datas:
    	# document() 라고 하면 자동으로 다큐먼트의 ID가 생성됨. 
        document = firebase_db.collection('Score').document()
        document.set(data)
    return 'success'
    
# 공개아이피와 포트8000번 디버그 모드로 열기
if __name__ == '__main__':
    app.run(host='0.0.0.0',  port="8000", debug=True)