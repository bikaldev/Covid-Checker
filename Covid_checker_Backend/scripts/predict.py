import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import cv2
import numpy as np
from tensorflow.keras.models import load_model

import os

from sanic import Sanic
from sanic.response import json
from sanic.request import Request
from sanic_cors import CORS


app = Sanic(__name__)
CORS(app)

def swap_color_channel(img): 
    """
    Change color space of an image
    INPUT
        img: Image which channel has to be changed
    OUTPUT
        Changes color space of an image
    """
    return cv2.cvtColor(img,  cv2.COLOR_BGR2RGB)


def resize(img):
    """
    Resize the image to certain dimension
    INPUT
        img: Image which has to be resized
        dimension: A tuple, new dimension (width, height) of the image
    OUTPUT
        Image resized to given dimension
    """
    
    return cv2.resize(img, (224,224), interpolation=cv2.INTER_AREA)


def preprocessing(img):
    """
    Preprocess the images 
    INPUT
        img: Image to process
    OUTPUT
        NumPy array, normalized array of the resized and color channel change image
    """
    img = swap_color_channel(img)
    img = resize(img)
    img = np.array(img)
    img = img.astype('float32')
    img /= 255.0   #normalize the intensity to 0 and 1 instead of 255
    return img   

cust_model = load_model('./scripts/custom.h5')

@app.route("/analyze", methods=["GET"])
def analyze(request: Request):
    body = request.json
    image = './scripts/image.jpg';
    img = cv2.imread(image)
    img = preprocessing(img)
    img = np.array(img)
    # print(img.shape)

    #Predict on a single image
    predicted_val = cust_model.predict(img.reshape((1,224,224,3)), verbose= False)
    # print(predicted_val.shape)
    max_val = np.max(predicted_val)
    diagnosis = {}
    if(max_val > 0.75):
        ind = np.where(predicted_val == max_val)
        diagnosis["probability"] = str(round(max_val * 100,4)) + "%"
        if(ind[1] == 0):
            diagnosis["diagnosis"] = "Covid"
        elif(ind[1] == 2):
            diagnosis["diagnosis"] = "Pneumonia"
        else:
            diagnosis["diagnosis"] = "Normal"
        
        print('{"diagnosis": "' + diagnosis["diagnosis"]+'" , "probability": "' + diagnosis['probability'] + '" }')
    else:
        diagnosis["diagnosis"] = "Inconclusive";
        print('{"diagnosis": "' + diagnosis["diagnosis"]+'"}')
        print(body)
    
    return json(diagnosis)




if __name__ == "__main__":
    # Docker image should always listen in port 8001
    app.run(host="0.0.0.0", port=8001)

# images = file_lists(os.path.join(base_dir,'chest_xray',take_data_dir))
