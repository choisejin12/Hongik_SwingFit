import cv2
import mediapipe as mp
from firebase_admin import credentials , initialize_app , storage , storage , firestore ,auth
import json
from flask import Flask
import firebase_admin


#파이어베이스에서 이미지 가져오기
cred = credentials.Certificate("C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/mykey.json")
initialize_app(cred, {
    'databaseURL' : 'https:SwingFit.firebaseio.com/',
    'storageBucket': 'swingfit-a15ef.appspot.com'
})

source_blob_name = "photo.png"
destination_file_name="C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/image/imgposture.png"

bucket = storage.bucket()
blob = bucket.blob('Posture/m1bBDo3hbYZ40G4n8IeHGnOYt923/'+ source_blob_name) #아이디부분 서버에서 가져와야함
blob.download_to_filename(destination_file_name)

# 가져온 이미지의 자세 측정하기
image = cv2.imread('SwingFit\Python\image\imgposture.png')

mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic()

image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

cv2.namedWindow("Holistic Image", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Holistic Image", 960, 540)

with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    results = holistic.process(image_rgb)

    if results.pose_landmarks:
        mp.solutions.drawing_utils.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
    
    cv2.imshow("Holistic Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    if results.pose_landmarks:
        for idx, landmark in enumerate(results.pose_landmarks.landmark):
            h, w, c = image.shape
            cx, cy = int(landmark.x * w), int(landmark.y * h)
            print(f"Landmark {idx}: X={cx}, Y={cy}")

cv2.imwrite("SwingFit\Python\outputimg\output_image.png", image)

# 측정 완료한 이미지 파이어베이스 서버에 저장하기
Outputsource_blob_name = "Outputposture.png"
Outputdestination_file_name="C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/outputimg/output_image.png"
blob = bucket.blob('OutputPosture/m1bBDo3hbYZ40G4n8IeHGnOYt923/'+ Outputsource_blob_name)  #아이디부분 서버에서 가져와야함
blob.upload_from_filename(Outputdestination_file_name) 

print(auth.UserInfo)

data = [
    {"olivia" : {
        "gender": "female",
        "age" : 25,
        "hobby" : ["reading", "music"]
        }
    },
    {"Tyler" : {
        "gender": "male",
        "age" : 28,
        "hobby" : ["development", "painting"]
        }
    }
]

file_path = "C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/result/test.json"

with open(file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file)



firebase_db = firestore.client()


app = Flask(__name__)

# localhost:5000/add 로 들어갈시 작동
@app.route("/add", methods=['GET'])
def start():
	# firestore에 올릴 json 파일 부름
    with open('C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/result/test.json', encoding='utf-8') as f:
        datas = json.load(f)
        
    for data in datas:
    	# document() 라고 하면 자동으로 다큐먼트의 ID가 생성됨. 
        document = firebase_db.collection('Score').document()
        document.set(data)
    return 'success'
    
# 공개아이피와 포트5000번 디버그 모드로 열기
if __name__ == '__main__':
    app.run(host='0.0.0.0',  port="5000", debug=True)