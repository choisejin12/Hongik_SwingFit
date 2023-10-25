
from firebase_admin import credentials, initialize_app, storage, db,storage
from uuid import uuid4



cred = credentials.Certificate("C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/mykey.json")
initialize_app(cred, {
    'databaseURL' : 'https:SwingFit.firebaseio.com/',
    'storageBucket': 'swingfit-a15ef.appspot.com'
})


source_blob_name = "photo.jpg"
destination_file_name="C:/Users/RENTALHUB/Documents/GitHub/Hongik_SwingFit/SwingFit/Python/image/files.png"

bucket = storage.bucket()
blob = bucket.blob('Posture/'+ source_blob_name)
blob.download_to_filename(destination_file_name)
# new_token = uuid4()
# metadata  = {"firebaseStorageDownloadTokens": new_token}
# blob.metadata = metadata


