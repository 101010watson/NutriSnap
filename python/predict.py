from ultralytics import YOLO
import sys
import json

model = YOLO("yolov8n.pt")  # Use yolov8n.pt or your custom weights

def predict(image_path):
    results = model(image_path)
    output = []
    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            name = model.names[cls_id]
            xyxy = box.xyxy[0].tolist()
            output.append({
                "name": name,
                "confidence": round(conf, 2),
                "bbox": [round(v, 2) for v in xyxy]
            })
    return output

if __name__ == "__main__":
    img_path = sys.argv[1]
    preds = predict(img_path)
    print(json.dumps(preds, indent=2))
