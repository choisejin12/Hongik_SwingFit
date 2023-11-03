import cv2
import mediapipe as mp
import os
import json

# Load the image
image_filename = './image/20200803_General_013_DOC_P_F20_MM_014_0384.jpg'
image = cv2.imread(image_filename)

# Create a Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Convert the image to RGB
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Process the image with the Pose model
results = pose.process(image_rgb)

if results.pose_landmarks:
    # Draw landmarks on the image
    mp.solutions.drawing_utils.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

    # Find the bounding box around the detected person
    min_x, max_x, min_y, max_y = float('inf'), float('-inf'), float('inf'), float('-inf')
    
    for idx, landmark in enumerate(results.pose_landmarks.landmark):
        h, w, c = image.shape
        cx, cy = int(landmark.x * w), int(landmark.y * h)
        min_x = min(min_x, cx)
        max_x = max(max_x, cx)
        min_y = min(min_y, cy)
        max_y = max(max_y, cy)

    # Define the indices of the landmarks to find the midpoints
    landmark_indices = [(7, 8), (11, 12), (23, 24), (23, 25)]

    # Create lists to store the adjusted landmark and midpoint coordinates
    adjusted_landmarks = []
    adjusted_midpoints = []

    # Calculate and store the coordinates of the midpoints
    for pair in landmark_indices:
        landmark1 = results.pose_landmarks.landmark[pair[0]]
        landmark2 = results.pose_landmarks.landmark[pair[1]]
        cx = int((landmark1.x + landmark2.x) * 0.5 * w)
        cy = int((landmark1.y + landmark2.y) * 0.5 * h)

        # Adjust midpoint coordinates to resized image
        adjusted_cx = int((cx - min_x) / (max_x - min_x) * 360)
        adjusted_cy = int((cy - min_y) / (max_y - min_y) * 640)
        adjusted_midpoints.append({"X": adjusted_cx, "Y": adjusted_cy})

    # Crop and resize the detected person
    person_image = image[min_y:max_y, min_x:max_x]
    person_image = cv2.resize(person_image, (360, 640))

    # Adjust landmark coordinates to resized image
    for idx, landmark in enumerate(results.pose_landmarks.landmark):
        landmark.x = (landmark.x * w - min_x) / (max_x - min_x)
        landmark.y = (landmark.y * h - min_y) / (max_y - min_y)
        adjusted_x = int(landmark.x * 360)
        adjusted_y = int(landmark.y * 640)
        adjusted_landmarks.append({"X": adjusted_x, "Y": adjusted_y})

    # Prepare data for JSON
    json_data = {
        "Image Name": os.path.basename(image_filename),
        "Landmarks": adjusted_landmarks,
        "Midpoints": adjusted_midpoints
    }

    # Save data to a JSON file
    json_filename = "one.json"
    with open(json_filename, 'w+', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, indent=4)

cv2.waitKey(0)
cv2.destroyAllWindows()