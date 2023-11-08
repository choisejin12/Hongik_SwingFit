import json

# JSON 파일 로드
json_filename = "C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/landmark.json"  # JSON 파일의 경로와 이름을 지정하세요
with open(json_filename, 'r') as json_file:
    data = json.load(json_file)

landmarks = data["Landmarks"]
midpoints = data["Midpoints"]

head_chest = (midpoints[1]["Y"] - midpoints[0]["Y"]) / (midpoints[1]["X"] - midpoints[0]["X"])
chest_hip = (midpoints[2]["Y"] - midpoints[1]["Y"]) / (midpoints[2]["X"] - midpoints[1]["X"])
heel_ham = landmarks[29]["X"] - midpoints[3]["X"]
elbow_shoulder = landmarks[13]["X"] - landmarks[11]["X"]

result = {"head_chest": head_chest, "chest_hip": chest_hip, "heel-ham": heel_ham, "elbow-shoulder": elbow_shoulder}

    # JSON 파일로 저장
json_filename = "C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/result.json"
with open(json_filename, 'w+', encoding='utf-8') as json_file:
    json.dump(result, json_file, indent=4)

#print(head_chest, chest_hip, heel_ham, elbow_shoulder)