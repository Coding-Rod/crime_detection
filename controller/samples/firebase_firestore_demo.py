import firebase_admin
from firebase_admin import credentials, firestore
# import getQuote

cred = credentials.Certificate("keys/crime-detection-firebase-key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# response = getQuote()
quote = "lorem Ipsum dolor sit amet, consectetur adipiscing elit"
author = "Rodrigo"

doc_ref = db.collection(u'sampleData').document(u'inspiration')
doc_ref.set({
    u'quote': quote,
    u'author': author,
})

print(f"{quote} and {author} successfully written to database")