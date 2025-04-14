"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const tasks = [
  {
    id: "classification",
    title: "Classification",
    models: ["ResNet", "VGG19", "DenseNet", "EfficientNet", "MobileNet", "Inception-v3"]
  },
  {
    id: "object-detection",
    title: "Object Detection",
    models: ["YOLO", "Faster R-CNN", "SSD", "RetinaNet", "DETR", "Mask R-CNN"]
  },
  {
    id: "semantic-segmentation",
    title: "Semantic Segmentation",
    models: ["U-Net", "DeepLab", "PSPNet", "FCN", "SegNet", "LinkNet"]
  },
  {
    id: "instance-segmentation",
    title: "Instance Segmentation",
    models: ["Mask R-CNN", "YOLACT", "SOLOv2", "PointRend", "CenterMask", "BlendMask"]
  }
];

interface TaskSelectionProps {
  selectedTask: string;
  onTaskSelect: (task: string) => void;
}

export function TaskSelection({ selectedTask, onTaskSelect }: TaskSelectionProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <RadioGroup value={selectedTask} onValueChange={onTaskSelect} className="grid grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <RadioGroupItem value={task.id} id={task.id} />
              <Label htmlFor={task.id} className="text-base">{task.title}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export const getModelsForTask = (taskId: string) => {
  return tasks.find(task => task.id === taskId)?.models || [];
};
