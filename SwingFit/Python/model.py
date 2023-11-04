import json
import numpy as np
import tensorflow as tf

with open('describe_result.json', 'r') as json_file:
    describe_result = json.load(json_file)

# JSON 파일을 읽어와서 데이터 파싱
with open('result.json', 'r') as json_file:
    data = json.load(json_file)

# JSON 데이터에서 필요한 값을 추출
head_chest = data['head_chest']
chest_hip = data['chest_hip']
heel_ham = data['heel-ham']
elbow_shoulder = data['elbow-shoulder']

# 데이터 범위 검사
ranges = {
    'head_chest': (describe_result['head_chest']['25%'], describe_result['head_chest']['75%']),
    'chest_hip': (describe_result['chest_hip']['25%'], describe_result['chest_hip']['75%']),
    'heel_ham': (describe_result['heel-ham']['25%'], describe_result['heel-ham']['75%']),
    'elbow_shoulder': (describe_result['elbow-shoulder']['25%'], describe_result['elbow-shoulder']['75%'])
}

out_of_range_messages = []

# 머리와 가슴에 대한 범위 검사
if head_chest < ranges['head_chest'][0]:
    out_of_range_messages.append("머리를 더 세우십시오.")
elif head_chest > ranges['head_chest'][1]:
    out_of_range_messages.append("머리를 더 숙이십시오.")

# 허리와 골반에 대한 범위 검사
if chest_hip < ranges['chest_hip'][0]:
    out_of_range_messages.append("허리를 더 세우십시오.")
elif chest_hip > ranges['chest_hip'][1]:
    out_of_range_messages.append("허리를 더 숙이십시오.")

# 무릎과 하체에 대한 범위 검사
if heel_ham < ranges['heel_ham'][0]:
    out_of_range_messages.append("무릎을 더 굽히십시오.")
elif heel_ham > ranges['heel_ham'][1]:
    out_of_range_messages.append("무릎을 더 펴십시오.")

# 팔과 어깨에 대한 범위 검사
if elbow_shoulder < ranges['elbow_shoulder'][0]:
    out_of_range_messages.append("팔을 바깥쪽으로 더 펴십시오.")
elif elbow_shoulder > ranges['elbow_shoulder'][1]:
    out_of_range_messages.append("팔을 안쪽으로 더 당기십시오.")

# 이제 추출한 값을 NumPy 배열로 변환
input_data = np.array([head_chest, chest_hip, heel_ham, elbow_shoulder])

# 모델 불러오기
model = tf.keras.models.load_model('./model/my_model.h5')  # 모델 파일명을 수정해야 합니다

# 모델을 사용하여 예측
result = model.predict(input_data.reshape(1, -1))  # 입력 데이터를 모델의 입력 형식에 맞게 변환하여 예측

class_mapping = {'bad': 0, 'normal': 1, 'good': 2, 'best': 3}

predicted_classes = np.argmax(result, axis=1)

eval = []
for idx in predicted_classes:
    if idx == 0:
        eval.append('bad')
    elif idx == 1:
        eval.append('normal')
    elif idx == 2:
        eval.append('good')
    elif idx == 3:
        eval.append('best')

# 예측 결과 출력
print("Evaluation:", eval)
print(out_of_range_messages)

result_data = {
    "eval": eval,
    "fit": out_of_range_messages
}

# JSON 파일에 저장
with open('eval_fit.json', 'w', encoding='utf-8') as json_file:
    json.dump(result_data, json_file, ensure_ascii=False)