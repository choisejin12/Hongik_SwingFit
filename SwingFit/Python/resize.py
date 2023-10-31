import cv2
import mediapipe as mp

# Load the image
image = cv2.imread('./image/20200803_General_013_DOC_P_F20_MM_014_0383.jpg')

# Create a Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Convert the image to RGB
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Process the image with the Pose model
results = pose.process(image_rgb)

if results.pose_landmarks:
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

        # Print original landmark coordinates
        print(f"Original Landmark {idx}: X={cx}, Y={cy}")

    # Define the indices of the landmarks to find the midpoints
    landmark_indices = [(7, 8), (11, 12), (23, 24), (23, 25), (24, 26), (29, 31), (30, 32)]

    # Calculate and print the coordinates of the midpoints
    for pair in landmark_indices:
        landmark1 = results.pose_landmarks.landmark[pair[0]]
        landmark2 = results.pose_landmarks.landmark[pair[1]]
        cx = int((landmark1.x + landmark2.x) * 0.5 * w)
        cy = int((landmark1.y + landmark2.y) * 0.5 * h)
        print(f"Midpoint of Landmarks {pair}: X={cx}, Y={cy}")

        # Adjust midpoint coordinates to resized image
        adjusted_cx = int((cx - min_x) / (max_x - min_x) * 360)
        adjusted_cy = int((cy - min_y) / (max_y - min_y) * 640)
        print(f"Adjusted Midpoint of Landmarks {pair}: X={adjusted_cx}, Y={adjusted_cy}")

    # Crop and resize the detected person
    person_image = image[min_y:max_y, min_x:max_x]
    person_image = cv2.resize(person_image, (360, 640))

    # Adjust landmark coordinates to resized image
    for idx, landmark in enumerate(results.pose_landmarks.landmark):
        landmark.x = (landmark.x * w - min_x) / (max_x - min_x)
        landmark.y = (landmark.y * h - min_y) / (max_y - min_y)

        # Print adjusted landmark coordinates
        print(f"Adjusted Landmark {idx}: X={int(landmark.x * 360)}, Y={int(landmark.y * 640)}")

    # Show the cropped and resized image with landmarks
    cv2.imshow("Cropped Pose Image", person_image)

    # Save the cropped and resized image
    cv2.imwrite("resized_image.jpg", person_image)

cv2.waitKey(0)
cv2.destroyAllWindows()
