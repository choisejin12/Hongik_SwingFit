import cv2
import mediapipe as mp
from firebase_admin import credentials , initialize_app , storage , storage , firestore ,auth
import json
from flask import Flask
import subprocess


app = Flask(__name__)

# localhost:5000/add 로 들어갈시 작동
@app.route("/add", methods=['GET'])
def start():
    #파이어베이스에서 이미지 가져오기
    cred = credentials.Certificate("C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/mykey.json")
    initialize_app(cred, {
        'databaseURL' : 'https:SwingFit.firebaseio.com/',
        'storageBucket': 'swingfit-a15ef.appspot.com'
    })


    source_blob_name = "photo.png"
    destination_file_name="C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/image/imgposture.png"

    bucket = storage.bucket()
    blob = bucket.blob('Posture/UUvbdSMa9RQOmgeLZDhkXAVxi5e2/'+ source_blob_name) 
    blob.download_to_filename(destination_file_name)

    # 가져온 이미지의 파이프라인 그리기
    image = cv2.imread('SwingFit\Python\image\imgposture.png')

    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose()

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    cv2.namedWindow("포즈 이미지", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("포즈 이미지", 960, 540)

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        results = pose.process(image_rgb)

        if results.pose_landmarks:
            mp.solutions.drawing_utils.draw_landmarks(image, results.pose_landmarks)
            
            mp.solutions.drawing_utils.draw_landmarks(
                image,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                landmark_drawing_spec=mp.solutions.drawing_utils.DrawingSpec(
                    color=(0, 0, 255), thickness=2, circle_radius=2),
                connection_drawing_spec=mp.solutions.drawing_utils.DrawingSpec(
                    color=(0, 255, 0), thickness=2, circle_radius=2)
            )

            # 중간 지점의 좌표를 얻습니다.
            landmarks = results.pose_landmarks.landmark
            midpoints = [(landmarks[i].x + landmarks[j].x, landmarks[i].y + landmarks[j].y)
                        for i, j in [(7, 8), (11, 12), (23, 24), (23, 25), (24, 26)]]

            for x, y in midpoints:
                h, w, c = image.shape
                x, y = int(x * w / 2), int(y * h / 2)
                # 중간 지점을 점으로 그리고 좌표를 리스트에 추가합니다.
                cv2.circle(image, (x, y), 5, (0, 0, 255), -1)

        cv2.imshow("포즈 이미지", image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    cv2.imwrite("SwingFit\Python\outputimg\output_image.png", image)

    subprocess.run(["python", "SwingFit\Python\get.py"])
    subprocess.run(["python", "SwingFit\Python\calc.py"])
    subprocess.run(["python", "SwingFit\Python\model.py"])

    # 측정 완료한 이미지 파이어베이스 서버에 저장하기
    Outputsource_blob_name = "Outputposture.png"
    Outputdestination_file_name="C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/outputimg/output_image.png"
    blob = bucket.blob('OutputPosture/UUvbdSMa9RQOmgeLZDhkXAVxi5e2/'+ Outputsource_blob_name)  #아이디부분 서버에서 가져와야함
    blob.upload_from_filename(Outputdestination_file_name) 

    print(auth.UserInfo)

    firebase_db = firestore.client()

	# firestore에 올릴 json 파일 부름
    with open('C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/eval_fit.json', encoding='utf-8') as f:
        datas = json.load(f)
        
    for data in datas:
        
    	# document() 라고 하면 자동으로 다큐먼트의 ID가 생성됨. 
        document = firebase_db.collection('Score').document()
        document.set(data)
    return 'success'

# 공개아이피와 포트5000번 디버그 모드로 열기
if __name__ == '__main__':
    app.run(host='0.0.0.0',  port="5000", debug=True)